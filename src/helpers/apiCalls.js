import axios from "axios";

export const url = "http://localhost:3000/peffl"; // local
// export const url = "https://peffl-api.herokuapp.com/peffl"; // api

// ---------- MAIN ----------
export const getStandings = async (column, order, table) => {
  const res = await axios.get(
    `${url}/rs/standings/${column}/${order}/${table}`
  );
  return res.data;
};
export const getStandingsMedals = async (table, column) => {
  const res = await axios.get(`${url}/rs/medals/${table}/${column}`);
  return res.data;
};
export const getStandingsRank = async (table) => {
  const res = await axios.get(`${url}/rs/standingsRank/${table}`);
  return res.data;
};

// ---------- AWARDS ----------
export const getAwardsTable = async (column, order) => {
  const res = await axios.get(`${url}/records/awards/${column}/${order}`);
  return res.data;
};
export const getAwardsRank = async () => {
  const res = await axios.get(`${url}/records/awardsRank`);
  return res.data;
};
export const getWeeksMostPFmedals = async () => {
  const res = await axios.get(`${url}/records/weeksMostPFmedals`);
  return res.data;
};
export const getWeeksMostPAmedals = async () => {
  const res = await axios.get(`${url}/records/weeksMostPAmedals`);
  return res.data;
};
export const getWeeksLeastPFmedals = async () => {
  const res = await axios.get(`${url}/records/weeksLeastPFmedals`);
  return res.data;
};
export const getWeeksLeastPAmedals = async () => {
  const res = await axios.get(`${url}/records/weeksLeastPAmedals`);
  return res.data;
};

// ---------- TEAMS ----------
export const getTeams = async (column, order, table) => {
  const res = await axios.get(
    `${url}/teams/allteams/${column}/${order}/${table}`
  );
  return res.data;
};
export const getTeamStats = async (team) => {
  const res = await axios.get(`${url}/teams/stats/${team}`);
  return res.data;
};
export const getH2HmatchupsTeampage = async (team, column, order, table) => {
  const res = await axios.get(
    `${url}/teams/headToHead/${team}/${column}/${order}/${table}`
  );
  return res.data;
};
export const getTeamSeasons = async (team, column, order, table) => {
  const res = await axios.get(
    `${url}/teams/seasons/${team}/${column}/${order}/${table}`
  );
  return res.data;
};
export const getAllTeamsMedals = async (table, column) => {
  const res = await axios.get(`${url}/teams/allMedals/${table}/${column}`);
  return res.data;
};

// ---------- H2H ----------
export const getH2hMatchups = async (table, team1, team2) => {
  const res = await axios.get(
    `${url}/matchups/h2h/allmatchups/${team1}/${team2}/${table}`
  );
  return res.data;
};
export const getH2Hteams = async (_team1, _team2, table) => {
  const res = await axios.get(
    `${url}/matchups/h2h/${_team1}/${_team2}/${table}`
  );
  return res.data;
};

// ---------- MATCHUPS ----------
export const getAllMatchups = async (column, order, table) => {
  const res = await axios.get(
    `${url}/matchups/all/${column}/${order}/${table}`
  );
  return res.data;
};
export const getAllMatchupsMedals = async (table, column) => {
  const res = await axios.get(`${url}/matchups/medals/${table}/${column}`);
  return res.data;
};
export const getAllMedalsForMatchups = async (table) => {
  const res = await axios.get(`${url}/matchups/medals/${table}`);
  return res.data;
};

// ---------- SEASONS ----------
export const getSingleSeason = async (year, sortBy, sortOrder, table) => {
  const res = await axios.get(
    `${url}/seasons/table/${year}/${sortBy}/${sortOrder}/${table}`
  );
  return res.data;
};
export const getSingleSeasonTrophies = async (year) => {
  const res = await axios.get(`${url}/seasons/trophies/${year}/`);
  return res.data;
};

// ---------- RECORDS ----------
export const getHighestMarginOfVictory = async () => {
  const res = await axios.get(`${url}/records/highest-margin-of-victory`);
  return res.data;
};
export const getHighestScoringGame = async () => {
  const res = await axios.get(`${url}/records/highest-scoring-game`);
  return res.data;
};
export const getSingleGameMostPF = async () => {
  const res = await axios.get(`${url}/records/single-game-most-pf`);
  return res.data;
};
export const getSingleSeasonMostPF = async () => {
  const res = await axios.get(`${url}/records/single-season-most-pf`);
  return res.data;
};
export const getWeeklyRecords = async (col, order) => {
  const res = await axios.get(`${url}/records/weekly-records/${col}/${order}`);
  return res.data;
};
export const getTeamWeeklyRecords = async (team) => {
  const res = await axios.get(`${url}/records/weekly-records/${team}`);
  return res.data;
};

// ---------- RANKS ----------
export const getAllRanks = async (table) => {
  const res = await axios.get(`${url}/allRanks/${table}`);
  return res.data;
};
export const getWinPercentageRank = async (table) => {
  const res = await axios.get(`${url}/ranks/win/${table}`);
  return res.data;
};
export const getPpgRank_overall = async (table) => {
  const res = await axios.get(`${url}/ranks/ppg/${table}`);
  return res.data;
};
export const getPapgRank_overall = async (table) => {
  const res = await axios.get(`${url}/ranks/papg/${table}`);
  return res.data;
};
export const getDifpgRank_overall = async (table) => {
  const res = await axios.get(`${url}/ranks/difpg/${table}`);
  return res.data;
};
export const getPfRank_overall = async (table) => {
  const res = await axios.get(`${url}/ranks/pf/${table}`);
  return res.data;
};
export const getPaRank_overall = async (table) => {
  const res = await axios.get(`${url}/ranks/pa/${table}`);
  return res.data;
};
export const getDifRank_overall = async (table) => {
  const res = await axios.get(`${url}/ranks/dif/${table}`);
  return res.data;
};
export const getWinsRank_h2h = async (table) => {
  const res = await axios.get(`${url}/ranks/h2h/wins/${table}`);
  return res.data;
};
export const getPpgRank_h2h = async (table, team1, team2) => {
  if (
    team1 === "Taylor" ||
    team2 === "Taylor" ||
    team1 === "AJ" ||
    team2 === "AJ"
  ) {
    const res = await axios.get(`${url}/ranks/h2h/filter/ppg/${table}`);
    return res.data;
  } else {
    const res = await axios.get(`${url}/ranks/h2h/ppg/${table}`);
    return res.data;
  }
};
export const getPfRank_h2h = async (table) => {
  const res = await axios.get(`${url}/ranks/h2h/pf/${table}`);
  return res.data;
};
export const getDifpgRank_h2h = async (table, team1, team2) => {
  if (
    team1 === "Taylor" ||
    team2 === "Taylor" ||
    team1 === "AJ" ||
    team2 === "AJ"
  ) {
    const res = await axios.get(`${url}/ranks/h2h/filter/difpg/${table}`);
    return res.data;
  } else {
    const res = await axios.get(`${url}/ranks/h2h/difpg/${table}`);
    return res.data;
  }
};
export const getDifRank_h2h = async (table) => {
  const res = await axios.get(`${url}/ranks/h2h/dif/${table}`);
  return res.data;
};
