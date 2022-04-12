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
  GET_TEAMS,
  GET_TEAMS_FAIL,
} from "./types";
import axios from "axios";
import { url } from "../../helpers/apiCalls";

export const register = (user) => {
  return (dispatch) => {
    axios
      .post(`${url}/auth/register`, user)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: REGISTER,
          token: token.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const login = (cred, setErrorHandler, setFetching) => {
  return (dispatch) => {
    axios
      .post(`${url}/auth/login`, cred)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: LOGIN,
          token: token.data,
        });
        setFetching(false);
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data,
          });
        }
        setErrorHandler({ error: true, message: error.response.data });
        setFetching(false);
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    if (token) {
      dispatch({
        type: CURRENT_USER,
        token,
      });
    } else {
      return null;
    }
  };
};

export const updateTheme = (data) => {
  return (dispatch) => {
    axios
      .put(`${url}/auth/theme`, data)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: THEME_UPDATE,
          token: token.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: THEME_UPDATE_FAIL,
            payload: error.response.data,
          });
        }
      });
  };
};

export const updateAccent = (data) => {
  return (dispatch) => {
    axios
      .put(`${url}/auth/accent`, data)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: THEME_UPDATE,
          token: token.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: THEME_UPDATE_FAIL,
            payload: error.response.data,
          });
        }
      });
  };
};

export const updateHelmetStyle = (data) => {
  return (dispatch) => {
    axios
      .put(`${url}/auth/helmetStyle`, data)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: HELMET_UPDATE,
          token: token.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: HELMET_UPDATE_FAIL,
            payload: error.response.data,
          });
        }
      });
  };
};

export const updateHelmetView = (data) => {
  return (dispatch) => {
    axios
      .put(`${url}/auth/helmetView`, data)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: THEME_UPDATE,
          token: token.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: THEME_UPDATE_FAIL,
            payload: error.response.data,
          });
        }
      });
  };
};

export const updateHighlightUser = (data) => {
  return (dispatch) => {
    axios
      .put(`${url}/auth/highlightUser`, data)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: THEME_UPDATE,
          token: token.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: THEME_UPDATE_FAIL,
            payload: error.response.data,
          });
        }
      });
  };
};

export const updateExpandSidebar = (data) => {
  return (dispatch) => {
    axios
      .put(`${url}/auth/expandSidebar`, data)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: THEME_UPDATE,
          token: token.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: THEME_UPDATE_FAIL,
            payload: error.response.data,
          });
        }
      });
  };
};

export const getTeams = () => {
  return (dispatch) => {
    axios
      .get(`${url}/auth/teams/`)
      .then((teams) => {
        dispatch({
          type: GET_TEAMS,
          teams: teams,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: GET_TEAMS_FAIL,
            payload: error.response.data,
          });
        }
      });
  };
};
