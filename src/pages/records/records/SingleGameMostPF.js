/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import axios from "axios";
import SC from "../../../themes/styledComponents";
import Loader from "../../../components/loader/Loader";
import { Link } from "react-router-dom";
import "../Records.scss";
import Helmet from "../../../components/helmet/Helmet";
import { useSelector } from "react-redux";
import { getSingleGameMostPF } from "../../../helpers/apiCalls";

export default function SingleGameMostPF({
  j_Division,
  helmetStyle,
  helmetView,
}) {
  const [games, setGames] = useState([]);
  const user = useSelector((state) => state.user);

  const getGames = async () => {
    setGames(await getSingleGameMostPF());
  };

  useEffect(() => {
    setTimeout(() => {
      getGames();
    }, 500);
  }, []);

  return (
    <div className="record-table" id="single-game-most-pf">
      <div className="table-name first">
        <SC.textOnBgColor>Single Game Most PF</SC.textOnBgColor>
      </div>
      <SC.TableContainer className="standing-container">
        {games.length > 0 ? (
          <table>
            <thead>
              <SC.tableHeaderBgColor className="table-header">
                <th>🏅</th>
                <th>Year</th>
                <th>Winner</th>
                <th>PF</th>
                <th></th>
                <th>PA</th>
                <th>Loser</th>
              </SC.tableHeaderBgColor>
            </thead>
            <tbody>
              {games.map((game, i) => {
                let rank = i + 1;

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
                    : ` week ${game.week}`;

                return (
                  <SC.tableBorderColorTR
                    className={`records-team-row ${
                      user.username === game.team &&
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
                    <td
                      className={`standings-col record-date-col ${game.week}-background`}
                    >
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
                    </td>
                    {/* TEAM */}
                    <td className="records-team-away">
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
                        <strong>{game.pf}</strong>
                      </SC.textOnBgColor>
                    </td>
                    {/* - */}
                    <td className="dash-col">
                      <SC.textOnBgColor>-</SC.textOnBgColor>
                    </td>
                    {/* PA */}
                    <td className="record-col">
                      <SC.textOnBgColor>{game.pa}</SC.textOnBgColor>
                    </td>
                    {/* OPPONENT */}
                    <td className="records-team-home">
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
      </SC.TableContainer>
    </div>
  );
}
