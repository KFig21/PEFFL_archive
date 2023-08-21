/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Awards.scss";
import "../standings/Standings.scss";
import Helmet from "../../components/helmet/Helmet";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import SC from "../../themes/styledComponents";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAwardsTable } from "../../helpers/apiCalls";
import { numberWithCommas } from "../../helpers/utils";

export default function Awards({
  setCurrentPage,
  j_Division,
  awardsRank,
  helmetStyle,
  helmetView,
}) {
  const [teams, setTeams] = useState([]);
  const [sortBy, setSortBy] = useState("W");
  const [sortOrder, setSortOrder] = useState("DESC");
  const user = useSelector((state) => state.user);

  const getTeams = async (column, order) => {
    setTeams(await getAwardsTable(column, order));
  };

  const handleColumnSort = (col) => {
    if (col === sortBy) {
      if (sortOrder === "DESC") {
        setSortOrder("ASC");
        getTeams(col, "ASC");
      } else {
        setSortBy("");
        setSortOrder("DESC");
        getTeams("money", "DESC");
      }
    } else {
      setSortBy(col);
      setSortOrder("DESC");
      getTeams(col, "DESC");
    }
  };

  useEffect(() => {
    setCurrentPage("awards");
    setTimeout(() => {
      getTeams("money", "DESC");
    }, 500);
  }, []);

  return (
    <div style={{maxHeight: "inherit", overflowY: "hidden"}}>
      <SC.teampageHeader className="page-header">
        <div className="standings-header">Awards</div>
      </SC.teampageHeader>
      <SC.PageWrapper className="standings-page">
        <SC.TableContainer className="standing-container">
          {teams.length > 0 ? (
            <table>
              <thead>
                <SC.tableHeaderBgColor className="table-header">
                  <th onClick={() => handleColumnSort("money")}>Team</th>
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
                  <SC.tableSortableColHeader
                    className={
                      sortBy === "RSC"
                        ? "column-header trophy-header active"
                        : "column-header"
                    }
                    onClick={() => handleColumnSort("RSC")}
                    title="Regular Season Champion"
                  >
                    <div className="sort-icon">
                      {sortBy === "RSC" ? (
                        sortOrder === "DESC" ? (
                          <ArrowDropDownRoundedIcon />
                        ) : (
                          <ArrowDropUpRoundedIcon />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    RSC
                  </SC.tableSortableColHeader>
                  <SC.tableSortableColHeader
                    className={
                      sortBy === "P"
                        ? "column-header trophy-header active"
                        : "column-header"
                    }
                    onClick={() => handleColumnSort("P")}
                    title="Points Leader"
                  >
                    <div className="sort-icon">
                      {sortBy === "P" ? (
                        sortOrder === "DESC" ? (
                          <ArrowDropDownRoundedIcon />
                        ) : (
                          <ArrowDropUpRoundedIcon />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    Pts
                  </SC.tableSortableColHeader>
                  <SC.tableSortableColHeader
                    className={
                      sortBy === "DT"
                        ? "column-header trophy-header active"
                        : "column-header"
                    }
                    onClick={() => handleColumnSort("DT")}
                    title="Division titles"
                  >
                    <div className="sort-icon">
                      {sortBy === "DT" ? (
                        sortOrder === "DESC" ? (
                          <ArrowDropDownRoundedIcon />
                        ) : (
                          <ArrowDropUpRoundedIcon />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    Divs
                  </SC.tableSortableColHeader>
                  <SC.tableSortableColHeader
                    className={
                      sortBy === "money"
                        ? "column-header trophy-header active"
                        : "column-header"
                    }
                    onClick={() => handleColumnSort("money")}
                    title="Money Won"
                  >
                    <div className="sort-icon">
                      {sortBy === "money" ? (
                        sortOrder === "DESC" ? (
                          <ArrowDropDownRoundedIcon />
                        ) : (
                          <ArrowDropUpRoundedIcon />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    💰
                  </SC.tableSortableColHeader>
                </SC.tableHeaderBgColor>
              </thead>
              <tbody>
                {teams.map((team, i) => {
                  let rank = awardsRank.indexOf(team.team) + 1;
                  let division = j_Division.includes(team.team)
                    ? "j_Division"
                    : "f_Division";
                  let awards = team.c + team.r + team.rsc + team.p + team.dt;
                  let money = team.money.toLocaleString();
                  let titlesFormat = team.c > 0 ? "goldenrod" : "transparent";
                  let runnerUpsFormat = team.r > 0 ? "#a0a3a6" : "transparent";
                  let RSC = team.rsc > 0 ? team.rsc : "";
                  let PTS = team.p > 0 ? team.p : "";
                  let DT = team.dt > 0 ? team.dt : "";
                  let moneyFormat = team.money > 0 ? "rgb(29, 147, 76)" : "grey";
                  let dtFormat =
                    DT > 0
                      ? division === "j_Division"
                        ? "rgb(0, 85, 255)"
                        : "rgb(255, 47, 89)"
                      : "transparent";

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
                            size="standings"
                            helmetStyle={helmetStyle}
                            helmetView={helmetView}
                          />
                          <div className="team-name-with-subtext">
                            <SC.textOnBgColor className="standings-team-name">
                              {team.team}
                            </SC.textOnBgColor>
                            <SC.subtextOnBgColor className="standings-team-subtext">
                              {awards} awards
                            </SC.subtextOnBgColor>
                          </div>
                          <div className={`standings-${division}`}></div>
                        </td>
                      </Link>

                      {/* DENR CUPS*/}
                      <SC.tableSortableCol
                        className={
                          sortBy === "C"
                            ? "standings-col awards-col active"
                            : "standings-col awards-col"
                        }
                        style={{ color: `${titlesFormat}` }}
                      >
                        {team.c}
                      </SC.tableSortableCol>
                      {/* RUNNER UPS */}
                      <SC.tableSortableCol
                        className={
                          sortBy === "R"
                            ? "standings-col awards-col active"
                            : "standings-col awards-col"
                        }
                        style={{ color: `${runnerUpsFormat}` }}
                      >
                        {team.r}
                      </SC.tableSortableCol>
                      {/* REGULAR SEASON CHAMPIONSHIPS */}
                      <SC.tableSortableCol
                        className={
                          sortBy === "RSC"
                            ? "standings-col awards-col active"
                            : "standings-col awards-col"
                        }
                      >
                        <SC.textOnBgColor>{RSC}</SC.textOnBgColor>
                      </SC.tableSortableCol>
                      {/* MOST POINTS */}
                      <SC.tableSortableCol
                        className={
                          sortBy === "P"
                            ? "standings-col awards-col active"
                            : "standings-col awards-col"
                        }
                      >
                        <SC.textOnBgColor>{PTS}</SC.textOnBgColor>
                      </SC.tableSortableCol>
                      {/* DIVISION CHAMPIONSHIPS */}
                      <SC.tableSortableCol
                        className={
                          sortBy === "DT"
                            ? "standings-col awards-col active"
                            : "standings-col awards-col"
                        }
                        style={{ color: `${dtFormat}` }}
                      >
                        {DT}
                      </SC.tableSortableCol>
                      {/* MONEY WON */}
                      <SC.tableSortableCol
                        className={
                          sortBy === "money"
                            ? "standings-col points-col active"
                            : "standings-col points-col"
                        }
                        style={{ color: `${moneyFormat}` }}
                      >
                        ${numberWithCommas(money)}
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
