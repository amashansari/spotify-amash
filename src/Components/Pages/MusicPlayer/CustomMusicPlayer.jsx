import axios from "axios";
import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { ReactComponent as Play } from "../../Assets/SVG/play.svg";
import { ReactComponent as Pause } from "../../Assets/SVG/pause.svg";
import { ReactComponent as ForwardArrow } from "../../Assets/SVG/forward.svg";
import { ReactComponent as BackwardArrow } from "../../Assets/SVG/backward.svg";
import { useDispatch, useSelector } from "react-redux";
import { songDetail } from "../../ReduxManager/action";

const CustomMusicPlayer = () => {
  const selectedSong = useSelector((state) => state.currentSong);
  const allSongs = useSelector((state) => state.allSongs);

  const dispatch = useDispatch();

  const [songs, setSongs] = useState("");

  const getSongs = async () => {
    axios.get(`https://cms.samespace.com/items/songs`).then(() => {
      setSongs(selectedSong?.url);
      console.log("music", selectedSong?.url);
    });
  };

  console.log("all songs", allSongs);

  function findNextObjectById(array, currentId) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === currentId) {
        if (i + 1 < array.length) {
          return array[i + 1];
        } else {
        }
      }
    }
    return null; 
  }


  function findPreviousObjectById(array, currentId) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === currentId) {
        if (i - 1 >= 0) {
          return array[i - 1];
        } else {
        }
      }
    }
    return null; 
  }


  const clickNext = () => {
    console.log("Clicked Next");
    if (selectedSong) {
      let nextSongData = findNextObjectById(allSongs, selectedSong.id);
      console.log("next song", nextSongData);
      if (nextSongData) {
        dispatch(songDetail(nextSongData));
      }
    }
  };
  
  const clickPrevious = () => {
    console.log("Clicked Previous");
    if (selectedSong) {
      let nextSongData = findPreviousObjectById(allSongs, selectedSong.id);
      console.log("next song", nextSongData);
      if (nextSongData) {
        dispatch(songDetail(nextSongData));
      }
    }
  };

  useEffect(() => {
    if (selectedSong?.url) {
      setSongs(selectedSong.url);
    }
  }, [selectedSong]);

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <AudioPlayer
      customAdditionalControls={[]}
      customIcons={{
        play: <Play />,
        pause: <Pause />,
        forward: <ForwardArrow />,
        rewind: <BackwardArrow />,
      }}
      src={songs}
      showSkipControls={true}
      onClickPrevious={clickPrevious}
      onClickNext={clickNext}
    />
  );
};

export default CustomMusicPlayer;