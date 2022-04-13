/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "../../../components/helmet/Helmet";
import Loader from "../../../components/loader/Loader";
import SC from "../../../themes/styledComponents";
import "../H2H.scss";

export default function Matchups({
  matchups,
  j_Division,
  schedule,
  loaded,
  helmetStyle,
  helmetView,
}) {
  return (
    <div className="h2h-matchups-container">
      <div className="h2h-section-header-container">
        <SC.textOnBgColor>
          <div className="h2h-section-header">
            Matchups
            <div className="h2h-section-subheader">
              <SC.subtextOnBgColor>{matchups.length} games</SC.subtextOnBgColor>
            </div>
          </div>
        </SC.textOnBgColor>
      </div>
      <div className="standing-container">
        {matchups.length > 0 ? (
          <>
            {loaded ? (
              <table>
                <thead>
                  <SC.tableHeaderBgColor className="table-header">
                    <th>G</th>
                    <th>Year</th>
                    <th>Team</th>
                    <th>PF</th>
                    <th></th>
                    <th>PA</th>
                    <th>Opp</th>
                  </SC.tableHeaderBgColor>
                </thead>
                <tbody>
                  {matchups.map((game, i) => {
                    let winnerDivision = j_Division.includes(game.team)
                      ? "j_Division"
                      : "f_Division";
                    let loserDivision = j_Division.includes(game.opp)
                      ? "j_Division"
                      : "f_Division";
                    let week =
                      game.week === "DC"
                        ? "DenR Cup"
                        : game.week === "SF"
                        ? "Semis"
                        : game.week === "WC"
                        ? "Wild Card"
                        : `week ${game.week}`;

                    return (
                      <SC.tableBorderColorTR
                        className="h2h-matchups-team-row"
                        key={i}
                      >
                        {/* RANK */}
                        <td className="rank-col">
                          <span className="standings-rank medal">
                            {matchups.length - i}
                          </span>
                        </td>
                        {/* YEAR */}
                        <td
                          className={`standings-col record-date-col ${game.week}-background`}
                        >
                          <Link to={`/seasons/${game.year}`}>
                            <div className="date-container">
                              <SC.textOnBgColor className="record-year">
                                <span className={`${game.week}-text`}>
                                  {game.year}
                                </span>
                              </SC.textOnBgColor>
                              <SC.subtextOnBgColor className="record-week">
                                <span className={`${game.week}-text subtext`}>
                                  {week}
                                </span>
                              </SC.subtextOnBgColor>
                            </div>
                          </Link>
                        </td>
                        {/* TEAM */}
                        <td
                          className="records-team-away"
                          style={
                            game.pf > game.pa
                              ? { opacity: 1 }
                              : { opacity: 0.35 }
                          }
                        >
                          <Link to={`/teams/${game.team}`}>
                            <div className={`records-${winnerDivision}`}></div>
                            <SC.textOnBgColor className="records-team-name">
                              {game.team}
                            </SC.textOnBgColor>
                            <div className="active-helmet">
                              <Helmet
                                team={game.team}
                                size={"records"}
                                helmetStyle={helmetStyle}
                                helmetView={helmetView}
                              />
                            </div>
                          </Link>
                        </td>
                        {/* PF */}
                        <td className="record-col">
                          <SC.textOnBgColor>
                            {game.pf > game.pa ? (
                              <strong>{game.pf}</strong>
                            ) : (
                              <>{game.pf}</>
                            )}
                          </SC.textOnBgColor>
                        </td>
                        {/* - */}
                        <td className="dash-col">
                          <SC.textOnBgColor>-</SC.textOnBgColor>
                        </td>
                        {/* PA */}
                        <td className="record-col">
                          <SC.textOnBgColor>
                            {game.pa > game.pf ? (
                              <strong>{game.pa}</strong>
                            ) : (
                              <>{game.pa}</>
                            )}
                          </SC.textOnBgColor>
                        </td>
                        {/* OPPONENT */}
                        <td
                          className="records-team-home"
                          style={
                            game.pa > game.pf
                              ? { opacity: 1 }
                              : { opacity: 0.35 }
                          }
                        >
                          <Link to={`/teams/${game.opp}`}>
                            <div className="mirror-helmet">
                              <Helmet
                                team={game.opp}
                                size={"records"}
                                helmetStyle={helmetStyle}
                                helmetView={helmetView}
                              />
                            </div>
                            <SC.textOnBgColor className="records-team-name">
                              {game.opp}
                            </SC.textOnBgColor>
                            <div className={`records-${loserDivision}`}></div>
                          </Link>
                        </td>
                      </SC.tableBorderColorTR>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <Loader type={"full-screen"} />
            )}
          </>
        ) : (
          <SC.subtextOnBgColor>
            <h3>No matchups for {schedule}</h3>
          </SC.subtextOnBgColor>
        )}
      </div>
    </div>
  );
}
