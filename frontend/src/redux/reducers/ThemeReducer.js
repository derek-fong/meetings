export const SET_THEME = 'SET_THEME';

const initialState = {
  isDarkMode: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return Object.assign({}, state, {
        isDarkMode: action.payload.isDarkMode,
      });
    default:
      return state;
  }
};

export default themeReducer;
