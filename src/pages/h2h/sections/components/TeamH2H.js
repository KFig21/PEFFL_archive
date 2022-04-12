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
  let winsRank = winsRank_h2h.indexOf(team.W_h2h);
  let ppgRank = ppgRank_h2h.indexOf(parseFloat(team.PPG_h2h));
  let pfRank = pfRank_h2h.indexOf(parseFloat(team.PF_h2h));
  let difpgRank = difpgRank_h2h.indexOf(parseFloat(team.DIFPG_h2h));
  let difRank = difRank_h2h.indexOf(parseFloat(team.DIF_h2h));

  return (
    <div className="h2h-team-stats">
      {/* WINS */}
      <div className="h2h-team-stat-cell-with-subtext">
        <div className="h2h-team-stat-main">
          <SC.textOnBgColor>{team.W_h2h}</SC.textOnBgColor>
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
            {(Math.round(team.PPG_h2h * 100) / 100).toFixed(1)}
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
          <SC.textOnBgColor>{team.PF_h2h.toLocaleString()}</SC.textOnBgColor>
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
              team.DIFPG_h2h > 0
                ? { color: "green" }
                : team.DIFPG_h2h < 0
                ? { color: "crimson" }
                : null
            }
          >
            {team.DIFPG_h2h > 0 ? "+" : ""}
            {(Math.round(team.DIFPG_h2h * 100) / 100).toFixed(1)}
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
              team.DIF_h2h > 0
                ? { color: "green" }
                : team.DIF_h2h < 0
                ? { color: "crimson" }
                : null
            }
          >
            {team.DIF_h2h > 0 ? "+" : ""}
            {team.DIF_h2h.toLocaleString()}
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
