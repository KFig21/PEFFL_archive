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
      .then((token_peffl) => {
        localStorage.setItem("token_peffl", token_peffl.data);
        dispatch({
          type: REGISTER,
          token_peffl: token_peffl.data,
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
      .then((token_peffl) => {
        localStorage.setItem("token_peffl", token_peffl.data);
        dispatch({
          type: LOGIN,
          token_peffl: token_peffl.data,
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
    const token_peffl = getState().user.token_peffl;
    if (token_peffl) {
      dispatch({
        type: CURRENT_USER,
        token_peffl,
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
      .then((token_peffl) => {
        localStorage.setItem("token_peffl", token_peffl.data);
        dispatch({
          type: THEME_UPDATE,
          token_peffl: token_peffl.data,
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
      .then((token_peffl) => {
        localStorage.setItem("token_peffl", token_peffl.data);
        dispatch({
          type: THEME_UPDATE,
          token_peffl: token_peffl.data,
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
      .then((token_peffl) => {
        localStorage.setItem("token_peffl", token_peffl.data);
        dispatch({
          type: HELMET_UPDATE,
          token_peffl: token_peffl.data,
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
      .then((token_peffl) => {
        localStorage.setItem("token_peffl", token_peffl.data);
        dispatch({
          type: THEME_UPDATE,
          token_peffl: token_peffl.data,
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
      .then((token_peffl) => {
        localStorage.setItem("token_peffl", token_peffl.data);
        dispatch({
          type: THEME_UPDATE,
          token_peffl: token_peffl.data,
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
      .then((token_peffl) => {
        localStorage.setItem("token_peffl", token_peffl.data);
        dispatch({
          type: THEME_UPDATE,
          token_peffl: token_peffl.data,
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
