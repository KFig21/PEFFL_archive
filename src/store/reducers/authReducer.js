import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CURRENT_USER,
  LOGIN_FAIL,
  THEME_UPDATE,
  THEME_UPDATE_FAIL,
  HELMET_UPDATE,
  HELMET_UPDATE_FAIL,
} from "../actions/types";
import jwtDecode from "jwt-decode";

const initialState = {
  username: null,
  email: null,
  theme: null,
  accent: null,
  helmetStyle: null,
  helmetView: null,
  highlightUser: null,
  expandSidebar: null,
  token_peffl: localStorage.getItem("token_peffl"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
    case LOGIN:
    case REGISTER:
    case THEME_UPDATE:
    case THEME_UPDATE_FAIL:
    case HELMET_UPDATE:
    case HELMET_UPDATE_FAIL:
      const user = jwtDecode(action.token_peffl);
      return {
        token_peffl: action.token_peffl,
        username: user.username,
        email: user.email,
        theme: user.theme,
        accent: user.accent,
        helmetStyle: user.helmetStyle,
        helmetView: user.helmetView,
        highlightUser: user.highlightUser,
        expandSidebar: user.expandSidebar,
        _id: user._id,
      };
    case LOGIN_FAIL:
      return {
        username: null,
        email: null,
        theme: null,
        accent: null,
        helmetStyle: null,
        helmetView: null,
        highlightUser: null,
        expandSidebar: null,
        token_peffl: null,
      };
    case LOGOUT:
      localStorage.removeItem("token_peffl");
      return {
        username: null,
        email: null,
        theme: null,
        accent: null,
        helmetStyle: null,
        helmetView: null,
        highlightUser: null,
        expandSidebar: null,
        token_peffl: null,
      };
    default:
      return state;
  }
};

export default authReducer;
