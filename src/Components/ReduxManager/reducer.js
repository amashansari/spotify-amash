const initialState = {
  currentSong: null,
  allSongs: null,
  color: null,
  toggled: false,
  pause: false,
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SONG_DATA":
      return { ...state, currentSong: action.payload };
    case "ALL_SONGS":
      return { ...state, allSongs: action.payload };
    case "GET_COLOR":
      return { ...state, color: action.payload };
    case "GET_TOGGLE":
      return { ...state, toggled: !state.toggled };
    case "TOOGLE_OFF":
      return { ...state, toggled: false };
    case "PAUSE":
      return { ...state, pause: false };
    case "PLAY":
      return { ...state, pause: true };
    default:
      return state;
  }
};

export default myReducer;
