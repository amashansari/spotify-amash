export const songDetail = (song) => {
  return {
    type: "SONG_DATA",
    payload: song,
  };
};

export const allSongs = (songs) => {
  return {
    type: "ALL_SONGS",
    payload: songs,
  };
};

export const getColor = (color) => {
  return {
    type: "GET_COLOR",
    payload: color,
  };
};

export const getToggle = (toggled) => {
  return {
    type: "GET_TOGGLE",
    payload: toggled,
  };
};

export const toggleOff = () => {
  return {
    type: "TOOGLE_OFF",
  };

}

export const pause = (pause) => {
  return {
    type: "PAUSE",
    payload: pause
  };
}

export const play = () => {
  return {
    type: "PLAY",
  };
}
