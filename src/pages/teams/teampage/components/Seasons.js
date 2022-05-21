/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import SC from "../../../../themes/styledComponents";
import axios from "axios";
import Loader from "../../../../components/loader/Loader";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import "../../teampage/TeamPage.scss";
import { Link } from "react-router-dom";
import {
  getAllTeamsMedals,
  getTeamSeasons,
} from "../../../../helpers/apiCalls";
import {
  weeklyMax,
  weeklyMin,
  espnIds,
} from "../../../../helpers/hardStats.js";
import { useSelector } from "react-redux";

export default function Seasons({ team, j_Division }) {
  const [seasons, setSeasons] = useState([]);
  const [perStat, setPerStat] = useState(true);
  const [sortBy, setSortBy] = useState("year");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [schedule, setSchedule] = useState("RS");
  const user = useSelector((state) => state.user);
  // TEAMS MEDALS
  const [allTeamsPFmedals, setAllTeamsPFmedals] = useState([]);
  const [allTeamsPAmedals, setAllTeamsPAmedals] = useState([]);
  const [allTeamsPPGmedals, setAllTeamsPPGmedals] = useState([]);
  const [allTeamsPAPGmedals, setAllTeamsPAPGmedals] = useState([]);
  const [allTeamsDIFmedals, setAllTeamsDIFmedals] = useState([]);
  const [allTeamsDIFPGmedals, setAllTeamsDIFPGmedals] = useState([]);
  const [allTeamsTOTmedals, setAllTeamsTOTmedals] = useState([]);
  const [allTeamsTOTPGmedals, setAllTeamsTOTPGmedals] = useState([]);

  const fetchSeasons = async (column, order, table) => {
    setSeasons(await getTeamSeasons(team.team, column, order, table));
  };
  const fetchMedals = async (table) => {
    setAllTeamsPFmedals(await getAllTeamsMedals(table, "PF"));
    setAllTeamsPAmedals(await getAllTeamsMedals(table, "PA"));
    setAllTeamsDIFmedals(await getAllTeamsMedals(table, "DIF"));
    setAllTeamsTOTmedals(await getAllTeamsMedals(table, "TOT"));
    setAllTeamsPPGmedals(await getAllTeamsMedals(table, "PPG"));
    setAllTeamsPAPGmedals(await getAllTeamsMedals(table, "PAPG"));
    setAllTeamsDIFPGmedals(await getAllTeamsMedals(table, "DIFPG"));
    setAllTeamsTOTPGmedals(await getAllTeamsMedals(table, "TOTPG"));
  };

  const handleColumnSort = (col) => {
    if (col === sortBy) {
      if (sortOrder === "DESC") {
        setSortOrder("ASC");
        fetchSeasons(col, "ASC", schedule);
      } else {
        setSortBy("year");
        setSortOrder("DESC");
        fetchSeasons("year", "DESC", schedule);
      }
    } else {
      setSortBy(col);
      setSortOrder("DESC");
      fetchSeasons(col, "DESC", schedule);
    }
  };

  const changeSchedule = (table) => {
    setSchedule(table);
    fetchSeasons("year", "DESC", table);
    fetchMedals(table);
  };

  useEffect(() => {
    fetchMedals("RS");
    setTimeout(() => {
      fetchSeasons("year", "DESC", "RS");
    }, 250);
  }, []);

  const handleCheckWeeklyMinMax = (year, week, pts) => {
    if (weeklyMax[year][week] === pts) {
      return "weekly-high";
    } else if (weeklyMin[year][week] === pts) {
      return "weekly-low";
    } else {
      return "";
    }
  };

  const handleChangePerStat = () => {
    setPerStat(!perStat);
  };

  return (
    <div className="teampage-section-container table">
      <div className="teampage-section-header-container">
        <SC.textOnBgColor>
          <div className="teampage-section-header">
            SEASONS
            <SC.primaryColorButton onClick={() => handleChangePerStat()}>
              {perStat ? "total" : "game"}
            </SC.primaryColorButton>
          </div>
        </SC.textOnBgColor>
      </div>
      <div className="h2h-buttons-container desktop">
        <SC.primaryColorAnchorInverse
          className={schedule === "RS" ? "h2h-button active" : "h2h-button"}
          onClick={() => changeSchedule("RS")}
        >
          Regular Season
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={
            schedule === "playoffs" ? "h2h-button active" : "h2h-button"
          }
          onClick={() => changeSchedule("playoffs")}
        >
          Playoffs
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={schedule === "AG" ? "h2h-button active" : "h2h-button"}
          onClick={() => changeSchedule("AG")}
        >
          All Games
        </SC.primaryColorAnchorInverse>
      </div>
      <div className="h2h-buttons-container mobile">
        <SC.primaryColorAnchorInverse
          className={schedule === "RS" ? "h2h-button active" : "h2h-button"}
          onClick={() => changeSchedule("RS")}
        >
          Season
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={
            schedule === "playoffs" ? "h2h-button active" : "h2h-button"
          }
          onClick={() => changeSchedule("playoffs")}
        >
          Playoffs
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={schedule === "AG" ? "h2h-button active" : "h2h-button"}
          onClick={() => changeSchedule("AG")}
        >
          All
        </SC.primaryColorAnchorInverse>
      </div>
      <SC.TableContainer className="teampage-h2h-table">
        {seasons.length > 0 ? (
          <table>
            {/* TABLE HEADERS */}
            <thead>
              <SC.tableHeaderBgColor className="table-header">
                <th>Year</th>
                {/* WINS */}
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
                {/* LOSSES */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "L" ? "column-header active" : "column-header"
                  }
                  title="losses"
                  onClick={() => handleColumnSort("L")}
                >
                  L
                </SC.tableSortableColHeader>
                <th></th>
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
                {/* TOT / TOTPG */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "TOT" || sortBy === "TOTPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  title={perStat ? "Total PPG" : "Total pts"}
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
                {/* Link col */}
                {user.username !== null && <th></th>}
                {/* Schedule cols */}
                {schedule !== "playoffs" && <th>1</th>}
                {schedule !== "playoffs" && <th>2</th>}
                {schedule !== "playoffs" && <th>3</th>}
                {schedule !== "playoffs" && <th>4</th>}
                {schedule !== "playoffs" && <th>5</th>}
                {schedule !== "playoffs" && <th>6</th>}
                {schedule !== "playoffs" && <th>7</th>}
                {schedule !== "playoffs" && <th>8</th>}
                {schedule !== "playoffs" && <th>9</th>}
                {schedule !== "playoffs" && <th>10</th>}
                {schedule !== "playoffs" && <th>11</th>}
                {schedule !== "playoffs" && <th>12</th>}
                {schedule !== "playoffs" && <th>13</th>}
                {schedule !== "playoffs" && <th>14</th>}
                {schedule !== "RS" && <th>WC</th>}
                {schedule !== "RS" && <th>SF</th>}
                {schedule !== "RS" && <th>DC</th>}
              </SC.tableHeaderBgColor>
            </thead>
            {/* TABLE CONTENT */}
            <tbody>
              {seasons.map((season, i) => {
                let weeks = [
                  {
                    pts: season.week1,
                    outcome: season.week1_outcome,
                    opp: season.week1_opp,
                    pa: season.week1_pa,
                  },
                  {
                    pts: season.week2,
                    outcome: season.week2_outcome,
                    opp: season.week2_opp,
                    pa: season.week2_pa,
                  },
                  {
                    pts: season.week3,
                    outcome: season.week3_outcome,
                    opp: season.week3_opp,
                    pa: season.week3_pa,
                  },
                  {
                    pts: season.week4,
                    outcome: season.week4_outcome,
                    opp: season.week4_opp,
                    pa: season.week4_pa,
                  },
                  {
                    pts: season.week5,
                    outcome: season.week5_outcome,
                    opp: season.week5_opp,
                    pa: season.week5_pa,
                  },
                  {
                    pts: season.week6,
                    outcome: season.week6_outcome,
                    opp: season.week6_opp,
                    pa: season.week6_pa,
                  },
                  {
                    pts: season.week7,
                    outcome: season.week7_outcome,
                    opp: season.week7_opp,
                    pa: season.week7_pa,
                  },
                  {
                    pts: season.week8,
                    outcome: season.week8_outcome,
                    opp: season.week8_opp,
                    pa: season.week8_pa,
                  },
                  {
                    pts: season.week9,
                    outcome: season.week9_outcome,
                    opp: season.week9_opp,
                    pa: season.week9_pa,
                  },
                  {
                    pts: season.week10,
                    outcome: season.week10_outcome,
                    opp: season.week10_opp,
                    pa: season.week10_pa,
                  },
                  {
                    pts: season.week11,
                    outcome: season.week11_outcome,
                    opp: season.week11_opp,
                    pa: season.week11_pa,
                  },
                  {
                    pts: season.week12,
                    outcome: season.week12_outcome,
                    opp: season.week12_opp,
                    pa: season.week12_pa,
                  },
                  {
                    pts: season.week13,
                    outcome: season.week13_outcome,
                    opp: season.week13_opp,
                    pa: season.week13_pa,
                  },
                ];

                if (season.week14 !== undefined) {
                  weeks.push({
                    pts: season.week14,
                    outcome: season.week14_outcome,
                    opp: season.week14_opp,
                    pa: season.week14_pa,
                  });
                }

                let playoffs = [
                  {
                    pts: season.wc,
                    outcome: season.weekWc_outcome,
                    opp: season.weekWc_opp,
                    pa: season.weekWc_pa,
                  },
                  {
                    pts: season.sf,
                    outcome: season.weekSf_outcome,
                    opp: season.weekSf_opp,
                    pa: season.weekSf_pa,
                  },
                  {
                    pts: season.dc,
                    outcome: season.weekDc_outcome,
                    opp: season.weekDc_opp,
                    pa: season.weekDc_pa,
                  },
                ];

                let PPG = (Math.round(season.PPG * 100) / 100).toFixed(1);
                let PAPG = (Math.round(season.PAPG * 100) / 100).toFixed(1);
                let DIFPG = (Math.round(season.DIFPG * 100) / 100).toFixed(1);
                let TOTPG = (Math.round(season.TOTPG * 100) / 100).toFixed(1);

                // MEDALS
                let pfMedal =
                  allTeamsPFmedals.indexOf(season.PF) > -1
                    ? "medal" + allTeamsPFmedals.indexOf(season.PF)
                    : "nomedal";
                let paMedal =
                  allTeamsPAmedals.indexOf(season.PA) > -1
                    ? "medal" + allTeamsPAmedals.indexOf(season.PA)
                    : "nomedal";
                let difMedal =
                  allTeamsDIFmedals.indexOf(season.DIF) > -1
                    ? "medal" + allTeamsDIFmedals.indexOf(season.DIF)
                    : "nomedal";
                let totMedal =
                  allTeamsTOTmedals.indexOf(season.TOT) > -1
                    ? "medal" + allTeamsTOTmedals.indexOf(season.TOT)
                    : "nomedal";
                let ppgMedal =
                  allTeamsPPGmedals.indexOf(PPG) > -1
                    ? "medal" + allTeamsPPGmedals.indexOf(PPG)
                    : "nomedal";
                let papgMedal =
                  allTeamsPAPGmedals.indexOf(PAPG) > -1
                    ? "medal" + allTeamsPAPGmedals.indexOf(PAPG)
                    : "nomedal";
                let difpgMedal =
                  allTeamsDIFPGmedals.indexOf(DIFPG) > -1
                    ? "medal" + allTeamsDIFPGmedals.indexOf(DIFPG)
                    : "nomedal";
                let totpgMedal =
                  allTeamsTOTPGmedals.indexOf(TOTPG) > -1
                    ? "medal" + allTeamsTOTPGmedals.indexOf(TOTPG)
                    : "nomedal";

                let difFormat =
                  season.DIF > 0 ? "green" : season.DIF < 0 ? "crimson" : null;

                let espnId = espnIds[team.team];

                return (
                  <SC.tableBorderColorTR className="h2h-team-row" key={i}>
                    {/* YEAR */}
                    <Link to={`/seasons/${season.year_}`}>
                      <td className="standings-col year-col ">
                        <SC.textOnBgColor>{season.year_}</SC.textOnBgColor>
                      </td>
                    </Link>
                    {/* WINS */}
                    <td className="standings-col record-col">
                      <SC.textOnBgColor>{season.W}</SC.textOnBgColor>
                    </td>
                    {/* DASH */}
                    <td className="standings-col record-col dash-col">
                      <SC.textOnBgColor> - </SC.textOnBgColor>{" "}
                    </td>
                    {/* LOSSES */}
                    <td className="standings-col record-col ">
                      <SC.textOnBgColor>{season.L}</SC.textOnBgColor>
                    </td>
                    {/* border */}
                    <td className="table-border-col"></td>

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
                            {perStat ? PPG : season.PF.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? ppgMedal : pfMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? season.PF.toLocaleString() : PPG}
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
                            {perStat ? PAPG : season.PA.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? papgMedal : paMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? season.PA.toLocaleString() : PAPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* PLUS MINUS */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "DIF" || sortBy === "DIFPG"
                          ? "standings-col points-col dif active"
                          : "standings-col points-col dif"
                      }
                    >
                      <div className="standings-points ">
                        <div
                          className="standings-ppg"
                          style={{ color: `${difFormat}` }}
                        >
                          {perStat ? DIFPG : season.DIF.toLocaleString()}
                          <div
                            className={`medal-small ${
                              perStat ? difpgMedal : difMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? season.DIF.toLocaleString() : DIFPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* TOTAL*/}
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
                            {perStat ? TOTPG : season.TOT.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? totpgMedal : totMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? season.TOT.toLocaleString() : TOTPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>

                    {/* LINK to ESPN */}
                    {user.username !== null && (
                      <td className="espn-link-col">
                        <a
                          href={`https://fantasy.espn.com/football/team?leagueId=648045&seasonId=${season.year_}&teamId=${espnId}&view=overview`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SC.subtextOnBgColor className="link-icon-container">
                            <InsertLinkIcon className="link-icon" />
                          </SC.subtextOnBgColor>
                        </a>
                      </td>
                    )}

                    {/* REGULAR SEASON */}
                    {schedule !== "playoffs" &&
                      weeks.map((week, i) => {
                        let minMax = handleCheckWeeklyMinMax(
                          season.year_,
                          i,
                          week.pts
                        );
                        let outcome =
                          week.outcome === 1
                            ? "win"
                            : week.outcome === 0
                            ? "loss"
                            : "";
                        return (
                          <SC.tableSortableCol
                            className={`season-week-col ${
                              schedule === "AG" && i === 13 && "schedule-border"
                            }`}
                          >
                            <SC.seasonsTableWeekCell
                              className={`season-week-pts ${minMax} ${outcome}`}
                              title={`vs ${week.opp} - ${week.pa}`}
                            >
                              <SC.textOnBgColor>
                                {week.pts !== null ? week.pts : "-"}
                              </SC.textOnBgColor>
                            </SC.seasonsTableWeekCell>
                          </SC.tableSortableCol>
                        );
                      })}

                    {/* PLAYOFFS */}
                    {schedule !== "RS" &&
                      playoffs.map((week, i) => {
                        let outcome =
                          week.outcome === 1
                            ? "win"
                            : week.outcome === 0
                            ? "loss"
                            : "";
                        return (
                          <SC.tableSortableCol className="season-week-col">
                            <SC.seasonsTableWeekCell
                              className={`season-week-pts ${outcome}`}
                              title={`vs ${week.opp} - ${week.pa}`}
                            >
                              <SC.textOnBgColor>
                                {week.pts !== null ? week.pts : "-"}
                              </SC.textOnBgColor>
                            </SC.seasonsTableWeekCell>
                          </SC.tableSortableCol>
                        );
                      })}
                  </SC.tableBorderColorTR>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Loader type={"full-screen"} />
        )}
      </SC.TableContainer>
    </div>
  );
}
