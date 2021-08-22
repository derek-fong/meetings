import { SET_THEME } from '../reducers/ThemeReducer';

export function setTheme(isDarkMode) {
  return (dispatch) => {
    dispatch({ type: SET_THEME, payload: { isDarkMode } })
  }
}