/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import axios from "axios";
import SC from "../../../themes/styledComponents";
import Loader from "../../../components/loader/Loader";
import { Link } from "react-router-dom";
import "../Records.scss";
import Helmet from "../../../components/helmet/Helmet";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { useSelector } from "react-redux";
import { getWeeklyRecords } from "../../../helpers/apiCalls";

export default function WeeklyRecords({
  j_Division,
  weeksMostPFmedals,
  weeksMostPAmedals,
  weeksLeastPFmedals,
  weeksLeastPAmedals,
  helmetStyle,
  helmetView,
}) {
  const [teams, setTeams] = useState([]);
  const [sortBy, setSortBy] = useState("W");
  const [sortOrder, setSortOrder] = useState("DESC");
  const user = useSelector((state) => state.user);

  const getTeams = async (col, order) => {
    setTeams(await getWeeklyRecords(col, order));
  };

  const handleColumnSort = (col) => {
    if (col === sortBy) {
      if (sortOrder === "DESC") {
        setSortOrder("ASC");
        getTeams(col, "ASC");
      } else {
        setSortBy("");
        setSortOrder("DESC");
        getTeams("PF", "DESC");
      }
    } else {
      setSortBy(col);
      setSortOrder("DESC");
      getTeams(col, "DESC");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getTeams("PF", "DESC");
    }, 500);
  }, []);

  return (
    <div className="record-table" id="weekly-records">
      <div className="table-name">
        <SC.textOnBgColor>Weekly Records</SC.textOnBgColor>
      </div>
      <SC.TableContainer className="standing-container">
        {teams.length > 0 ? (
          <table>
            <thead>
              <SC.tableHeaderBgColor className="table-header">
                <th>Rank</th>
                <th>Team</th>
                <SC.tableSortableColHeader
                  className={
                    sortBy === "PF" ? "column-header active" : "column-header"
                  }
                  title="Weeks with most Points For"
                  onClick={() => handleColumnSort("PF")}
                >
                  <div className="sort-icon">
                    {sortBy === "PF" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  Most PF
                </SC.tableSortableColHeader>
                <SC.tableSortableColHeader
                  className={
                    sortBy === "PA" ? "column-header active" : "column-header"
                  }
                  title="Weeks with most Points Against"
                  onClick={() => handleColumnSort("PA")}
                >
                  <div className="sort-icon">
                    {sortBy === "PA" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  Most PA
                </SC.tableSortableColHeader>
                <SC.tableSortableColHeader
                  className={
                    sortBy === "LeastPF"
                      ? "column-header active"
                      : "column-header"
                  }
                  title="Weeks with least Points For"
                  onClick={() => handleColumnSort("LeastPF")}
                >
                  <div className="sort-icon">
                    {sortBy === "LeastPF" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  Least PF
                </SC.tableSortableColHeader>
                <SC.tableSortableColHeader
                  className={
                    sortBy === "LeastPA"
                      ? "column-header active"
                      : "column-header"
                  }
                  title="Weeks with least Points Against"
                  onClick={() => handleColumnSort("LeastPA")}
                >
                  <div className="sort-icon">
                    {sortBy === "LeastPA" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  Least PA
                </SC.tableSortableColHeader>
                <th></th>
              </SC.tableHeaderBgColor>
            </thead>
            <tbody>
              {teams.map((team, i) => {
                let rank = i + 1;

                let division = j_Division.includes(team.team)
                  ? "j_Division"
                  : "f_Division";

                let pfMedal =
                  weeksMostPFmedals.indexOf(team.PF) > -1
                    ? "medal" + weeksMostPFmedals.indexOf(team.PF)
                    : "nomedal";
                let paMedal =
                  weeksMostPAmedals.indexOf(team.PA) > -1
                    ? "medal" + weeksMostPAmedals.indexOf(team.PA)
                    : "nomedal";
                let lpfMedal =
                  weeksLeastPFmedals.indexOf(team.LeastPF) > -1
                    ? "medal" + weeksLeastPFmedals.indexOf(team.LeastPF)
                    : "nomedal";
                let lpaMedal =
                  weeksLeastPAmedals.indexOf(team.LeastPA) > -1
                    ? "medal" + weeksLeastPAmedals.indexOf(team.LeastPA)
                    : "nomedal";

                if (team.team === "Taylor") lpfMedal = "nomedal";

                return (
                  <SC.tableBorderColorTR
                    className={`records-team-row ${
                      user.username === team.team &&
                      user.highlightUser &&
                      "logged-in"
                    }`}
                    key={i}
                  >
                    {/* RANK */}
                    <td className="rank-col">
                      <span className="standings-rank medal">
                        <div className={`medal-medium medal${rank - 1}`}>
                          {rank}
                        </div>
                      </span>
                    </td>
                    {/* TEAM */}
                    <td className="records-team weekly-rec-table">
                      <Link to={`/teams/${team.team}`}>
                        <Helmet
                          team={team.team}
                          size={"standings"}
                          helmetStyle={helmetStyle}
                          helmetView={helmetView}
                        />
                        <SC.textOnBgColor className="records-team-name">
                          {team.team}
                        </SC.textOnBgColor>
                        <div className={`records-${division}`}></div>
                      </Link>
                    </td>
                    {/* Most PF */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "PF"
                          ? "standings-col points-col weekly-awards active"
                          : "standings-col points-col weekly-awards"
                      }
                    >
                      <td className="weekly-record-col weekly-awards">
                        <div className="weekly-record-col-val">
                          <SC.textOnBgColor>{team.PF}</SC.textOnBgColor>
                          <div className={`medal-small ${pfMedal}`}></div>
                        </div>
                      </td>
                    </SC.tableSortableCol>
                    {/* vs Most PA */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "PA"
                          ? "standings-col points-col weekly-awards active"
                          : "standings-col points-col weekly-awards"
                      }
                    >
                      <td className="weekly-record-col weekly-awards">
                        <div className="weekly-record-col-val">
                          <SC.textOnBgColor>{team.PA}</SC.textOnBgColor>
                          <div className={`medal-small ${paMedal}`}></div>
                        </div>
                      </td>
                    </SC.tableSortableCol>
                    {/* Least PF */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "LeastPF"
                          ? "standings-col points-col weekly-awards active"
                          : "standings-col points-col weekly-awards"
                      }
                    >
                      <td className="weekly-record-col weekly-awards">
                        <div className="weekly-record-col-val">
                          {team.team === "AJ" || team.team === "Taylor" ? (
                            <SC.subtextOnBgColor>
                              {team.LeastPF}
                            </SC.subtextOnBgColor>
                          ) : (
                            <SC.textOnBgColor>{team.LeastPF}</SC.textOnBgColor>
                          )}{" "}
                          <div className={`medal-small ${lpfMedal}`}></div>
                        </div>
                      </td>
                    </SC.tableSortableCol>
                    {/* Vs Least PA */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "LeastPA"
                          ? "standings-col points-col weekly-awards active"
                          : "standings-col points-col weekly-awards"
                      }
                    >
                      <td className="weekly-record-col weekly-awards">
                        <div className="weekly-record-col-val">
                          {team.team === "AJ" || team.team === "Taylor" ? (
                            <SC.subtextOnBgColor>
                              {team.LeastPA}
                            </SC.subtextOnBgColor>
                          ) : (
                            <SC.textOnBgColor>{team.LeastPA}</SC.textOnBgColor>
                          )}
                          <div className={`medal-small ${lpaMedal}`}></div>
                        </div>
                      </td>
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
