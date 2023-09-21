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
                  team1data.overall.w > team2data.overall.w
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.overall.w > team1data.overall.w
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
                  team1data.overall.w / team1data.overall.g >
                  team2data.overall.w / team2data.overall.g
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.overall.w / team2data.overall.g >
                  team1data.overall.w / team1data.overall.g
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
                  team1data.overall.ppg > team2data.overall.ppg
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.overall.ppg > team1data.overall.ppg
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
                  team1data.overall.papg > team2data.overall.papg
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.overall.papg > team1data.overall.papg
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
                  team1data.overall.difpg > team2data.overall.difpg
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.overall.difpg > team1data.overall.difpg
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
                  team1data.overall.pf > team2data.overall.pf
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.overall.pf > team1data.overall.pf
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
                  team1data.overall.pa > team2data.overall.pa
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.overall.pa > team1data.overall.pa
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
                  team1data.overall.dif > team2data.overall.dif
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <SportsFootball />
              </SC.primaryColorFont>
              <SC.primaryColorFont
                className="category-leader-icon right"
                style={
                  team2data.overall.dif > team1data.overall.dif
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
