import { combineReducers } from "redux";
import authReducer from "./authReducer";
import teamsReducer from "./teamsReducer";

const rootReducer = combineReducers({
  user: authReducer,
  teams: teamsReducer,
});

export default rootReducer;
