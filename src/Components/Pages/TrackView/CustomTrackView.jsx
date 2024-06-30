import React, { useState, useEffect, act } from "react";
import CustomMusicPlayer from "../MusicPlayer/CustomMusicPlayer";
import { useDispatch, useSelector } from "react-redux";
import Sopitfyimg from "../../Assets/SVG/spotify.svg";
import ColorThief from "colorthief";
import { getColor, toggleOff } from "../../ReduxManager/action";
import DownImg from "../../Assets/SVG/down.svg";

const CustomTrackView = () => {
  const selectedSong = useSelector((state) => state.currentSong);
  const getToggle = useSelector((state) => state.toggled);
  const currentColor = useSelector((state) => state.color);

  const [activeTab, setActiveTab] = useState("PLAYING");
  const [color, setColor] = useState([0, 0, 0]);
  const dispatch = useDispatch();

  const rgbColor = currentColor
    ? `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`
    : `rgba(30,215,96,0.5)`;

  const handleClose = () => {
    dispatch(toggleOff());
  };

  useEffect(() => {
    if (selectedSong) {
      const img = new Image();
      img.src = `https://cms.samespace.com/assets/${selectedSong.cover}`;
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        setColor(dominantColor);
        dispatch(getColor(dominantColor));
      };
    }
  }, [selectedSong]);

  return (
    <div
      className={`main-trackView-container ${getToggle ? "pop" : ""}`}
      style={
        getToggle
          ? {
              backgroundImage: `linear-gradient(108.18deg, ${rgbColor} 2.46%, #000000 99.84%)`,
            }
          : { backgroundImage: "none" }
      }
    >
      <div className="track-view">
        <div className="arrow-spotify">
          <div className="downArrow" onClick={handleClose}>
            <img src={DownImg} alt="" />
          </div>
          <div className="viewSpotify">
            <img src={Sopitfyimg} alt="" />
          </div>
        </div>
        <div className="playingLyrics">
          <div
            className={`playing ${activeTab === "PLAYING" ? "track-active-tab" : ""}`}
            onClick={() => setActiveTab("PLAYING")}
          >
            Playing
          </div>
          <div
            className={`lyrics ${activeTab === "LYRICS" ? "track-active-tab" : ""}`}
            onClick={() => setActiveTab("LYRICS")}
          >
            Lyrics
          </div>
        </div>
        <div className="song-name-view">{selectedSong?.name}</div>
        <div className="song-artist-track-view">{selectedSong?.artist}</div>
        {activeTab === "PLAYING" ? (
          <div className="song-cover">
            {selectedSong ? (
              <img
                src={`https://cms.samespace.com/assets/${selectedSong?.cover}`}
                alt="song image"
              />
            ) : (
              <img src={Sopitfyimg} className="spotify-track-view" alt="song image" />
            )}
          </div>
        ) : (
          ""
        )}
        {activeTab === "LYRICS" ? (
          <div className="lyrics-not song-cover">Can't Load the lyrics for this song</div>
        ) : (
          ""
        )}
        <div className="song-name-mobile">{selectedSong?.name}</div>
        <div className="song-artist-track-mobile">{selectedSong?.artist}</div>
        <div className="song-control">
          <CustomMusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default CustomTrackView;
