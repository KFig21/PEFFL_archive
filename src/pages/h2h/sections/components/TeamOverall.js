/* eslint-disable react/jsx-pascal-case */
import React from "react";
import SC from "../../../../themes/styledComponents";

export default function TeamOverall({
  team,
  winPercentageRank,
  ppgRank_overall,
  papgRank_overall,
  difpgRank_overall,
  pfRank_overall,
  paRank_overall,
  difRank_overall,
}) {
  let winPercRank = winPercentageRank.indexOf(team.WinP_at);
  let ppgRank = ppgRank_overall.indexOf(team.PPG_at);
  let papgRank = papgRank_overall.indexOf(team.PAPG_at);
  let difpgRank = difpgRank_overall.indexOf(team.DIFPG_at);
  let pfRank = pfRank_overall.indexOf(team.PF_at);
  let paRank = paRank_overall.indexOf(team.PA_at);
  let difRank = difRank_overall.indexOf(team.DIF_at);

  return (
    <div className="h2h-team-stats">
      {/* RECORD */}
      <SC.textOnBgColor>
        <div className="h2h-team-stat-cell">
          {team.W_at} - {team.L_at}
        </div>
      </SC.textOnBgColor>
      {/* WIN% */}
      <div className="h2h-team-stat-cell-with-subtext">
        <div className="h2h-team-stat-main">
          <SC.textOnBgColor>
            {(((team.W_at / team.G_at) * 100) / 100)
              .toFixed(3)
              .toString()
              .substring(1)}
          </SC.textOnBgColor>
          <div className={`h2h-medal medal-small medal${winPercRank}`}></div>
        </div>
        <div className="h2h-team-stat-sub">
          <SC.subtextOnBgColor>
            <span className="rank-text">RANK</span>{" "}
            <strong>{winPercRank + 1}</strong>{" "}
            <span className="rank-text">of</span> {winPercentageRank.length}
          </SC.subtextOnBgColor>
        </div>
      </div>
      {/* PPG */}
      <div className="h2h-team-stat-cell-with-subtext">
        <div className="h2h-team-stat-main">
          <SC.textOnBgColor>
            {(Math.round(team.PPG_at * 100) / 100).toFixed(1)}
          </SC.textOnBgColor>
          <div className={`h2h-medal medal-small medal${ppgRank}`}></div>
        </div>
        <div className="h2h-team-stat-sub">
          <SC.subtextOnBgColor>
            <span className="rank-text">RANK</span>{" "}
            <strong>{ppgRank + 1}</strong> <span className="rank-text">of</span>{" "}
            {ppgRank_overall.length}
          </SC.subtextOnBgColor>
        </div>
      </div>
      {/* PAPG */}
      <div className="h2h-team-stat-cell-with-subtext">
        <div className="h2h-team-stat-main">
          <SC.textOnBgColor>
            {(Math.round(team.PAPG_at * 100) / 100).toFixed(1)}
            <div className={`h2h-medal medal-small medal${papgRank}`}></div>
          </SC.textOnBgColor>
        </div>
        <div className="h2h-team-stat-sub">
          <SC.subtextOnBgColor>
            <span className="rank-text">RANK</span>{" "}
            <strong>{papgRank + 1}</strong>{" "}
            <span className="rank-text">of</span> {papgRank_overall.length}
          </SC.subtextOnBgColor>
        </div>
      </div>
      {/* DIFPG */}
      <div className="h2h-team-stat-cell-with-subtext">
        <SC.textOnBgColor>
          <div
            className="h2h-team-stat-main"
            style={
              team.DIFPG_at > 0
                ? { color: "green" }
                : team.DIFPG_at < 0
                ? { color: "crimson" }
                : null
            }
          >
            {team.DIFPG_at > 0 ? "+" : ""}
            {(Math.round(team.DIFPG_at * 100) / 100).toFixed(1)}
            <div className={`h2h-medal medal-small medal${difpgRank}`}></div>
          </div>
        </SC.textOnBgColor>
        <div className="h2h-team-stat-sub">
          <SC.subtextOnBgColor>
            {" "}
            <span className="rank-text">RANK</span>{" "}
            <strong>{difpgRank + 1}</strong>{" "}
            <span className="rank-text">of</span> {difpgRank_overall.length}
          </SC.subtextOnBgColor>
        </div>
      </div>
      {/* POINTS */}
      <div className="h2h-team-stat-cell-with-subtext">
        <div className="h2h-team-stat-main">
          <SC.textOnBgColor>{team.PF_at.toLocaleString()}</SC.textOnBgColor>
          <div className={`h2h-medal medal-small medal${pfRank}`}></div>
        </div>
        <div className="h2h-team-stat-sub">
          <SC.subtextOnBgColor>
            {" "}
            <span className="rank-text">RANK</span>{" "}
            <strong>{pfRank + 1}</strong> <span className="rank-text">of</span>{" "}
            {pfRank_overall.length}
          </SC.subtextOnBgColor>
        </div>
      </div>
      {/* POINTS AGAINST */}
      <div className="h2h-team-stat-cell-with-subtext">
        <div className="h2h-team-stat-main">
          <SC.textOnBgColor>{team.PA_at.toLocaleString()}</SC.textOnBgColor>
          <div className={`h2h-medal medal-small medal${paRank}`}></div>
        </div>
        <div className="h2h-team-stat-sub">
          <SC.subtextOnBgColor>
            {" "}
            <span className="rank-text">RANK</span>{" "}
            <strong>{paRank + 1}</strong> <span className="rank-text">of</span>{" "}
            {paRank_overall.length}
          </SC.subtextOnBgColor>
        </div>
      </div>
      {/* DIF*/}
      <div className="h2h-team-stat-cell-with-subtext">
        <SC.textOnBgColor>
          <div
            className="h2h-team-stat-main"
            style={
              team.DIFPG_at > 0
                ? { color: "green" }
                : team.DIFPG_at < 0
                ? { color: "crimson" }
                : null
            }
          >
            {team.DIF_at > 0 ? "+" : ""}
            {team.DIF_at}
            <div className={`h2h-medal medal-small medal${difRank}`}></div>
          </div>
        </SC.textOnBgColor>
        <div className="h2h-team-stat-sub">
          <SC.subtextOnBgColor>
            {" "}
            <span className="rank-text">RANK</span>{" "}
            <strong>{difRank + 1}</strong> <span className="rank-text">of</span>{" "}
            {difRank_overall.length}
          </SC.subtextOnBgColor>
        </div>
      </div>
    </div>
  );
}
