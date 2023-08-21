/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import SC from "../../themes/styledComponents";
import "./H2H.scss";
import Helmet from "../../components/helmet/Helmet";
import Loader from "../../components/loader/Loader";
import {
  getH2hMatchups,
  getH2Hteams,
  getAllRanks,
} from "../../helpers/apiCalls";
import { Link, useParams } from "react-router-dom";
import H2H_Section from "./sections/H2H_Section";
import Overall_Section from "./sections/Overall_Section";
import Matchups from "./sections/Matchups";

export default function H2H({
  setCurrentPage,
  j_Division,
  page,
  helmetStyle,
  helmetView,
}) {
  const params = useParams("away");
  const [team1input, setTeam1input] = useState(params.away);
  const [team2input, setTeam2input] = useState(params.home);
  const [team1data, setTeam1data] = useState({});
  const [team2data, setTeam2data] = useState({});
  const [schedule, setSchedule] = useState("RS");
  const [loaded, setLoaded] = useState(false);
  const isInvalid = team1input === team2input;
  const teamnames = [
    "Big Boy",
    "Billy",
    "Chad",
    "DenR",
    "Fig",
    "Frankie",
    "Nordy",
    "Rose",
    "The Boo",
    "Timmy",
    "AJ",
    "Taylor",
  ];
  // RANKS - overall
  const [winPercentageRank, setWinPercentageRank] = useState([]);
  const [ppgRank_overall, setPpgRank_overall] = useState([]);
  const [papgRank_overall, setPapgRank_overall] = useState([]);
  const [difpgRank_overall, setDifpgRank_overall] = useState([]);
  const [pfRank_overall, setPfRank_overall] = useState([]);
  const [paRank_overall, setPaRank_overall] = useState([]);
  const [difRank_overall, setDifRank_overall] = useState([]);
  // RANKS - h2h
  const [winsRank_h2h, setWinsRank_h2h] = useState([]);
  const [ppgRank_h2h, setPpgRank_h2h] = useState([]);
  const [pfRank_h2h, setPfRank_h2h] = useState([]);
  const [difpgRank_h2h, setDifpgRank_h2h] = useState([]);
  const [difRank_h2h, setDifRank_h2h] = useState([]);
  // MATCHUPS
  const [matchups, setMatchups] = useState([]);
  const [winStreak, setWinStreak] = useState(0);
  const [winner, setWinner] = useState("");

  const getH2H = async (_team1 = "Frankie", _team2 = "The Boo", table) => {
    setLoaded(false)
    const teamdata = await getH2Hteams(_team1, _team2, table);
    let floats = ['winp', 'totpg', 'ppg', 'papg', 'difpg']
    let ints = ['w', 'l', 'g', 'pf', 'pa', 'tot', 'dif']    
    const transformRows = (row) => {
      return Object.keys(row).forEach(key => {
        if (floats.includes(key)) { row[key] = parseFloat(parseFloat(row[key]).toFixed(3)); }
        if (ints.includes(key)) { row[key] = parseInt(row[key]); }
      });
    }
    transformRows(teamdata.team1.h2h)
    transformRows(teamdata.team1.overall)
    transformRows(teamdata.team2.h2h)
    transformRows(teamdata.team2.overall)
    
    setTeam1data(teamdata.team1);
    setTeam2data(teamdata.team2);

    let allRanks = (await getAllRanks(table))
    
    // set ranks - overall
    setWinPercentageRank(allRanks.overall.win);
    setPpgRank_overall(allRanks.overall.ppg);
    setPapgRank_overall(allRanks.overall.papg);
    setDifpgRank_overall(allRanks.overall.difpg);
    setPfRank_overall(allRanks.overall.pf);
    setPaRank_overall(allRanks.overall.pa);
    setDifRank_overall(allRanks.overall.dif);
    // set ranks - h2h
    setWinsRank_h2h(allRanks.h2h.wins);
    setPfRank_h2h(allRanks.h2h.pf);
    setDifRank_h2h(allRanks.h2h.dif);
    if (_team1 === 'AJ' || _team1 === 'Taylor' || _team2 === 'AJ' ||_team1 === 'Taylor'){
      setPpgRank_h2h(allRanks.h2h.ppg);
      setDifpgRank_h2h(allRanks.h2h.difpg);
    } else{
      setPpgRank_h2h(allRanks.h2h.ppgfilter);
      setDifpgRank_h2h(allRanks.h2h.difpgfilter);
    }
    // set matchups
    let games = await getH2hMatchups(table, team1input, team2input)
    setMatchups(games);
    // get win streak
    if (games) {
      let currentWinner = games[0].pf > games[0].pa ? team1input : team2input;
      let winningSide = games[0].pf > games[0].pa ? "pf" : "pa";
      let losingSide = games[0].pf < games[0].pa ? "pf" : "pa";
      let streak = 0;

      for (let i = 0; i < games.length; i++) {
        if (games[i][winningSide] > games[i][losingSide]) {
          streak++;
        } else {
          i = games.length;
        }
      }
      setWinStreak(streak);
      setWinner(currentWinner);
    }

    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  // const getWinStreak = async (table) => {
  //   let games = await getH2hMatchups(table, team1input, team2input);
  //   if (games) {
  //     let currentWinner = games[0].pf > games[0].pa ? team1input : team2input;
  //     let winningSide = games[0].pf > games[0].pa ? "pf" : "pa";
  //     let losingSide = games[0].pf < games[0].pa ? "pf" : "pa";
  //     let streak = 0;

  //     for (let i = 0; i < games.length; i++) {
  //       if (games[i][winningSide] > games[i][losingSide]) {
  //         streak++;
  //       } else {
  //         i = games.length;
  //       }
  //     }
  //     setWinStreak(streak);
  //     setWinner(currentWinner);
  //   }
  // };

  const changeSchedule = (table) => {
    setSchedule(table);
    getH2H(team1input, team2input, table);
  };

  const handleChangeTeam1 = (e) => {
    setTeam1input(e.target.value);
  };

  const handleChangeTeam2 = (e) => {
    setTeam2input(e.target.value);
  };

  const handleSubmit = () => {
    setLoaded(false);
    getH2H(team1input, team2input, schedule);
  };

  useEffect(() => {
    setCurrentPage("h2h");
    if (document.getElementById("page")) {
      document.getElementById("page").scrollTo(0, 0);
    }
    getH2H(team1input, team2input, schedule);
  }, []);

  return (
    <div style={{maxHeight: "inherit", overflowY: "hidden"}}>
      <SC.teampageHeader className="page-header">
        <SC.textOnBgColor>
          <div className="h2h-section-header">
            <div className="header-wrapper" id="wrapper">
              {loaded ? (
                <div className="h2h-header-container">
                  <Link to={`/teams/${team1data.team}`}>
                    <div className="h2h-header-team-left">
                      <div
                        className="helmet-header-container active-helmet"
                        id="helmet"
                      >
                        <Helmet
                          team={team1data.team}
                          size={"h2h-header"}
                          helmetStyle={helmetStyle}
                          helmetView={helmetView}
                        />
                      </div>
                      <span id="header">{team1data.team}</span>
                    </div>
                  </Link>

                  <span>VS</span>

                  <Link to={`/teams/${team2data.team}`}>
                    <div className="h2h-header-team-right">
                      <span id="header">{team2data.team}</span>
                      <div
                        className="helmet-header-container mirror-helmet"
                        id="helmet"
                      >
                        <Helmet
                          team={team2data.team}
                          size={"h2h-header"}
                          helmetStyle={helmetStyle}
                          helmetView={helmetView}
                        />
                      </div>
                    </div>
                  </Link>
                  {/* <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
                    {perStat ? "total" : "game"}
                  </SC.primaryColorButton> */}
                </div>
              ) : (
                <div className="h2h-header-container">
                  <div className="h2h-header-team-left">
                    <div
                      className="helmet-header-container active-helmet"
                      id="helmet"
                    >
                      <Helmet
                        team={"loading"}
                        size={"h2h-header"}
                        helmetStyle={helmetStyle}
                        helmetView={helmetView}
                      />
                    </div>
                    <span id="header">Away</span>
                  </div>

                  <span>VS</span>

                  <div className="h2h-header-team-right">
                    <span id="header">Home</span>
                    <div
                      className="helmet-header-container mirror-helmet"
                      id="helmet"
                    >
                      <Helmet
                        team={"loading"}
                        size={"h2h-header"}
                        helmetStyle={helmetStyle}
                        helmetView={helmetView}
                      />
                    </div>
                  </div>
                  {/* <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
                    {perStat ? "total" : "game"}
                  </SC.primaryColorButton> */}
                </div>
              )}
            </div>
          </div>
        </SC.textOnBgColor>
      </SC.teampageHeader>
      <SC.PageWrapper className="h2h-page">
        <div className="h2h-inputs-container">
          <SC.h2hSelect
            className="h2h-team-input"
            name="team1input"
            onChange={handleChangeTeam1}
          >
            {teamnames.map((name, i) => {
              return (
                <SC.h2hSelectOption
                  value={name}
                  key={i}
                  selected={name === team1input}
                >
                  {name}
                </SC.h2hSelectOption>
              );
            })}
          </SC.h2hSelect>
          <SC.textOnBgColor>
            <span>vs</span>
          </SC.textOnBgColor>
          <SC.h2hSelect
            className="h2h-team-input"
            name="team2input"
            onChange={handleChangeTeam2}
          >
            {teamnames.map((name, i) => {
              return (
                <SC.h2hSelectOption
                  value={name}
                  key={i}
                  selected={name === team2input}
                >
                  {name}
                </SC.h2hSelectOption>
              );
            })}
          </SC.h2hSelect>
          <SC.primaryColorAnchorInverse
            className="h2h-button"
            onClick={isInvalid ? null : () => handleSubmit()}
          >
            view
          </SC.primaryColorAnchorInverse>
        </div>

        {loaded ? (
          <div className="h2h-content">
            {/* TEAM NAMES */}
            <div className="h2h-teams">
              {/* TEAM 1 NAME AND HELMET */}
              <div className="h2h-team-name-container">
                <Link to={`/teams/${team1data.team}`}>
                  <div className=" active-helmet">
                    <Helmet
                      team={team1data.team}
                      size={"h2h"}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  </div>
                  <SC.textOnBgColor>
                    <span className="h2h-team-name">{team1data.team}</span>
                  </SC.textOnBgColor>
                </Link>
              </div>
              {/* VS COLUMN */}
              <div className="h2h-vs-col">
                <div className="h2h-name-vs">
                  <SC.textOnBgColor>⠀</SC.textOnBgColor>
                </div>
                <div className="h2h-name-vs">
                  <SC.textOnBgColor>vs</SC.textOnBgColor>
                </div>
              </div>
              {/* TEAM 2 NAME AND HELMET */}
              <div className="h2h-team-name-container">
                <Link to={`/teams/${team2data.team}`}>
                  <div className="mirror-helmet ">
                    <Helmet
                      team={team2data.team}
                      size={"h2h"}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  </div>
                  <SC.textOnBgColor>
                    <span className="h2h-team-name">{team2data.team}</span>
                  </SC.textOnBgColor>
                </Link>
              </div>
            </div>

            {/* TEAM STATS */}
            <div className="h2h-all-stats-container">
              {/* H2H SECTION */}
              <H2H_Section
                team1data={team1data}
                team2data={team2data}
                winsRank_h2h={winsRank_h2h}
                ppgRank_h2h={ppgRank_h2h}
                pfRank_h2h={pfRank_h2h}
                difRank_h2h={difRank_h2h}
                difpgRank_h2h={difpgRank_h2h}
                winStreak={winStreak}
                winner={winner}
                helmetStyle={helmetStyle}
                helmetView={helmetView}
              />
              {/* OVERALL SECTION */}
              <Overall_Section
                team1data={team1data}
                team2data={team2data}
                winPercentageRank={winPercentageRank}
                ppgRank_overall={ppgRank_overall}
                papgRank_overall={papgRank_overall}
                difpgRank_overall={difpgRank_overall}
                pfRank_overall={pfRank_overall}
                paRank_overall={paRank_overall}
                difRank_overall={difRank_overall}
              />
            </div>
            {/* MATCHUPS */}
            <Matchups
              matchups={matchups}
              j_Division={j_Division}
              schedule={schedule}
              loaded={loaded}
              helmetStyle={helmetStyle}
              helmetView={helmetView}
            />
          </div>
        ) : (
          <Loader type={"full-screen"} />
        )}
        <SC.teampageHeader className="schedule-buttons-container desktop">
          <SC.primaryColorAnchorInverse
            className={
              schedule === "RS" ? "schedule-button active" : "schedule-button"
            }
            onClick={() => changeSchedule("RS")}
          >
            Regular Season
          </SC.primaryColorAnchorInverse>
          <SC.primaryColorAnchorInverse
            className={
              schedule === "playoffs"
                ? "schedule-button active"
                : "schedule-button"
            }
            onClick={() => changeSchedule("playoffs")}
          >
            Playoffs
          </SC.primaryColorAnchorInverse>
          <SC.primaryColorAnchorInverse
            className={
              schedule === "AG" ? "schedule-button active" : "schedule-button"
            }
            onClick={() => changeSchedule("AG")}
          >
            All Games
          </SC.primaryColorAnchorInverse>
        </SC.teampageHeader>
        <SC.teampageHeader className="schedule-buttons-container mobile">
          <SC.primaryColorAnchorInverse
            className={
              schedule === "RS" ? "schedule-button active" : "schedule-button"
            }
            onClick={() => changeSchedule("RS")}
          >
            Season
          </SC.primaryColorAnchorInverse>
          <SC.primaryColorAnchorInverse
            className={
              schedule === "playoffs"
                ? "schedule-button active"
                : "schedule-button"
            }
            onClick={() => changeSchedule("playoffs")}
          >
            Playoffs
          </SC.primaryColorAnchorInverse>
          <SC.primaryColorAnchorInverse
            className={
              schedule === "AG" ? "schedule-button active" : "schedule-button"
            }
            onClick={() => changeSchedule("AG")}
          >
            All
          </SC.primaryColorAnchorInverse>
        </SC.teampageHeader>
      </SC.PageWrapper>
    </div>
  );
}
