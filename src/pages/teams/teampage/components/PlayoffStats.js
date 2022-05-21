/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import SC from "../../../../themes/styledComponents";

export default function PlayoffStats({
  team,
  playoffWins,
  playoffWinP,
  playoffPFmedals,
  playoffPAmedals,
  playoffPPGmedals,
  playoffPAPGmedals,
  playoffDIFmedals,
  playoffDIFPGmedals,
}) {
  const [perStat, setPerStat] = useState(true);

  let pfMedal =
    playoffPFmedals.indexOf(team.team) > -1
      ? "medal" + playoffPFmedals.indexOf(team.team)
      : "nomedal";
  let paMedal =
    playoffPAmedals.indexOf(team.team) > -1
      ? "medal" + playoffPAmedals.indexOf(team.team)
      : "nomedal";
  let ppgMedal =
    playoffPPGmedals.indexOf(team.team) > -1
      ? "medal" + playoffPPGmedals.indexOf(team.team)
      : "nomedal";
  let papgMedal =
    playoffPAPGmedals.indexOf(team.team) > -1
      ? "medal" + playoffPAPGmedals.indexOf(team.team)
      : "nomedal";
  let difMedal =
    playoffDIFmedals.indexOf(team.team) > -1
      ? "medal" + playoffDIFmedals.indexOf(team.team)
      : "nomedal";
  let difpgMedal =
    playoffDIFPGmedals.indexOf(team.team) > -1
      ? "medal" + playoffDIFPGmedals.indexOf(team.team)
      : "nomedal";
  let winsMedal =
    playoffWins.indexOf(team.team) > -1
      ? "medal" + playoffWins.indexOf(team.team)
      : "nomedal";
  let winpMedal =
    playoffWinP.indexOf(team.team) > -1
      ? "medal" + playoffWinP.indexOf(team.team)
      : "nomedal";

  return (
    <div className="teampage-section-container">
      {team.team !== "Taylor" ? (
        <>
          <div className="teampage-section-header-container">
            <SC.textOnBgColor>
              <div className="teampage-section-header">
                PLAYOFFS
                <span className="section-header-subtext">
                  <SC.subtextOnBgColor>
                    {team.playoffs_A} APPEARANCES
                  </SC.subtextOnBgColor>
                </span>
                <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
                  {perStat ? "total" : "game"}
                </SC.primaryColorButton>
              </div>
            </SC.textOnBgColor>
          </div>
          <div className="rs-stats">
            {/* RECORD */}
            <div className="teampage-record-container">
              <SC.textOnBgColor>
                <span className="stat-title">
                  {perStat ? "RECORD" : "WIN %"}
                  <div
                    className={`medal-small teampage ${
                      perStat ? winsMedal : winpMedal
                    }`}
                  ></div>
                </span>
              </SC.textOnBgColor>
              <SC.textOnBgColor>
                <div className="stat-value">
                  {perStat
                    ? `${team.playoffs_W} - ${team.playoffs_L}`
                    : ` ${(
                        ((team.playoffs_W /
                          (team.playoffs_W + team.playoffs_L)) *
                          100) /
                        100
                      )
                        .toFixed(3)
                        .toString()
                        .substring(1)}`}
                </div>
              </SC.textOnBgColor>
              <SC.subtextOnBgColor>
                <div className="substat-value">
                  {perStat
                    ? ` ${(
                        ((team.playoffs_W /
                          (team.playoffs_W + team.playoffs_L)) *
                          100) /
                        100
                      )
                        .toFixed(3)
                        .toString()
                        .substring(1)} win %`
                    : `${team.playoffs_W} - ${team.playoffs_L}`}
                </div>
              </SC.subtextOnBgColor>
            </div>
            {/* POINTS FOR */}
            <div className="teampage-record-container">
              <SC.textOnBgColor>
                <span className="stat-title">
                  {perStat ? "POINTS FOR" : "POINTS/GAME"}
                  <div
                    className={`medal-small teampage ${
                      perStat ? pfMedal : ppgMedal
                    }`}
                  ></div>
                </span>
              </SC.textOnBgColor>
              <SC.textOnBgColor>
                <div className="stat-value">
                  {perStat
                    ? team.playoffs_PF.toLocaleString()
                    : (Math.round(team.playoffs_PPG * 100) / 100).toFixed(1)}
                </div>
              </SC.textOnBgColor>
              <SC.subtextOnBgColor>
                <div className="substat-value">
                  {perStat
                    ? (Math.round(team.playoffs_PPG * 100) / 100).toFixed(1) +
                      " pg"
                    : team.playoffs_PF.toLocaleString() + " pts"}
                </div>
              </SC.subtextOnBgColor>
            </div>
            {/* POINTS AGAINST */}
            <div className="teampage-record-container">
              <SC.textOnBgColor>
                <span className="stat-title">
                  {perStat ? "POINTS VS" : "POINTS VS/GAME"}
                  <div
                    className={`medal-small teampage ${
                      perStat ? paMedal : papgMedal
                    }`}
                  ></div>
                </span>
              </SC.textOnBgColor>
              <SC.textOnBgColor>
                <div className="stat-value">
                  {perStat
                    ? team.playoffs_PA.toLocaleString()
                    : (Math.round(team.playoffs_PAPG * 100) / 100).toFixed(1)}
                </div>
              </SC.textOnBgColor>
              <SC.subtextOnBgColor>
                <div className="substat-value">
                  {perStat
                    ? (Math.round(team.playoffs_PAPG * 100) / 100).toFixed(1) +
                      " pg"
                    : team.playoffs_PA.toLocaleString() + " pts"}
                </div>
              </SC.subtextOnBgColor>
            </div>
            {/* PLUS MINUS */}
            <div className="teampage-record-container end-col">
              <SC.textOnBgColor>
                <span className="stat-title">
                  {perStat ? "TOTAL +/-" : "+/- PER GAME"}
                  <div
                    className={`medal-small teampage ${
                      perStat ? difMedal : difpgMedal
                    }`}
                  ></div>
                </span>
              </SC.textOnBgColor>
              <SC.textOnBgColor>
                <div
                  className="stat-value"
                  style={{
                    color: `${
                      team.playoffs_DIF > 0
                        ? "green"
                        : team.playoffs_DIF < 0
                        ? "crimson"
                        : null
                    }`,
                  }}
                >
                  {team.playoffs_DIF > 0 ? "+" : ""}
                  {perStat
                    ? team.playoffs_DIF.toLocaleString()
                    : (Math.round(team.playoffs_DIFPG * 100) / 100).toFixed(1)}
                </div>
              </SC.textOnBgColor>
              <SC.subtextOnBgColor>
                <div className="substat-value">
                  {team.playoffs_DIF > 0 ? "+" : ""}
                  {perStat
                    ? (Math.round(team.playoffs_DIFPG * 100) / 100).toFixed(1)
                    : team.playoffs_DIF.toLocaleString()}
                </div>
              </SC.subtextOnBgColor>
            </div>
          </div>
        </>
      ) : (
        <SC.textOnBgColor>
          <h1>no playoff appearances</h1>
        </SC.textOnBgColor>
      )}
    </div>
  );
}
