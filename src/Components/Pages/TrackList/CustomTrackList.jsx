import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "../../Assets/SVG/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { allSongs, songDetail } from "../../ReduxManager/action";

const CustomTrackList = () => {
  const [songData, setSongData] = useState([]);
  const [activeTab, setActiveTab] = useState("FOR_YOU");
  const [searchSong, setSearchSong] = useState("");

  const dispatch = useDispatch();

  const getSongs = () => {
    return axios
      .get(`https://cms.samespace.com/items/songs`)
      .then((response) => {
        setSongData(response.data.data);
        dispatch(allSongs(response.data.data));
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  };

  useEffect(() => {
    getSongs();
  }, []);

  const handleSearch = (e) => {
    setSearchSong(e.target.value);
  };

  const filterSong = songData.filter(
    (song) =>
      song.name.toLowerCase().includes(searchSong.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchSong.toLowerCase())
  );

  const handleSong = (val) => {
    console.log(val);

    dispatch(songDetail(val));
  };

  const selectedSong = useSelector((state) => state.currentSong);

  return (
    <>
      <div className="main-trackList-container">
        <div className="trackList-tab">
          <div
            className={`foryou ${activeTab === "FOR_YOU" ? "active" : ""}`}
            onClick={() => setActiveTab("FOR_YOU")}
          >
            For you
          </div>
          <div
            className={`toptracks ${
              activeTab === "TOP_TRACKS" ? "active" : ""
            }`}
            onClick={() => setActiveTab("TOP_TRACKS")}
          >
            Top Tracks
          </div>
        </div>
        <div className="trackList-search">
          <input
            type="text"
            name="search song"
            id="search"
            placeholder="Search Song & Artist"
            value={searchSong}
            onChange={handleSearch}
          />
          <div className="search-icon">
            <img src={SearchIcon} alt="" />
          </div>
        </div>
        {activeTab === "FOR_YOU" ? (
          <div className="trackList-list">
            {filterSong.length > 0 ? (
              filterSong.map((val, index) => (
                <div
                  className={`list-items ${
                    selectedSong?.id === val.id ? "active-song" : ""
                  }`}
                  onClick={() => handleSong(val)}
                  key={index}
                >
                  <div className="song-info">
                    <div className="song-profile">
                      <img
                        src={`https://cms.samespace.com/assets/${val.cover}`}
                      />
                    </div>
                    <div className="song-name">
                      <div className="song-title">{val.name}</div>
                      <div className="song-artist">{val.artist}</div>
                    </div>
                  </div>
                  <div className="song-duration">4:16</div>
                </div>
              ))
            ) : (
              <div>No song found</div>
            )}
          </div>
        ) : (
          ""
        )}
        {activeTab === "TOP_TRACKS" ? (
          <div className="trackList-list">
            <div className="main-loader">
              <div class="loader">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CustomTrackList;
