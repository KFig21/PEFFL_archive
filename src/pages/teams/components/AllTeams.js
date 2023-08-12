/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SC from "../../../themes/styledComponents";
import Loader from "../../../components/loader/Loader";
import Helmet from "../../../components/helmet/Helmet";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import "./AllTeams.scss";
import { useSelector } from "react-redux";
import { getAllTeamsMedals, getTeams } from "../../../helpers/apiCalls";
import { espnIds } from "../../../helpers/hardStats";

export default function AllTeams({ j_Division, helmetStyle, helmetView }) {
  const [teams, setTeams] = useState([]);
  const [perStat, setPerStat] = useState(true);
  const [sortBy, setSortBy] = useState("PPG");
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

  const fetchTeams = async (column, order, table) => {
    setTeams(await getTeams(column, order, table));
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
        fetchTeams(col, "ASC", schedule);
      } else {
        setSortBy("");
        setSortOrder("DESC");
        fetchTeams("PPG", "DESC", schedule);
      }
    } else {
      setSortBy(col);
      setSortOrder("DESC");
      fetchTeams(col, "DESC", schedule);
    }
  };

  const changeSchedule = (table) => {
    fetchMedals(table);
    setSchedule(table);
    setSortBy("PPG");
    fetchTeams("PPG", "DESC", table);
  };

  useEffect(() => {
    fetchMedals("RS");
    setTimeout(() => {
      fetchTeams("PPG", "DESC", "RS");
    }, 500);
  }, []);

  return (
    <div className="allteams-container">
      <SC.teampageHeader className="page-header">
        <div className="teampage-section-header">
          All Teams
          <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
            {perStat ? "total" : "game"}
          </SC.primaryColorButton>
        </div>
      </SC.teampageHeader>
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
      {teams.length > 0 ? (
        <SC.TableContainer className="allteams-standings-container">
          <table>
            {/* TABLE HEADERS */}
            <thead>
              <SC.tableHeaderBgColor className="table-header">
                <th onClick={() => handleColumnSort("year")}>Year</th>
                <th onClick={() => handleColumnSort("team")}>Team</th>
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
                {/* Link COL */}
                {user.username !== null && <th></th>}
                {/* BORDER COL */}
                <th></th>
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
                {/* TOTAL */}
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
                  {perStat ? "TOTPG" : "Total"}
                </SC.tableSortableColHeader>
              </SC.tableHeaderBgColor>
            </thead>
            {/* TABLE CONTENT */}
            <tbody>
              {teams.map((team, i) => {
                let PPG = (Math.round(team.ppg * 100) / 100).toFixed(1);
                let PAPG = (Math.round(team.papg * 100) / 100).toFixed(1);
                let DIFPG = (Math.round(team.difpg * 100) / 100).toFixed(1);
                let TOTPG = (Math.round(team.totpg * 100) / 100).toFixed(1);
                let totalDif = (
                  Math.round((team.pf - team.pa) * 100) / 100
                ).toFixed(0);
                let difFormat =
                  totalDif > 0 ? "green" : totalDif < 0 ? "crimson" : null;
                let winPercentage = (((team.w / (team.w + team.l)) * 100) / 100)
                  .toFixed(3)
                  .toString()
                  .substring(1);
                // MEDALS
                let pfMedal =
                  allTeamsPFmedals.indexOf(team.pf) > -1
                    ? "medal" + allTeamsPFmedals.indexOf(team.pf)
                    : "nomedal";
                let paMedal =
                  allTeamsPAmedals.indexOf(team.pa) > -1
                    ? "medal" + allTeamsPAmedals.indexOf(team.pa)
                    : "nomedal";
                let difMedal =
                  allTeamsDIFmedals.indexOf(team.dif) > -1
                    ? "medal" + allTeamsDIFmedals.indexOf(team.dif)
                    : "nomedal";
                let totMedal =
                  allTeamsTOTmedals.indexOf(team.tot) > -1
                    ? "medal" + allTeamsTOTmedals.indexOf(team.tot)
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

                let division = j_Division.includes(team.team)
                  ? "j_Division"
                  : "f_Division";

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
                    {/* YEARS */}
                    <td className="standings-col year-col">
                      <SC.textOnBgColor>{team.year}</SC.textOnBgColor>
                    </td>
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
                          size={"standings"}
                          helmetStyle={helmetStyle}
                          helmetView={helmetView}
                        />
                        <div className="team-name-with-subtext">
                          <SC.textOnBgColor className="standings-team-name">
                            {team.team}
                          </SC.textOnBgColor>
                          <SC.subtextOnBgColor className="standings-team-subtext">
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
                    {/* LINK to ESPN */}
                    {user.username !== null && (
                      <td className="standings-col espn-link-col">
                        <a
                          href={`https://fantasy.espn.com/football/team?leagueId=648045&seasonId=${team.year}&teamId=${espnId}&view=overview`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SC.subtextOnBgColor className="link-icon-container">
                            <InsertLinkIcon className="link-icon" />
                          </SC.subtextOnBgColor>
                        </a>
                      </td>
                    )}
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
                            {perStat ? PPG : team.pf.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? ppgMedal : pfMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? team.pf.toLocaleString() : PPG}
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
                            {perStat ? PAPG : team.pa.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? papgMedal : paMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? team.pa.toLocaleString() : PAPG}
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
                          {totalDif > 0 ? "+" : ""}
                          {perStat ? DIFPG : totalDif.toLocaleString()}
                          <div
                            className={`medal-small ${
                              perStat ? difpgMedal : difMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {totalDif > 0 ? "+" : ""}
                            {perStat ? totalDif.toLocaleString() : DIFPG}
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
