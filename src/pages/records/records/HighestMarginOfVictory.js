/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import axios from "axios";
import SC from "../../../themes/styledComponents";
import Loader from "../../../components/loader/Loader";
import { Link } from "react-router-dom";
import "../Records.scss";
import Helmet from "../../../components/helmet/Helmet";
import { useSelector } from "react-redux";
import { getHighestMarginOfVictory } from "../../../helpers/apiCalls";

export default function HighestMarginOfVictory({
  j_Division,
  helmetStyle,
  helmetView,
}) {
  const [games, setGames] = useState([]);
  const user = useSelector((state) => state.user);

  const getGames = async () => {
    setGames(await getHighestMarginOfVictory());
  };

  useEffect(() => {
    setTimeout(() => {
      getGames();
    }, 500);
  }, []);

  return (
    <div className="record-table" id="highest-margin-of-victory">
      <div className="table-name">
        <SC.textOnBgColor>Highest Margin of Victory</SC.textOnBgColor>
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
                <th>Margin</th>
                <th></th>
              </SC.tableHeaderBgColor>
            </thead>
            <tbody>
              {games.map((game, i) => {
                let rank = i + 1;
                let winnerPF = Math.max(parseInt(game.pf), parseInt(game.pa));
                let loserPF = Math.min(parseInt(game.pf), parseInt(game.pa));
                let winner = winnerPF === parseInt(game.pf) ? game.team : game.opp;
                let loser = loserPF === parseInt(game.pf) ? game.team : game.opp;

                let winnerDivision = j_Division.includes(winner)
                  ? "j_Division"
                  : "f_Division";
                let loserDivision = j_Division.includes(loser)
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
                    className={`records-team-row ${
                      user.username === winner &&
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
                      <Link to={`/teams/${winner}`}>
                        <div className={`records-${winnerDivision}`}></div>
                        <SC.textOnBgColor className="records-team-name">
                          {winner}
                        </SC.textOnBgColor>
                        <div className="active-helmet">
                          <Helmet
                            team={winner}
                            size={"records"}
                            helmetStyle={helmetStyle}
                            helmetView={helmetView}
                          />
                        </div>
                      </Link>
                    </td>
                    {/* PF */}
                    <td className="record-col">
                      <SC.textOnBgColor>{winnerPF}</SC.textOnBgColor>
                    </td>
                    {/* - */}
                    <td className="dash-col">
                      <SC.textOnBgColor>-</SC.textOnBgColor>
                    </td>
                    {/* PA */}
                    <td className="record-col">
                      <SC.textOnBgColor>{loserPF}</SC.textOnBgColor>
                    </td>
                    {/* OPPONENT */}
                    <td className="records-team-home">
                      <Link to={`/teams/${loser}`}>
                        <div className="mirror-helmet">
                          <Helmet
                            team={loser}
                            size={"records"}
                            helmetStyle={helmetStyle}
                            helmetView={helmetView}
                          />
                        </div>
                        <SC.textOnBgColor className="records-team-name">
                          {loser}
                        </SC.textOnBgColor>
                        <div className={`records-${loserDivision}`}></div>
                      </Link>
                    </td>
                    {/* Margin */}
                    <td className="record-col">
                      <SC.textOnBgColor className="total-col">
                        {game.pf - game.pa}
                      </SC.textOnBgColor>
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
