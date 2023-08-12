/* eslint-disable react/jsx-pascal-case */
import React from "react";
import SC from "../../../themes/styledComponents";
import { SportsFootball } from "@material-ui/icons";
import TeamOverall from "./components/TeamOverall";

export default function Overall_Section({
  team1data,
  team2data,
  winPercentageRank,
  ppgRank_overall,
  pfRank_overall,
  papgRank_overall,
  paRank_overall,
  difRank_overall,
  difpgRank_overall,
}) {
  return (
    <div className="h2h-all-stats-section">
      <div className="h2h-section-header-container">
        <SC.textOnBgColor>
          <div className="h2h-section-header">OVERALL</div>
        </SC.textOnBgColor>
      </div>
      <div className="h2h-team-stats-container">
        {/* TEAM 1 */}
        <TeamOverall
          team={team1data.overall}
          winPercentageRank={winPercentageRank}
          ppgRank_overall={ppgRank_overall}
          papgRank_overall={papgRank_overall}
          difpgRank_overall={difpgRank_overall}
          pfRank_overall={pfRank_overall}
          paRank_overall={paRank_overall}
          difRank_overall={difRank_overall}
        />
        {/* CENTER COLUMN */}
        <div className="h2h-team-stats-category-column">
          <SC.subtextOnBgColor>
            <div className="h2h-team-stat-category-cell">
              RECORD
              {/* football icon for category leader */}
              <SC.primaryColorFont
                className="category-leader-icon left"
                style={
                  team1data.W_at > team2data.W_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.W_at > team1data.W_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
            </div>
          </SC.subtextOnBgColor>
          <SC.subtextOnBgColor>
            <div className="h2h-team-stat-category-cell with-subtext">
              WIN%
              {/* football icon for category leader */}
              <SC.primaryColorFont
                className="category-leader-icon left"
                style={
                  team1data.W_at / team1data.G_at >
                  team2data.W_at / team2data.G_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.W_at / team2data.G_at >
                  team1data.W_at / team1data.G_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
            </div>
          </SC.subtextOnBgColor>
          <SC.subtextOnBgColor>
            <div className="h2h-team-stat-category-cell with-subtext">
              PPG
              {/* football icon for category leader */}
              <SC.primaryColorFont
                className="category-leader-icon left"
                style={
                  team1data.PPG_at > team2data.PPG_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.PPG_at > team1data.PPG_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
            </div>
          </SC.subtextOnBgColor>
          <SC.subtextOnBgColor>
            <div className="h2h-team-stat-category-cell with-subtext">
              PAPG
              {/* football icon for category leader */}
              <SC.primaryColorFont
                className="category-leader-icon left"
                style={
                  team1data.PAPG_at > team2data.PAPG_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.PAPG_at > team1data.PAPG_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
            </div>
          </SC.subtextOnBgColor>
          <SC.subtextOnBgColor>
            <div className="h2h-team-stat-category-cell with-subtext">
              +/- PG
              {/* football icon for category leader */}
              <SC.primaryColorFont
                className="category-leader-icon left"
                style={
                  team1data.DIFPG_at > team2data.DIFPG_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.DIFPG_at > team1data.DIFPG_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
            </div>
          </SC.subtextOnBgColor>
          <SC.subtextOnBgColor>
            <div className="h2h-team-stat-category-cell with-subtext">
              PF
              {/* football icon for category leader */}
              <SC.primaryColorFont
                className="category-leader-icon left"
                style={
                  team1data.PF_at > team2data.PF_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.PF_at > team1data.PF_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
            </div>
          </SC.subtextOnBgColor>
          <SC.subtextOnBgColor>
            <div className="h2h-team-stat-category-cell with-subtext">
              PA
              {/* football icon for category leader */}
              <SC.primaryColorFont
                className="category-leader-icon left"
                style={
                  team1data.PA_at > team2data.PA_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.PA_at > team1data.PA_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
            </div>
          </SC.subtextOnBgColor>
          <SC.subtextOnBgColor>
            <div className="h2h-team-stat-category-cell with-subtext">
              +/-
              {/* football icon for category leader */}
              <SC.primaryColorFont
                className="category-leader-icon left"
                style={
                  team1data.DIF_at > team2data.DIF_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.DIF_at > team1data.DIF_at
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
            </div>
          </SC.subtextOnBgColor>
        </div>
        {/* TEAM 2 */}
        <TeamOverall
          team={team2data.overall}
          winPercentageRank={winPercentageRank}
          ppgRank_overall={ppgRank_overall}
          papgRank_overall={papgRank_overall}
          difpgRank_overall={difpgRank_overall}
          pfRank_overall={pfRank_overall}
          paRank_overall={paRank_overall}
          difRank_overall={difRank_overall}
        />
      </div>
    </div>
  );
}
