/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Standings.scss";
import Helmet from "../../components/helmet/Helmet";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import SC from "../../themes/styledComponents";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getStandings,
  getStandingsMedals,
  getStandingsRank,
} from "../../helpers/apiCalls";
import { numberWithCommas } from "../../helpers/utils";

export default function Standings({
  setCurrentPage,
  j_Division,
  f_Division,
  helmetStyle,
  helmetView,
}) {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [perStat, setPerStat] = useState(true);
  const [sortBy, setSortBy] = useState("W");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [mostWins, setMostWins] = useState(0);
  const [schedule, setSchedule] = useState("RS");
  const user = useSelector((state) => state.user);
  // TEAMS MEDALS
  const [PFmedals, setPFmedals] = useState([]);
  const [PAmedals, setPAmedals] = useState([]);
  const [PPGmedals, setPPGmedals] = useState([]);
  const [PAPGmedals, setPAPGmedals] = useState([]);
  const [DIFmedals, setDIFmedals] = useState([]);
  const [DIFPGmedals, setDIFPGmedals] = useState([]);
  const [TOTmedals, setTOTmedals] = useState([]);
  const [TOTPGmedals, setTOTPGmedals] = useState([]);
  const [standings, setStandings] = useState([]);

  const getTeams = async (column, order, table) => {
    setTeams(await getStandings(column, order, table));
    setLoading(false);
  };

  const fetchMedals = async (table) => {
    setPFmedals(await getStandingsMedals(table, "PF"));
    setPAmedals(await getStandingsMedals(table, "PA"));
    setPPGmedals(await getStandingsMedals(table, "PPG"));
    setPAPGmedals(await getStandingsMedals(table, "PAPG"));
    setDIFmedals(await getStandingsMedals(table, "DIF"));
    setDIFPGmedals(await getStandingsMedals(table, "DIFPG"));
    setTOTmedals(await getStandingsMedals(table, "TOT"));
    setTOTPGmedals(await getStandingsMedals(table, "TOTPG"));
    setStandings(await getStandingsRank(table));
  };

  const handleColumnSort = (col) => {
    if (col === sortBy) {
      if (sortOrder === "DESC") {
        setSortOrder("ASC");
        getTeams(col, "ASC", schedule);
      } else {
        setSortBy("W");
        setSortOrder("DESC");
        getTeams("W", "DESC", schedule);
      }
    } else {
      setSortBy(col);
      setSortOrder("DESC");
      getTeams(col, "DESC", schedule);
    }
  };

  const changeSchedule = async (table) => {
    setLoading(true);
    setMostWins(0);
    setSchedule(table);
    await fetchMedals(table);
    setTimeout(() => {
      getTeams("W", "DESC", table);
      setSortBy("W");
    }, 500);
  };

  useEffect(() => {
    setCurrentPage("standings");
    fetchMedals("RS");
    setTimeout(() => {
      getTeams("W", "DESC", "RS");
    }, 500);
  }, []);

  return (
    <div style={{maxHeight: "inherit", overflowY: "hidden"}}>
      <SC.teampageHeader className="page-header">
        <div className="standings-header desktop">
          {schedule === "RS" && "Regular Season Standings"}
          {schedule === "playoffs" && "Post Season Standings"}
          {schedule === "AG" && "All Games Standings"}
          <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
            {perStat ? "total" : "game"}
          </SC.primaryColorButton>
        </div>
        <div className="standings-header mobile">
          {schedule === "RS" && "Regular Season"}
          {schedule === "playoffs" && "Post Season"}
          {schedule === "AG" && "All Games"}
          <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
            {perStat ? "total" : "game"}
          </SC.primaryColorButton>
        </div>
      </SC.teampageHeader>
      <SC.PageWrapper className="standings-page">
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
        <SC.TableContainer className="standing-container">
          {!loading ? (
            <table>
              <thead>
                <SC.tableHeaderBgColor className="table-header">
                  <th onClick={() => handleColumnSort("W")}>Team</th>
                  <th onClick={() => handleColumnSort("W")} title="wins">
                    W
                  </th>
                  <th onClick={() => handleColumnSort("W")}></th>
                  <th onClick={() => handleColumnSort("W")} title="losses">
                    L
                  </th>
                  <th
                    onClick={
                      schedule !== "playoffs"
                        ? () => handleColumnSort("W")
                        : () => handleColumnSort("A")
                    }
                    title={schedule !== "playoffs" ? "Games back" : "Appearances"}
                  >
                    {schedule !== "playoffs" ? "GB" : "A"}
                  </th>
                  {/* POINTS FOR / PPG */}
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
                  {/* POINTS AGAINST / PAPG */}
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
                  {/* DIF / DIFPG */}
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
                      {sortBy === "DIF" || sortBy === "DIFPG" ? (
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
                  {/* TOTAL POINTS / TOTPG */}
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
                  {/* DENR CUPS */}
                  <SC.tableSortableColHeader
                    className={
                      sortBy === "C"
                        ? "column-header trophy-header active"
                        : "column-header"
                    }
                    onClick={() => handleColumnSort("C")}
                    title="DenR Cups"
                  >
                    <div className="sort-icon">
                      {sortBy === "C" ? (
                        sortOrder === "DESC" ? (
                          <ArrowDropDownRoundedIcon />
                        ) : (
                          <ArrowDropUpRoundedIcon />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    🏆
                  </SC.tableSortableColHeader>
                  {/* RUNNER UPS */}
                  <SC.tableSortableColHeader
                    className={
                      sortBy === "R"
                        ? "column-header trophy-header active"
                        : "column-header"
                    }
                    onClick={() => handleColumnSort("R")}
                    title="Runner Ups"
                  >
                    <div className="sort-icon">
                      {sortBy === "R" ? (
                        sortOrder === "DESC" ? (
                          <ArrowDropDownRoundedIcon />
                        ) : (
                          <ArrowDropUpRoundedIcon />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    🥈
                  </SC.tableSortableColHeader>
                </SC.tableHeaderBgColor>
              </thead>
              <tbody>
                {teams.map((team, i) => {
                  let PPG = (Math.round(team.ppg * 100) / 100).toFixed(1);
                  let PAPG = (Math.round(team.papg * 100) / 100).toFixed(1);
                  let DIFPG = (Math.round(team.difpg * 100) / 100).toFixed(1);
                  let TOTPG = (Math.round(team.totpg * 100) / 100).toFixed(1);
                  team.w = parseInt(team.w)
                  team.l = parseInt(team.l)

                  let difFormat =
                    team.dif > 0 ? "green" : team.dif < 0 ? "crimson" : "grey";

                  if (team.w > mostWins) {
                    setMostWins(team.w);
                  }

                  let GB = mostWins - team.w > 0 ? mostWins - team.w : "-";

                  let winPercentage = (((team.w / (team.w + team.l)) * 100) / 100)
                    .toFixed(3)
                    .toString()
                    .substring(1);

                  let pfMedal =
                    PFmedals.indexOf(team.pf) > -1
                      ? "medal" + PFmedals.indexOf(team.pf)
                      : "nomedal";
                  let paMedal =
                    PAmedals.indexOf(team.pa) > -1
                      ? "medal" + PAmedals.indexOf(team.pa)
                      : "nomedal";
                  let difMedal =
                    DIFmedals.indexOf(team.dif) > -1
                      ? "medal" + DIFmedals.indexOf(team.dif)
                      : "nomedal";
                  let totMedal =
                    TOTmedals.indexOf(team.tot) > -1
                      ? "medal" + TOTmedals.indexOf(team.tot)
                      : "nomedal";
                  let ppgMedal =
                    PPGmedals.indexOf(PPG) > -1
                      ? "medal" + PPGmedals.indexOf(PPG)
                      : "nomedal";
                  let papgMedal =
                    PAPGmedals.indexOf(PAPG) > -1
                      ? "medal" + PAPGmedals.indexOf(PAPG)
                      : "nomedal";
                  let difpgMedal =
                    DIFPGmedals.indexOf(DIFPG) > -1
                      ? "medal" + DIFPGmedals.indexOf(DIFPG)
                      : "nomedal";
                  let totpgMedal =
                    TOTPGmedals.indexOf(TOTPG) > -1
                      ? "medal" + TOTPGmedals.indexOf(TOTPG)
                      : "nomedal";

                  let rank = standings.indexOf(team.team) + 1;

                  let division = j_Division.includes(team.team)
                    ? "j_Division"
                    : "f_Division";

                  let titlesFormat = parseInt(team.c) > 0 ? "goldenrod" : "transparent";
                  let runnerUpsFormat = parseInt(team.r) > 0 ? "#a0a3a6" : "transparent";

                  return (
                    <SC.tableBorderColorTR
                      className={`standings-team-row ${
                        user.username === team.team &&
                        user.highlightUser &&
                        "logged-in"
                      }`}
                      key={i}
                    >
                      {/* TEAM */}
                      <Link to={`/teams/${team.team}`}>
                        <td className="standings-team">
                          <span className="standings-rank medal">
                            <div className={`medal-medium medal${rank - 1}`}>
                              {rank}
                            </div>
                          </span>
                          <Helmet
                            team={team.team}
                            size={"standings"}
                            helmetStyle={helmetStyle}
                            helmetView={helmetView}
                          />
                          <div className="team-name-with-subtext">
                            <SC.textOnBgColor className="standings-team-name">
                              {team.team}
                            </SC.textOnBgColor>
                            <SC.subtextOnBgColor className="standings-team-subtext">
                              {team.g} {team.g !== '1' ? "games" : "game"},{" "}
                              {winPercentage} win%
                            </SC.subtextOnBgColor>
                          </div>
                          <div className={`standings-${division}`}></div>
                        </td>
                      </Link>
                      {/* WINS */}
                      <td className="standings-col record-col">
                        <SC.textOnBgColor>{team.w}</SC.textOnBgColor>
                      </td>
                      {/* DASH */}
                      <td className="standings-col record-col dash-col">
                        <SC.textOnBgColor> - </SC.textOnBgColor>{" "}
                      </td>
                      {/* LOSSES */}
                      <td className="standings-col record-col">
                        <SC.textOnBgColor>{team.l}</SC.textOnBgColor>
                      </td>
                      <SC.tableBorderColorTD className="standings-col gb-col">
                        <SC.subtextOnBgColor>
                          {schedule !== "playoffs" ? GB : team.A}
                        </SC.subtextOnBgColor>
                      </SC.tableBorderColorTD>
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
                              {perStat ? PPG : numberWithCommas(team.pf)}
                            </SC.textOnBgColor>
                            <div
                              className={`medal-small ${
                                perStat ? ppgMedal : pfMedal
                              }`}
                            ></div>
                          </div>
                          <div className="standings-total-points">
                            <SC.subtextOnBgColor>
                              {perStat ? numberWithCommas(team.pf) : PPG}
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
                              {perStat ? PAPG : numberWithCommas(team.pa)}
                            </SC.textOnBgColor>
                            <div
                              className={`medal-small ${
                                perStat ? papgMedal : paMedal
                              }`}
                            ></div>
                          </div>
                          <div className="standings-total-points">
                            <SC.subtextOnBgColor>
                              {perStat ? numberWithCommas(team.pa) : PAPG}
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
                            {team.dif > 0 ? "+" : ""}
                            {perStat ? DIFPG : numberWithCommas(team.dif)}
                            <div
                              className={`medal-small ${
                                perStat ? difpgMedal : difMedal
                              }`}
                            ></div>
                          </div>
                          <div className="standings-total-points">
                            <SC.subtextOnBgColor>
                              {team.dif > 0 ? "+" : ""}
                              {perStat ? numberWithCommas(team.dif) : DIFPG}
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
                              {perStat ? TOTPG : team.tot.toLocaleString()}
                            </SC.textOnBgColor>
                            <div
                              className={`medal-small ${
                                perStat ? totpgMedal : totMedal
                              }`}
                            ></div>
                          </div>
                          <div className="standings-total-points">
                            <SC.subtextOnBgColor>
                              {perStat ? team.tot.toLocaleString() : TOTPG}
                            </SC.subtextOnBgColor>
                          </div>
                        </div>
                      </SC.tableSortableCol>
                      {/* DENR CUPS */}
                      <SC.tableSortableCol
                        className={
                          sortBy === "C"
                            ? "standings-col titles-col active"
                            : "standings-col titles-col"
                        }
                      >
                        <div className="standings-points ">
                          <div
                            className="standings-ppg"
                            style={{ color: `${titlesFormat}` }}
                          >
                            <strong>{team.c}</strong>
                          </div>
                        </div>
                      </SC.tableSortableCol>
                      {/* RUNNER UPS */}
                      <SC.tableSortableCol
                        className={
                          sortBy === "R"
                            ? "standings-col titles-col active"
                            : "standings-col titles-col "
                        }
                      >
                        <div className="standings-points ">
                          <div
                            className="standings-ppg"
                            style={{ color: `${runnerUpsFormat}` }}
                          >
                            <strong>{team.r}</strong>
                          </div>
                        </div>
                      </SC.tableSortableCol>
                    </SC.tableBorderColorTR>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Loader type={"full-screen"} />
          )}
        </SC.TableContainer>
      </SC.PageWrapper>
    </div>
  );
}
