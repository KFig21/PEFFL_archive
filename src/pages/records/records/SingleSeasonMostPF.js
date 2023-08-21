/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import axios from "axios";
import SC from "../../../themes/styledComponents";
import Loader from "../../../components/loader/Loader";
import { Link } from "react-router-dom";
import "../Records.scss";
import Helmet from "../../../components/helmet/Helmet";
import { useSelector } from "react-redux";
import { getSingleSeasonMostPF } from "../../../helpers/apiCalls";
import { numberWithCommas } from "../../../helpers/utils";

export default function SingleSeasonMostPF({
  j_Division,
  helmetStyle,
  helmetView,
}) {
  const [teams, setTeams] = useState([]);
  const user = useSelector((state) => state.user);

  const getTeams = async () => {
    setTeams(await getSingleSeasonMostPF());
  };

  useEffect(() => {
    setTimeout(() => {
      getTeams();
    }, 500);
  }, []);

  return (
    <div className="record-table" id="single-season-most-pf">
      <div className="table-name">
        <SC.textOnBgColor>Single Season Most PF</SC.textOnBgColor>
      </div>
      <SC.TableContainer className="standing-container">
        {teams.length > 0 ? (
          <table>
            <thead>
              <SC.tableHeaderBgColor className="table-header">
                <th>🏅</th>
                <th>Year</th>
                <th>Team</th>
                <th>PPG</th>
                <th>PF</th>
                <th>W</th>
                <th></th>
                <th>L</th>
                <th></th>
              </SC.tableHeaderBgColor>
            </thead>
            <tbody>
              {teams.map((team, i) => {
                let rank = i + 1;
                let PPG = (Math.round(team.ppg * 100) / 100).toFixed(1);
                let division = j_Division.includes(team.team)
                  ? "j_Division"
                  : "f_Division";

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
                    {/* YEAR */}
                    <td className="standings-col record-date-col">
                      <div className="date-container">
                        <SC.textOnBgColor className="record-year">
                          {team.year}
                        </SC.textOnBgColor>
                      </div>
                    </td>
                    {/* TEAM */}
                    <td className="records-team">
                      <Link to={`/teams/${team.team}`}>
                        <Helmet
                          team={team.team}
                          size={"records"}
                          helmetStyle={helmetStyle}
                          helmetView={helmetView}
                        />
                        <SC.textOnBgColor className="records-team-name">
                          {team.team}
                        </SC.textOnBgColor>

                        <div className={`records-${division}`}></div>
                      </Link>
                    </td>
                    {/* PPG */}
                    <td className="total-col">
                      <SC.textOnBgColor>
                        <strong>{PPG}</strong>
                      </SC.textOnBgColor>
                    </td>
                    {/* PF */}
                    <td className="points-col">
                      <SC.textOnBgColor>{numberWithCommas(team.pf)}</SC.textOnBgColor>
                    </td>
                    <td className="record-col wl-col">
                      <SC.textOnBgColor>{team.w}</SC.textOnBgColor>
                    </td>
                    <td className="record-col dash-col">
                      <SC.textOnBgColor>-</SC.textOnBgColor>
                    </td>
                    <td className="record-col">
                      <SC.textOnBgColor>{team.l}</SC.textOnBgColor>
                    </td>
                    <td className="padding-col"></td>
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
