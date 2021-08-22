import { combineReducers } from "redux";
import room from "./RoomReducer";
import user from "./UserReducer";
import theme from "./ThemeReducer";
import app from "./AppReducer";

export default combineReducers({
    room, user, theme, app
})