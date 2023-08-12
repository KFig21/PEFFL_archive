/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SC from "../../themes/styledComponents";
import Loader from "../../components/loader/Loader";
import Helmet from "../../components/helmet/Helmet";
import { GpsNotFixedOutlined } from "@material-ui/icons";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import "./Matchups.scss";
import { useSelector } from "react-redux";
import { getAllMatchups, getAllMatchupsMedals, getAllMedalsForMatchups } from "../../helpers/apiCalls";

export default function Matchups({
  setCurrentPage,
  j_Division,
  helmetStyle,
  helmetView,
}) {
  const [matchups, setMatchups] = useState([]);
  const [perStat, setPerStat] = useState(true);
  const [sortBy, setSortBy] = useState("G");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [schedule, setSchedule] = useState("RS");
  const user = useSelector((state) => state.user);
  const [allMatchupsMedals, setAllMatchupsMedals] = useState({});

  const getMatchups = async (column, order, table) => {
    setMatchups(await getAllMatchups(column, order, table));
  };

  const fetchMedals = async (table) => {
    let res = await getAllMedalsForMatchups(table)
    setAllMatchupsMedals(res)
  };

  const handleColumnSort = (col) => {
    if (col === sortBy) {
      if (sortOrder === "DESC") {
        setSortOrder("ASC");
        getMatchups(col, "ASC", schedule);
      } else {
        setSortBy("");
        setSortOrder("DESC");
        getMatchups("G", "DESC", schedule);
      }
    } else {
      setSortBy(col);
      setSortOrder("DESC");
      getMatchups(col, "DESC", schedule);
    }
  };

  const changeSchedule = (table) => {
    setSchedule(table);
    getMatchups("G", "DESC", table);
    setSortBy("G");
    fetchMedals(table);
  };

  useEffect(() => {
    setCurrentPage("matchups");
    fetchMedals("RS");
    setTimeout(() => {
      getMatchups("G", "DESC", "RS");
    }, 500);
  }, []);

  return (
    <div className="allmatchups-container">
      <SC.teampageHeader className="page-header">
        <div className="teampage-section-header">
          All Matchups
          <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
            {perStat ? "total" : "game"}
          </SC.primaryColorButton>
        </div>
      </SC.teampageHeader>
      {/* DESKTOP BUTTONS */}
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
      {/* MOBILE BUTTONS */}
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
      {matchups.length > 0 ? (
        <SC.TableContainer className="allmatchups-standings-container">
          <table>
            <thead>
              <SC.tableHeaderBgColor className="table-header">
                <th onClick={() => handleColumnSort("rank")}>Rank</th>
                <SC.tableSortableColHeader
                  className={
                    sortBy === "G" ? "column-header " : "column-header"
                  }
                  title="games played"
                  onClick={() => handleColumnSort("G")}
                >
                  G
                </SC.tableSortableColHeader>
                <th>Team</th>
                <SC.tableSortableColHeader
                  className={
                    sortBy === "W" ? "column-header active" : "column-header"
                  }
                  title="wins"
                  onClick={() => handleColumnSort("W")}
                >
                  W
                </SC.tableSortableColHeader>
                <th></th>

                <SC.tableSortableColHeader
                  className={
                    sortBy === "L" ? "column-header active" : "column-header"
                  }
                  title="losses"
                  onClick={() => handleColumnSort("L")}
                >
                  L
                </SC.tableSortableColHeader>
                <th>Opp</th>

                {/* link to H2H col */}
                <th></th>
                {/* padding col */}
                <th></th>
                {/* Win% */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "WinP" ? "column-header active" : "column-header"
                  }
                  title="Win %"
                  onClick={() => handleColumnSort("WinP")}
                >
                  <div className="sort-icon">
                    {sortBy === "WinP" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  Win%
                </SC.tableSortableColHeader>
                {/* POINTS FOR */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "PF" || sortBy === "PPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  title={perStat ? "points per game" : "points for"}
                  onClick={() =>
                    perStat ? handleColumnSort("PPG") : handleColumnSort("PF")
                  }
                >
                  <div className="sort-icon">
                    {sortBy === "PF" || sortBy === "PPG" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  {perStat ? "PPG" : "PF"}
                </SC.tableSortableColHeader>
                {/* POINTS AGAINST */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "PA" || sortBy === "PAPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  title={
                    perStat ? "opponents points per game" : "points against"
                  }
                  onClick={() =>
                    perStat ? handleColumnSort("PAPG") : handleColumnSort("PA")
                  }
                >
                  <div className="sort-icon">
                    {sortBy === "PA" || sortBy === "PAPG" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  {perStat ? "PAPG" : "PA"}
                </SC.tableSortableColHeader>
                {/* DIF */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "DIF" || sortBy === "DIFPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  title={perStat ? "PPG - PAPG" : "PF - PA"}
                  onClick={() =>
                    perStat
                      ? handleColumnSort("DIFPG")
                      : handleColumnSort("DIF")
                  }
                >
                  <div className="sort-icon">
                    {sortBy === "DIF" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  +/-
                </SC.tableSortableColHeader>
                {/* TOTAL POINTS */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "TOT" || sortBy === "TOTPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  title={perStat ? "Total PPG" : "Total Pts"}
                  onClick={() =>
                    perStat
                      ? handleColumnSort("TOTPG")
                      : handleColumnSort("TOT")
                  }
                >
                  <div className="sort-icon">
                    {sortBy === "TOT" || sortBy === "TOTPG" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  {perStat ? "TPG" : "Total"}
                </SC.tableSortableColHeader>
              </SC.tableHeaderBgColor>
            </thead>
            <tbody>
              {matchups.map((matchup, i) => {
                let PPG = (Math.round(matchup.ppg * 100) / 100).toFixed(1);
                let PAPG = (Math.round(matchup.papg * 100) / 100).toFixed(1);
                let DIFPG = (Math.round(matchup.difpg * 100) / 100).toFixed(1);
                let TOTPG = (Math.round(matchup.totpg * 100) / 100).toFixed(1);
                let totalDif = (
                  Math.round((matchup.pf - matchup.pa) * 100) / 100
                ).toFixed(0);
                let difFormat =
                  totalDif > 0 ? "green" : totalDif < 0 ? "crimson" : null;
                let winPercentage =
                  matchup.w === matchup.g && matchup.g > 0
                    ? "1.000"
                    : (((matchup.w / (matchup.w + matchup.l)) * 100) / 100)
                        .toFixed(3)
                        .toString()
                        .substring(1);

                // MEDALS
                let winpMedal =
                  allMatchupsMedals.winp.indexOf(winPercentage) > -1
                    ? "medal" + allMatchupsMedals.winp.indexOf(winPercentage)
                    : "nomedal";
                let pfMedal =
                  allMatchupsMedals.pf.indexOf(matchup.pf) > -1
                    ? "medal" + allMatchupsMedals.pf.indexOf(matchup.pf)
                    : "nomedal";
                let paMedal =
                  allMatchupsMedals.pa.indexOf(matchup.pa) > -1
                    ? "medal" + allMatchupsMedals.pa.indexOf(matchup.pa)
                    : "nomedal";
                let difMedal =
                  allMatchupsMedals.dif.indexOf(matchup.dif) > -1
                    ? "medal" + allMatchupsMedals.dif.indexOf(matchup.dif)
                    : "nomedal";
                let totMedal =
                  allMatchupsMedals.tot.indexOf(matchup.tot) > -1
                    ? "medal" + allMatchupsMedals.tot.indexOf(matchup.tot)
                    : "nomedal";
                let ppgMedal =
                  allMatchupsMedals.ppg.indexOf(PPG) > -1
                    ? "medal" + allMatchupsMedals.ppg.indexOf(PPG)
                    : "nomedal";
                let papgMedal =
                  allMatchupsMedals.papg.indexOf(PAPG) > -1
                    ? "medal" + allMatchupsMedals.papg.indexOf(PAPG)
                    : "nomedal";
                let difpgMedal =
                  allMatchupsMedals.difpg.indexOf(DIFPG) > -1
                    ? "medal" + allMatchupsMedals.difpg.indexOf(DIFPG)
                    : "nomedal";
                let totpgMedal =
                  allMatchupsMedals.totpg.indexOf(TOTPG) > -1
                    ? "medal" + allMatchupsMedals.totpg.indexOf(TOTPG)
                    : "nomedal";

                let winnerDivision = j_Division.includes(matchup.team)
                  ? "j_Division"
                  : "f_Division";
                let loserDivision = j_Division.includes(matchup.opp)
                  ? "j_Division"
                  : "f_Division";

                return (
                  <SC.tableBorderColorTR
                    className={`allmatchups-team-row ${
                      (user.username === matchup.team ||
                        (user.username === matchup.opp && sortBy === "G")) &&
                      user.highlightUser &&
                      "logged-in"
                    }`}
                    key={i}
                  >
                    {/* RANK */}
                    <td className="rank-col">
                      <span className="standings-rank medal">
                        <div className={`medal-medium medal${i}`}>{i + 1}</div>
                      </span>
                    </td>
                    {/* GAMES */}
                    <SC.tableBorderColorTD className="standings-col gb-col">
                      <SC.subtextOnBgColor>{matchup.g} gp</SC.subtextOnBgColor>
                    </SC.tableBorderColorTD>
                    {/* TEAM */}
                    <td className="allmatchups-team-away">
                      <Link to={`/teams/${matchup.team}`}>
                        <div className={`allmatchups-${winnerDivision}`}></div>
                        <SC.textOnBgColor className="allmatchups-team-name">
                          {matchup.team}
                        </SC.textOnBgColor>
                        <div className="active-helmet">
                          <Helmet
                            team={matchup.team}
                            size={"standings"}
                            helmetStyle={helmetStyle}
                            helmetView={helmetView}
                          />
                        </div>
                      </Link>
                    </td>
                    {/* WINS */}
                    <td className="standings-col record-col">
                      <SC.textOnBgColor>{matchup.w}</SC.textOnBgColor>
                    </td>
                    {/* DASH */}
                    <td className="standings-col record-col dash-col">
                      <SC.textOnBgColor> - </SC.textOnBgColor>{" "}
                    </td>
                    {/* LOSSES */}
                    <td className="standings-col record-col">
                      <SC.textOnBgColor>{matchup.l}</SC.textOnBgColor>
                    </td>
                    {/* OPPONENT */}
                    <td className="allmatchups-team-home">
                      <Link to={`/teams/${matchup.opp}`}>
                        <div className="mirror-helmet">
                          <Helmet
                            team={matchup.opp}
                            size={"standings"}
                            helmetStyle={helmetStyle}
                            helmetView={helmetView}
                          />
                        </div>
                        <SC.textOnBgColor className="allmatchups-team-name">
                          {matchup.opp}
                        </SC.textOnBgColor>
                        <div className={`allmatchups-${loserDivision}`}></div>
                      </Link>
                    </td>
                    {/* link to H2H */}
                    <td className="standings-col h2h-link-col">
                      <Link to={`/h2h/${matchup.team}/${matchup.opp}`}>
                        <SC.subtextOnBgColor>
                          <span>
                            <GpsNotFixedOutlined />
                          </span>
                        </SC.subtextOnBgColor>
                      </Link>
                    </td>
                    {/* border */}
                    <td className="table-border-col"></td>
                    {/* Win % */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "WinP"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points">
                        <div className="standings-ppg">
                          <SC.textOnBgColor>{winPercentage}</SC.textOnBgColor>
                          <div className={`medal-small ${winpMedal}`}></div>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* POINTS FOR */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "PF" || sortBy === "PPG"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points">
                        <div className="standings-ppg">
                          <SC.textOnBgColor>
                            {perStat ? PPG : matchup.pf.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? ppgMedal : pfMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? matchup.pf.toLocaleString() : PPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* POINTS AGAINST */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "PA" || sortBy === "PAPG"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points ">
                        <div className="standings-ppg">
                          <SC.textOnBgColor>
                            {perStat ? PAPG : matchup.pa.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? papgMedal : paMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? matchup.pa.toLocaleString() : PAPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* PLUS MINUS */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "DIF" || sortBy === "DIFPG"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points ">
                        <div
                          className="standings-ppg"
                          style={{ color: `${difFormat}` }}
                        >
                          {matchup.dif > 0 ? "+" : ""}
                          {perStat ? DIFPG : matchup.dif.toLocaleString()}
                          <div
                            className={`medal-small ${
                              perStat ? difpgMedal : difMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {matchup.dif > 0 ? "+" : ""}
                            {perStat ? matchup.dif.toLocaleString() : DIFPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* TOTAL */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "TOT" || sortBy === "TOTPG"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points ">
                        <div className="standings-ppg">
                          <SC.textOnBgColor>
                            {perStat ? TOTPG : matchup.tot.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? totpgMedal : totMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? matchup.tot.toLocaleString() : TOTPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                  </SC.tableBorderColorTR>
                );
              })}
            </tbody>
          </table>
        </SC.TableContainer>
      ) : (
        <Loader type={"full-screen"} />
      )}
    </div>
  );
}
