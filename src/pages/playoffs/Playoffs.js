/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../standings/Standings.scss";
import "./Playoffs.scss";
import Helmet from "../../components/helmet/Helmet";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import SC from "../../themes/styledComponents";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { url } from "../../helpers/apiCalls";

export default function Playoffs({
  setCurrentPage,
  pfMedals,
  paMedals,
  ppgMedals,
  papgMedals,
  difMedals,
  difpgMedals,
  standings,
  j_Division,
  f_Division,
  helmetStyle,
  helmetView,
}) {
  const [teams, setTeams] = useState([]);
  const [perStat, setPerStat] = useState(true);
  const [sortBy, setSortBy] = useState("W");
  const [sortOrder, setSortOrder] = useState("DESC");
  const user = useSelector((state) => state.user);

  const getTeams = async (column, order) => {
    await axios
      .get(`${url}/playoffs/standings/${column}/${order}`)
      .then((res) => {
        setTeams(res.data);
      });
  };

  const handleColumnSort = (col) => {
    if (col === sortBy) {
      if (sortOrder === "DESC") {
        setSortOrder("ASC");
        getTeams(col, "ASC");
      } else {
        setSortBy("");
        setSortOrder("DESC");
        getTeams("C", "DESC");
      }
    } else {
      setSortBy(col);
      setSortOrder("DESC");
      getTeams(col, "DESC");
    }
  };

  useEffect(() => {
    setCurrentPage("playoffs");
    setTimeout(() => {
      getTeams("C", "DESC");
    }, 500);
  }, []);

  return (
    <div className="standings-page">
      <SC.teampageHeader className="page-header">
        <div className="standings-header desktop">
          Post Season Standings
          <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
            {perStat ? "total" : "game"}
          </SC.primaryColorButton>
        </div>
        <div className="standings-header mobile">
          Playoffs
          <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
            {perStat ? "total" : "game"}
          </SC.primaryColorButton>
        </div>
      </SC.teampageHeader>
      <SC.TableContainer className="standing-container">
        {teams.length > 0 ? (
          <table>
            <thead>
              <SC.tableHeaderBgColor className="table-header">
                <th onClick={() => handleColumnSort("C")}>Team</th>
                <th
                  title="Wins"
                  className="WL-header"
                  onClick={() => handleColumnSort("W")}
                >
                  W
                </th>
                <th className="dash-header"></th>
                <th
                  title="Losses"
                  className="WL-header"
                  onClick={() => handleColumnSort("L")}
                >
                  L
                </th>
                <SC.tableSortableColHeader
                  className={
                    sortBy === "A"
                      ? "column-header app-header active"
                      : "column-header app-header "
                  }
                  onClick={() => handleColumnSort("A")}
                  title="Appearances"
                >
                  <div className="sort-icon">
                    {sortBy === "A" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  A
                </SC.tableSortableColHeader>
                <SC.tableSortableColHeader
                  className={
                    sortBy === "PF" || sortBy === "PPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  onClick={() =>
                    perStat ? handleColumnSort("PPG") : handleColumnSort("PF")
                  }
                  title={perStat ? "points per game" : "points for"}
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
                  onClick={() =>
                    perStat ? handleColumnSort("PAPG") : handleColumnSort("PA")
                  }
                  title={
                    perStat ? "opponents points per game" : "points against"
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
                <SC.tableSortableColHeader
                  className={
                    sortBy === "DIF" || sortBy === "DIFPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  onClick={() =>
                    perStat
                      ? handleColumnSort("DIFPG")
                      : handleColumnSort("DIF")
                  }
                  title={perStat ? "PPG - PAPG" : "PF - PA"}
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
                let PPG = (Math.round(team.PPG * 100) / 100).toFixed(1);
                let PAPG = (Math.round(team.PAPG * 100) / 100).toFixed(1);
                let totalDif = (
                  Math.round((team.PF - team.PA) * 100) / 100
                ).toFixed(0);
                let avgDif = (
                  Math.round((totalDif / (team.W + team.L)) * 100) / 100
                ).toFixed(1);
                let difFormat =
                  totalDif > 0 ? "green" : totalDif < 0 ? "crimson" : null;
                let titlesFormat = team.C > 0 ? "goldenrod" : "transparent";
                let runnerUpsFormat = team.R > 0 ? "#a0a3a6" : "transparent";
                let pfMedal =
                  pfMedals.indexOf(team.team) > -1
                    ? "medal" + pfMedals.indexOf(team.team)
                    : "nomedal";
                let paMedal =
                  paMedals.indexOf(team.team) > -1
                    ? "medal" + paMedals.indexOf(team.team)
                    : "nomedal";
                let ppgMedal =
                  ppgMedals.indexOf(team.team) > -1
                    ? "medal" + ppgMedals.indexOf(team.team)
                    : "nomedal";
                let papgMedal =
                  papgMedals.indexOf(team.team) > -1
                    ? "medal" + papgMedals.indexOf(team.team)
                    : "nomedal";
                let difMedal =
                  difMedals.indexOf(team.team) > -1
                    ? "medal" + difMedals.indexOf(team.team)
                    : "nomedal";
                let difpgMedal =
                  difpgMedals.indexOf(team.team) > -1
                    ? "medal" + difpgMedals.indexOf(team.team)
                    : "nomedal";
                let rank = standings.indexOf(team.team) + 1;
                let division = j_Division.includes(team.team)
                  ? "j_Division"
                  : "f_Division";
                let gp = team.W + team.L;
                let winPercentage = (((team.W / (team.W + team.L)) * 100) / 100)
                  .toFixed(3)
                  .toString()
                  .substring(1);

                return (
                  <SC.tableBorderColorTR
                    className={`standings-team-row ${
                      user.username === team.team &&
                      user.highlightUser &&
                      "logged-in"
                    }`}
                    key={i}
                  >
                    <Link to={`/teams/${team.team}`}>
                      <td className="standings-team">
                        <span className="standings-rank medal">
                          <div className={`medal-medium medal${rank - 1}`}>
                            {rank}
                          </div>
                        </span>
                        <Helmet
                          team={team.team}
                          size={"playoffs"}
                          helmetStyle={helmetStyle}
                          helmetView={helmetView}
                        />
                        <div className="team-name-with-subtext">
                          <SC.textOnBgColor className="standings-team-name">
                            {team.team}
                          </SC.textOnBgColor>
                          <SC.subtextOnBgColor className="standings-team-subtext">
                            {gp} games, {winPercentage} win%
                          </SC.subtextOnBgColor>
                        </div>
                        <div className={`standings-${division}`}></div>
                      </td>
                    </Link>
                    <td className="standings-col record-col">
                      <SC.textOnBgColor>{team.W}</SC.textOnBgColor>
                    </td>
                    <td className="standings-col record-col dash-col">
                      {" "}
                      <SC.textOnBgColor> - </SC.textOnBgColor>{" "}
                    </td>
                    <td className="standings-col record-col">
                      <SC.textOnBgColor>{team.L}</SC.textOnBgColor>
                    </td>
                    <SC.tableBorderColorTD className="standings-col gb-col">
                      <SC.subtextOnBgColor>{team.A}</SC.subtextOnBgColor>
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
                            {perStat ? PPG : team.PF.toLocaleString()}
                          </SC.textOnBgColor>
                          {perStat ? (
                            <div className={`medal-small ${ppgMedal}`}></div>
                          ) : (
                            <div className={`medal-small ${pfMedal}`}></div>
                          )}
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? team.PF.toLocaleString() : PPG}
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
                            {perStat ? PAPG : team.PA.toLocaleString()}
                          </SC.textOnBgColor>
                          {perStat ? (
                            <div className={`medal-small ${papgMedal}`}></div>
                          ) : (
                            <div className={`medal-small ${paMedal}`}></div>
                          )}
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? team.PA.toLocaleString() : PAPG}
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
                          {perStat ? avgDif : totalDif.toLocaleString()}
                          <div className={`medal-small ${difMedal}`}></div>
                          {perStat ? (
                            <div className={`medal-small ${difpgMedal}`}></div>
                          ) : (
                            <div className={`medal-small ${difMedal}`}></div>
                          )}
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {totalDif > 0 ? "+" : ""}
                            {perStat ? totalDif.toLocaleString() : avgDif}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* TITLES */}
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
                          <strong>{team.C}</strong>
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
                          <strong>{team.R}</strong>
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
    </div>
  );
}
