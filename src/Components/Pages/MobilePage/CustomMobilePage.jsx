import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sopitfyimg from "../../Assets/SVG/spotify.svg";
import { getToggle } from "../../ReduxManager/action";

const CustomMobilePage = () => {
  const selectedSong = useSelector((state) => state.currentSong);
  const [isToggle, setIsToggle] = useState(false);

  const dispatch = useDispatch()

  const handleClick = () => {
    setIsToggle(!isToggle)
    dispatch(getToggle(isToggle))
};

  return (
    <>
      <div className="mobile-music" onClick={handleClick}>
        <div className={`${selectedSong}`}>
          <div className="song-info">
            <div className="song-profile">
              {selectedSong ? (
                <img
                  src={`https://cms.samespace.com/assets/${selectedSong?.cover}`}
                  alt="song image"
                />
              ) : (
                <img src={Sopitfyimg} alt="song image" />
              )}
            </div>
            <div className="song-name">
              <div className="song-title">{selectedSong?.name}</div>
              <div className="song-artist">{selectedSong?.artist}</div>
            </div>
          </div>
          <div className="song-play-pause">{/* <CustomMusicPlayer /> */}</div>
        </div>
      </div>
    </>
  );
};

export default CustomMobilePage;
