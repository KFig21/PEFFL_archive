/* eslint-disable react/jsx-pascal-case */
import React from "react";
import SC from "../../../../themes/styledComponents";

export default function TeamH2H({
  team,
  winsRank_h2h,
  ppgRank_h2h,
  pfRank_h2h,
  difRank_h2h,
  difpgRank_h2h,
}) {
  let winsRank = winsRank_h2h.indexOf(team.w);
  let ppgRank = ppgRank_h2h.indexOf(parseFloat(team.ppg));
  let pfRank = pfRank_h2h.indexOf(parseFloat(team.pf));
  let difpgRank = difpgRank_h2h.indexOf(parseFloat(team.difpg));
  let difRank = difRank_h2h.indexOf(parseFloat(team.dif));

  return (
    <div className="h2h-team-stats">
      {/* WINS */}
      <div className="h2h-team-stat-cell-with-subtext">
        <div className="h2h-team-stat-main">
          <SC.textOnBgColor>{team.w}</SC.textOnBgColor>
          <div className={`h2h-medal medal-small medal${winsRank}`}></div>
        </div>
        <div className="h2h-team-stat-sub">
          <SC.subtextOnBgColor>
            {" "}
            <span className="rank-text">RANK</span>{" "}
            <strong>{winsRank + 1}</strong>{" "}
            <span className="rank-text">of</span> {winsRank_h2h.length}
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
            {" "}
            <span className="rank-text">RANK</span>{" "}
            <strong>{ppgRank + 1}</strong> <span className="rank-text">of</span>{" "}
            {ppgRank_h2h.length}
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
            {pfRank_h2h.length}
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
            <span className="rank-text">of</span> {difpgRank_h2h.length}
          </SC.subtextOnBgColor>
        </div>
      </div>
      {/* DIF */}
      <div className="h2h-team-stat-cell-with-subtext">
        <SC.textOnBgColor>
          <div
            className="h2h-team-stat-main"
            style={
              team.dif > 0
                ? { color: "green" }
                : team.dif < 0
                ? { color: "crimson" }
                : null
            }
          >
            {team.dif > 0 ? "+" : ""}
            {team.dif.toLocaleString()}
            <div className={`h2h-medal medal-small medal${difRank}`}></div>
          </div>
        </SC.textOnBgColor>
        <div className="h2h-team-stat-sub">
          <SC.subtextOnBgColor>
            {" "}
            <span className="rank-text">RANK</span>{" "}
            <strong>{difRank + 1}</strong> <span className="rank-text">of</span>{" "}
            {difRank_h2h.length}
          </SC.subtextOnBgColor>
        </div>
      </div>
    </div>
  );
}
