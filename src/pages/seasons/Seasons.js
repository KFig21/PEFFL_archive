/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getSingleSeason,
  getSingleSeasonTrophies,
} from "../../helpers/apiCalls";
import SC from "../../themes/styledComponents";
import Helmet from "../../components/helmet/Helmet";
import "./Seasons.scss";
import { weeklyMax, weeklyMin, espnIds } from "../../helpers/hardStats.js";
import Loader from "../../components/loader/Loader";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
// trophy images
import denRcup from "../../assets/denrCup.png";
import ruTrophy from "../../assets/ruTrophy.png";
import jdivBanner from "../../assets/jdivBanner.png";
import fdivBanner from "../../assets/fdivBanner.png";
import mostPointsAward from "../../assets/mostPointsAward.png";
import rscTrophy from "../../assets/rscTrophy.png";
import { useSelector } from "react-redux";

export default function Seasons({
  setCurrentPage,
  j_Division,
  years,
  currentYear,
  helmetStyle,
  helmetView,
}) {
  const params = useParams("year");
  const user = useSelector((state) => state.user);
  const [yearInput, setYearInput] = useState(parseInt(params.year));
  const [seasonTableInfo, setSeasonTableInfo] = useState();
  const [loaded, setLoaded] = useState(false);
  const [tableLoaded, setTableLoaded] = useState(false);
  const [perStat, setPerStat] = useState(true);
  const [sortBy, setSortBy] = useState("W");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [schedule, setSchedule] = useState("RS");
  // AWARDS
  const [champion, setChampion] = useState("");
  const [runnerUp, setRunnerUp] = useState("");
  const [rsc, setRsc] = useState("");
  const [mostPoints, setmostPoints] = useState("");
  const [divisionWinnerJ, setDivisionWinnerJ] = useState("");
  const [divisionWinnerF, setDivisionWinnerF] = useState("");

  const handleCheckWeeklyMinMax = (week, pts) => {
    if (weeklyMax[yearInput][week] === parseInt(pts)) {
      return "weekly-high";
    } else if (weeklyMin[yearInput][week] === parseInt(pts)) {
      return "weekly-low";
    } else {
      return "";
    }
  };

  const handleGetSeasonTableInfo = async (
    year = currentYear,
    sortBy = "W",
    sortOrder = "DESC",
    table = "RS"
  ) => {
    // season info
    const getSeasonTableInfo = await getSingleSeason(
      year,
      sortBy,
      sortOrder,
      table
    );
    setSeasonTableInfo(getSeasonTableInfo);
    setYearInput(year);
    // awards
    const getTrophies = await getSingleSeasonTrophies(year);
    setChampion(getTrophies.lc);
    setRunnerUp(getTrophies.ru);
    setRsc(getTrophies.rsc);
    setmostPoints(getTrophies.p);
    if (j_Division.includes(getTrophies.dc1)) {
      setDivisionWinnerJ(getTrophies.dc1);
      setDivisionWinnerF(getTrophies.dc2);
    } else {
      setDivisionWinnerJ(getTrophies.dc2);
      setDivisionWinnerF(getTrophies.dc1);
    }

    setLoaded(true);
    setTableLoaded(true);
  };

  useEffect(() => {
    setCurrentPage("seasons");
    handleGetSeasonTableInfo(yearInput, "W", "DESC", "RS");
  }, []);

  const handleChangeYear = (e) => {
    setYearInput(e.target.value);
    handleGetSeasonTableInfo(e.target.value, sortBy, sortOrder, schedule);
    setLoaded(false);
  };

  const changeSchedule = (table) => {
    setTableLoaded(false);
    setSchedule(table);
    handleGetSeasonTableInfo(yearInput, sortBy, sortOrder, table);
  };

  const handleColumnSort = (col) => {
    setLoaded(false);
    if (col === sortBy) {
      if (sortOrder === "DESC") {
        setSortOrder("ASC");
        handleGetSeasonTableInfo(yearInput, col, "ASC", schedule);
      } else {
        setSortBy("");
        setSortOrder("DESC");
        handleGetSeasonTableInfo(yearInput, "W", "DESC", schedule);
      }
    } else {
      setSortBy(col);
      setSortOrder("DESC");
      handleGetSeasonTableInfo(yearInput, col, "DESC", schedule);
    }
  };

  return (
    <div className="seasons-page">
      <SC.teampageHeader className="page-header" id="header">
        <div className="seasons-header" id="wrapper">
          <SC.h2hSelect
            name="year-input"
            className=" input-as-title"
            onChange={handleChangeYear}
          >
            {years.map((year, i) => {
              return (
                <SC.h2hSelectOption
                  value={year}
                  key={i}
                  selected={year === yearInput}
                >
                  {year}
                </SC.h2hSelectOption>
              );
            })}
          </SC.h2hSelect>{" "}
          Season
        </div>
      </SC.teampageHeader>

      {loaded ? (
        <div className="season-all-content-container">
          {/* TROPHIES */}
          <div className="season-trophies-section">
            {/* SECTION HEADER */}
            <div className="teampage-section-header-container">
              <SC.textOnBgColor>
                <div className="teampage-section-header">AWARDS</div>
              </SC.textOnBgColor>
            </div>
            <div className="season-trophies-container">
              {/* DENR CUPS */}
              <div className="teampage-award-container">
                <img src={denRcup} alt="" className="awards-trophy-img" />
                <SC.textOnBgColor>
                  <span className="stat-title">DENR CUP</span>
                </SC.textOnBgColor>
                <SC.textOnBgColor>
                  <Link to={`/teams/${champion}`}>
                    <td className="award-team">
                      <Helmet
                        team={champion}
                        size={"season-standings"}
                        helmetStyle={helmetStyle}
                        helmetView={helmetView}
                      />
                      <SC.textOnBgColor className="award-team-name">
                        {champion}
                      </SC.textOnBgColor>
                    </td>
                  </Link>
                </SC.textOnBgColor>
              </div>
              {/* RUNNER UPS */}
              <div className="teampage-award-container">
                <img src={ruTrophy} alt="" className="awards-trophy-img" />
                <SC.textOnBgColor>
                  <span className="stat-title">RUNNER UP</span>
                </SC.textOnBgColor>
                <Link to={`/teams/${runnerUp}`}>
                  <td className="award-team">
                    <Helmet
                      team={runnerUp}
                      size={"season-standings"}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                    <SC.textOnBgColor className="award-team-name">
                      {runnerUp}
                    </SC.textOnBgColor>
                  </td>
                </Link>
              </div>
              {/* RSC */}
              <div className="teampage-award-container">
                <img src={rscTrophy} alt="" className="awards-trophy-img" />
                <SC.textOnBgColor>
                  <span className="stat-title">RS CHAMP</span>
                </SC.textOnBgColor>
                <Link to={`/teams/${rsc}`}>
                  <td className="award-team">
                    <Helmet
                      team={rsc}
                      size={"season-standings"}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                    <SC.textOnBgColor className="award-team-name">
                      {rsc}
                    </SC.textOnBgColor>
                  </td>
                </Link>
              </div>
              {/* MOST POINTS */}
              <div className="teampage-award-container">
                <img
                  src={mostPointsAward}
                  alt=""
                  className="awards-trophy-img"
                />
                <SC.textOnBgColor>
                  <span className="stat-title">MOST POINTS</span>
                </SC.textOnBgColor>
                <Link to={`/teams/${mostPoints}`}>
                  <td className="award-team">
                    <Helmet
                      team={mostPoints}
                      size={"season-standings"}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                    <SC.textOnBgColor className="award-team-name">
                      {mostPoints}
                    </SC.textOnBgColor>
                  </td>
                </Link>
              </div>
              {/* J DIVISION WINNER */}
              <div className="teampage-award-container">
                <img src={jdivBanner} alt="" className="awards-trophy-img" />
                <SC.textOnBgColor>
                  <span className="stat-title">DIVISION WINNER</span>
                </SC.textOnBgColor>
                <Link to={`/teams/${divisionWinnerJ}`}>
                  <td className="award-team">
                    <Helmet
                      team={divisionWinnerJ}
                      size={"season-standings"}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                    <SC.textOnBgColor className="award-team-name">
                      {divisionWinnerJ}
                    </SC.textOnBgColor>
                  </td>
                </Link>
              </div>
              {/* F DIVISION WINNER */}
              <div className="teampage-award-container end-col">
                <img src={fdivBanner} alt="" className="awards-trophy-img" />
                <SC.textOnBgColor>
                  <span className="stat-title">DIVISION WINNER</span>
                </SC.textOnBgColor>
                <Link to={`/teams/${divisionWinnerF}`}>
                  <td className="award-team">
                    <Helmet
                      team={divisionWinnerF}
                      size={"season-standings"}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                    <SC.textOnBgColor className="award-team-name">
                      {divisionWinnerF}
                    </SC.textOnBgColor>
                  </td>
                </Link>
              </div>
            </div>
          </div>

          {/* STATS TABLE */}
          <div className="season-table-section-container">
            {/* SECTION HEADER */}
            <div className="teampage-section-header-container">
              <SC.textOnBgColor>
                <div className="teampage-section-header">SEASON STATS</div>
              </SC.textOnBgColor>
            </div>
            {/* BUTTONS */}
            {tableLoaded && (
              <>
                <div className="season-buttons-container desktop">
                  <SC.primaryColorAnchorInverse
                    className={
                      schedule === "RS"
                        ? "season-button active"
                        : "season-button"
                    }
                    onClick={() => changeSchedule("RS")}
                  >
                    Regular Season
                  </SC.primaryColorAnchorInverse>
                  <SC.primaryColorAnchorInverse
                    className={
                      schedule === "playoffs"
                        ? "season-button active"
                        : "season-button"
                    }
                    onClick={() => changeSchedule("playoffs")}
                  >
                    Playoffs
                  </SC.primaryColorAnchorInverse>
                  <SC.primaryColorAnchorInverse
                    className={
                      schedule === "AG"
                        ? "season-button active"
                        : "season-button"
                    }
                    onClick={() => changeSchedule("AG")}
                  >
                    All Games
                  </SC.primaryColorAnchorInverse>
                </div>
                <div className="season-buttons-container mobile">
                  <SC.primaryColorAnchorInverse
                    className={
                      schedule === "RS"
                        ? "season-button active"
                        : "season-button"
                    }
                    onClick={() => changeSchedule("RS")}
                  >
                    Season
                  </SC.primaryColorAnchorInverse>
                  <SC.primaryColorAnchorInverse
                    className={
                      schedule === "playoffs"
                        ? "season-button active"
                        : "season-button"
                    }
                    onClick={() => changeSchedule("playoffs")}
                  >
                    Playoffs
                  </SC.primaryColorAnchorInverse>
                  <SC.primaryColorAnchorInverse
                    className={
                      schedule === "AG"
                        ? "season-button active"
                        : "season-button"
                    }
                    onClick={() => changeSchedule("AG")}
                  >
                    All
                  </SC.primaryColorAnchorInverse>
                </div>
              </>
            )}
            {tableLoaded ? (
              <SC.TableContainer className="season-table-container">
                <table>
                  {/* TABLE HEADER */}
                  <thead>
                    <SC.tableHeaderBgColor className="table-header">
                      <th>Team</th>
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
                      {yearInput > 2020 && schedule !== "playoffs" && (
                        <th>14</th>
                      )}
                      {schedule !== "RS" && <th>WC</th>}
                      {schedule !== "RS" && <th>SF</th>}
                      {schedule !== "RS" && <th>DC</th>}
                      <th></th>
                      {/* WINS */}
                      <SC.tableSortableColHeader
                        className={
                          sortBy === "W"
                            ? "column-header WL-header padding-left  "
                            : "column-header WL-header padding-left"
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
                          sortBy === "L" ? "column-header" : "column-header"
                        }
                        title="losses"
                        onClick={() => handleColumnSort("L")}
                      >
                        L
                      </SC.tableSortableColHeader>
                      {/* POINTS FOR / PPG */}
                      <SC.tableSortableColHeader
                        className={
                          sortBy === "PF" || sortBy === "PPG"
                            ? "column-header active"
                            : "column-header"
                        }
                        title={perStat ? "points per game" : "points for"}
                        onClick={() =>
                          perStat
                            ? handleColumnSort("PPG")
                            : handleColumnSort("PF")
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
                          perStat ? "points against per game" : "points against"
                        }
                        onClick={() =>
                          perStat
                            ? handleColumnSort("PAPG")
                            : handleColumnSort("PA")
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
                    </SC.tableHeaderBgColor>
                  </thead>
                  {/* BODY */}
                  <tbody>
                    {seasonTableInfo.map((team, i) => {
                      let PPG = (Math.round(team.ppg * 100) / 100).toFixed(1);
                      let PAPG = (Math.round(team.papg * 100) / 100).toFixed(1);
                      let totalDif = (
                        Math.round((team.pf - team.pa) * 100) / 100
                      ).toFixed(0);
                      let difFormat =
                        totalDif > 0
                          ? "green"
                          : totalDif < 0
                          ? "crimson"
                          : null;
                      let winPercentage = (
                        ((team.w / (team.w + team.l)) * 100) /
                        100
                      )
                        .toFixed(3)
                        .toString()
                        .substring(1);
                      let division = j_Division.includes(team.team)
                        ? "j_Division"
                        : "f_Division";
                      let weeks = [
                        {
                          pts: team.week1,
                          outcome: team.week1_outcome,
                          opp: team.week1_opp,
                          pa: team.week1_pa,
                        },
                        {
                          pts: team.week2,
                          outcome: team.week2_outcome,
                          opp: team.week2_opp,
                          pa: team.week2_pa,
                        },
                        {
                          pts: team.week3,
                          outcome: team.week3_outcome,
                          opp: team.week3_opp,
                          pa: team.week3_pa,
                        },
                        {
                          pts: team.week4,
                          outcome: team.week4_outcome,
                          opp: team.week4_opp,
                          pa: team.week4_pa,
                        },
                        {
                          pts: team.week5,
                          outcome: team.week5_outcome,
                          opp: team.week5_opp,
                          pa: team.week5_pa,
                        },
                        {
                          pts: team.week6,
                          outcome: team.week6_outcome,
                          opp: team.week6_opp,
                          pa: team.week6_pa,
                        },
                        {
                          pts: team.week7,
                          outcome: team.week7_outcome,
                          opp: team.week7_opp,
                          pa: team.week7_pa,
                        },
                        {
                          pts: team.week8,
                          outcome: team.week8_outcome,
                          opp: team.week8_opp,
                          pa: team.week8_pa,
                        },
                        {
                          pts: team.week9,
                          outcome: team.week9_outcome,
                          opp: team.week9_opp,
                          pa: team.week9_pa,
                        },
                        {
                          pts: team.week10,
                          outcome: team.week10_outcome,
                          opp: team.week10_opp,
                          pa: team.week10_pa,
                        },
                        {
                          pts: team.week11,
                          outcome: team.week11_outcome,
                          opp: team.week11_opp,
                          pa: team.week11_pa,
                        },
                        {
                          pts: team.week12,
                          outcome: team.week12_outcome,
                          opp: team.week12_opp,
                          pa: team.week12_pa,
                        },
                        {
                          pts: team.week13,
                          outcome: team.week13_outcome,
                          opp: team.week13_opp,
                          pa: team.week13_pa,
                        },
                      ];

                      if (team.week14 !== undefined) {
                        weeks.push({
                          pts: team.week14,
                          outcome: team.week14_outcome,
                          opp: team.week14_opp,
                          pa: team.week14_pa,
                        });
                      }

                      let playoffs = [
                        {
                          pts: team.weekWc,
                          outcome: team.weekWc_outcome,
                          opp: team.weekWc_opp,
                          pa: team.weekWc_pa,
                        },
                        {
                          pts: team.weekSf,
                          outcome: team.weekSf_outcome,
                          opp: team.weekSf_opp,
                          pa: team.weekSf_pa,
                        },
                        {
                          pts: team.weekDc,
                          outcome: team.weekDc_outcome,
                          opp: team.weekDc_opp,
                          pa: team.weekDc_pa,
                        },
                      ];

                      let espnId = espnIds[team.team];

                      return (
                        <SC.tableBorderColorTR
                          className={`allteams-team-row ${
                            user.username === team.team &&
                            user.highlightUser &&
                            "logged-in"
                          }`}
                          key={i}
                        >
                          {/* TEAM */}
                          <Link to={`/teams/${team.team}`}>
                            <td className="allteams-team">
                              <span className="standings-rank medal">
                                <div className={`medal-medium medal${i}`}>
                                  {i + 1}
                                </div>
                              </span>
                              <Helmet
                                team={team.team}
                                size={"season-standings"}
                                helmetStyle={helmetStyle}
                                helmetView={helmetView}
                              />
                              <SC.textOnBgColor className="standings-team-name">
                                {team.team}
                              </SC.textOnBgColor>
                              <div className={`standings-${division}`}></div>
                            </td>
                          </Link>
                          {/* LINK to ESPN */}
                          {user.username !== null && (
                            <td className="espn-link-col">
                              <a
                                href={`https://fantasy.espn.com/football/team?leagueId=648045&seasonId=${yearInput}&teamId=${espnId}&view=overview`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <SC.subtextOnBgColor className="link-icon-container">
                                  <InsertLinkIcon className="link-icon" />
                                </SC.subtextOnBgColor>
                              </a>
                            </td>
                          )}
                          {/* WEEKS */}
                          {schedule !== "playoffs" &&
                            weeks.map((week, i) => {
                              let minMax = handleCheckWeeklyMinMax(i, week.pts);
                              let outcome = parseInt(week.outcome) === 1 ? "win" : "loss";
                              return (
                                <SC.tableSortableCol
                                  className={`season-week-col ${
                                    schedule === "AG" &&
                                    i === 13 &&
                                    "schedule-border"
                                  }`}
                                >
                                  <SC.seasonsTableWeekCell
                                    className={`season-week-pts ${minMax} ${outcome}`}
                                    title={`vs ${week.opp} - ${week.pa}`}
                                  >
                                    <SC.textOnBgColor>
                                      {week.pts}
                                    </SC.textOnBgColor>
                                  </SC.seasonsTableWeekCell>
                                </SC.tableSortableCol>
                              );
                            })}
                          {/* PLAYOFFS */}
                          {schedule !== "RS" &&
                            playoffs.map((week, i) => {
                              let outcome =
                                parseInt(week.outcome) === 1
                                  ? "win"
                                  : parseInt(week.outcome) === 0
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
                          {/* BORDER */}
                          <td className="table-border-col"></td>
                          {/* WINS */}
                          <td className="standings-col record-col padding-left">
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
                          {/* POINTS FOR */}
                          <SC.tableSortableCol className="standings-col points-col">
                            <div className="standings-points">
                              <div className="standings-ppg">
                                <SC.textOnBgColor>
                                  {perStat ? PPG : team.pf.toLocaleString()}
                                </SC.textOnBgColor>
                                {/* <div className={`medal-small ${pfMedal}`}></div> */}
                              </div>
                              <div className="standings-total-points">
                                <SC.subtextOnBgColor>
                                  {perStat ? team.pf.toLocaleString() : PPG}
                                </SC.subtextOnBgColor>
                              </div>
                            </div>
                          </SC.tableSortableCol>
                          {/* POINTS AGAINST */}
                          <SC.tableSortableCol className="standings-col points-col">
                            <div className="standings-points ">
                              <div className="standings-ppg">
                                <SC.textOnBgColor>
                                  {perStat ? PAPG : team.pa.toLocaleString()}
                                </SC.textOnBgColor>
                                {/* <div className={`medal-small ${paMedal}`}></div> */}
                              </div>
                              <div className="standings-total-points">
                                <SC.subtextOnBgColor>
                                  {perStat ? team.pa.toLocaleString() : PAPG}
                                </SC.subtextOnBgColor>
                              </div>
                            </div>
                          </SC.tableSortableCol>
                          {/* PLUS MINUS */}
                          <SC.tableSortableCol className="standings-col points-col">
                            <div className="standings-points ">
                              <div
                                className="standings-ppg"
                                style={{ color: `${difFormat}` }}
                              >
                                {totalDif > 0 ? "+" : ""}
                                {perStat
                                  ? (
                                      Math.round(team.difpg * 100) / 100
                                    ).toFixed(1)
                                  : totalDif.toLocaleString()}
                                {/* <div className={`medal-small ${difMedal}`}></div> */}
                              </div>
                              <div className="standings-total-points">
                                <SC.subtextOnBgColor>
                                  {totalDif > 0 ? "+" : ""}
                                  {perStat
                                    ? totalDif.toLocaleString()
                                    : (
                                        Math.round(team.difpg * 100) / 100
                                      ).toFixed(1)}
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
              <Loader type={"half-screen"} />
            )}
          </div>
        </div>
      ) : (
        <Loader type={"full-screen"} />
      )}
    </div>
  );
}
