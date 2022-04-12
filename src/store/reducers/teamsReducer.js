import {
  GET_TEAMS,
  GET_TEAMS_FAIL,
  HELMET_UPDATE,
  HELMET_UPDATE_FAIL,
} from "../actions/types";

const teamsReducer = (teams = [], action) => {
  switch (action.type) {
    case GET_TEAMS:
      return action.teams.data;
    case HELMET_UPDATE:
      return teams.map((team) =>
        team.teamName === action.team.data.teamName ? action.teams.data : team
      );
    default:
      return teams;
  }
};

export default teamsReducer;
