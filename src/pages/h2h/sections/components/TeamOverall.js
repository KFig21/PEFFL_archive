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
  // console.log('team1', team)
  let winPercRank = winPercentageRank.indexOf(team.winp);
  let ppgRank = ppgRank_overall.indexOf(team.ppg);
  let papgRank = papgRank_overall.indexOf(team.papg);
  let difpgRank = difpgRank_overall.indexOf(team.difpg);
  let pfRank = pfRank_overall.indexOf(team.pf);
  let paRank = paRank_overall.indexOf(team.pa);
  let difRank = difRank_overall.indexOf(team.dif);

  return (
    <div className="h2h-team-stats">
      {/* RECORD */}
      <SC.textOnBgColor>
        <div className="h2h-team-stat-cell">
          {team.w} - {team.l}
        </div>
      </SC.textOnBgColor>
      {/* WIN% */}
      <div className="h2h-team-stat-cell-with-subtext">
        <div className="h2h-team-stat-main">
          <SC.textOnBgColor>
            {(((team.w / team.g) * 100) / 100)
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
            {(Math.round(team.ppg * 100) / 100).toFixed(1)}
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
            {(Math.round(team.papg * 100) / 100).toFixed(1)}
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
              team.difpg > 0
                ? { color: "green" }
                : team.difpg < 0
                ? { color: "crimson" }
                : null
            }
          >
            {team.difpg > 0 ? "+" : ""}
            {(Math.round(team.difpg * 100) / 100).toFixed(1)}
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
          <SC.textOnBgColor>{team.pf.toLocaleString()}</SC.textOnBgColor>
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
          <SC.textOnBgColor>{team.pa.toLocaleString()}</SC.textOnBgColor>
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
              team.difpg > 0
                ? { color: "green" }
                : team.difpg < 0
                ? { color: "crimson" }
                : null
            }
          >
            {team.dif > 0 ? "+" : ""}
            {team.dif}
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
