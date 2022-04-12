/* eslint-disable react/jsx-pascal-case */
import React from "react";
import SC from "../../../themes/styledComponents";
import TeamH2H from "./components/TeamH2H";
import { SportsFootball } from "@material-ui/icons";
import Helmet from "../../../components/helmet/Helmet";

export default function H2H_Section({
  team1data,
  team2data,
  winsRank_h2h,
  ppgRank_h2h,
  pfRank_h2h,
  difRank_h2h,
  difpgRank_h2h,
  winStreak,
  winner,
}) {
  return (
    <div className="h2h-all-stats-section">
      {team1data && team2data && winsRank_h2h ? (
        <>
          <div className="h2h-section-header-container">
            <SC.textOnBgColor>
              <div className="h2h-section-header">HEAD TO HEAD</div>
            </SC.textOnBgColor>
            <SC.subtextOnBgColor>
              <div className="h2h-section-subheader">
                {team1data.W_h2h + team2data.W_h2h} games
              </div>
            </SC.subtextOnBgColor>
          </div>
          <div className="h2h-team-stats-container">
            {/* TEAM 1 */}
            <TeamH2H
              team={team1data}
              winsRank_h2h={winsRank_h2h}
              ppgRank_h2h={ppgRank_h2h}
              pfRank_h2h={pfRank_h2h}
              difRank_h2h={difRank_h2h}
              difpgRank_h2h={difpgRank_h2h}
            />
            {/* CENTER COLUMN */}
            <div className="h2h-team-stats-category-column">
              <SC.subtextOnBgColor>
                <div className="h2h-team-stat-category-cell  with-subtext">
                  WINS
                  {/* football icon for category leader */}
                  <SC.primaryColorFont
                    className="category-leader-icon left"
                    style={
                      parseFloat(team1data.W_h2h) > parseFloat(team2data.W_h2h)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <SportsFootball />
                  </SC.primaryColorFont>
                  <SC.primaryColorFont
                    className="category-leader-icon right"
                    style={
                      parseFloat(team2data.W_h2h) > parseFloat(team1data.W_h2h)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <SportsFootball />
                  </SC.primaryColorFont>
                </div>
              </SC.subtextOnBgColor>
              <SC.subtextOnBgColor>
                <div className="h2h-team-stat-category-cell  with-subtext">
                  PPG
                  {/* football icon for category leader */}
                  <SC.primaryColorFont
                    className="category-leader-icon left"
                    style={
                      parseFloat(team1data.PPG_h2h) >
                      parseFloat(team2data.PPG_h2h)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <SportsFootball />
                  </SC.primaryColorFont>
                  <SC.primaryColorFont
                    className="category-leader-icon right"
                    style={
                      parseFloat(team2data.PPG_h2h) >
                      parseFloat(team1data.PPG_h2h)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <SportsFootball />
                  </SC.primaryColorFont>
                </div>
              </SC.subtextOnBgColor>
              <SC.subtextOnBgColor>
                <div className="h2h-team-stat-category-cell  with-subtext">
                  POINTS
                  {/* football icon for category leader */}
                  <SC.primaryColorFont
                    className="category-leader-icon left"
                    style={
                      parseFloat(team1data.PF_h2h) >
                      parseFloat(team2data.PF_h2h)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <SportsFootball />
                  </SC.primaryColorFont>
                  <SC.primaryColorFont
                    className="category-leader-icon right"
                    style={
                      parseFloat(team2data.PF_h2h) >
                      parseFloat(team1data.PF_h2h)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <SportsFootball />
                  </SC.primaryColorFont>
                </div>
              </SC.subtextOnBgColor>
              {/* DIFPG */}
              <SC.subtextOnBgColor>
                <div className="h2h-team-stat-category-cell  with-subtext">
                  +/- PG
                  {/* football icon for category leader */}
                  <SC.primaryColorFont
                    className="category-leader-icon left"
                    style={
                      parseFloat(team1data.DIFPG_h2h) >
                      parseFloat(team2data.DIFPG_h2h)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <SportsFootball />
                  </SC.primaryColorFont>
                  <SC.primaryColorFont
                    className="category-leader-icon right"
                    style={
                      parseFloat(team2data.DIFPG_h2h) >
                      parseFloat(team1data.DIFPG_h2h)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <SportsFootball />
                  </SC.primaryColorFont>
                </div>
              </SC.subtextOnBgColor>
              {/* DIF */}
              <SC.subtextOnBgColor>
                <div className="h2h-team-stat-category-cell  with-subtext">
                  +/-
                  {/* football icon for category leader */}
                  <SC.primaryColorFont
                    className="category-leader-icon left"
                    style={
                      parseFloat(team1data.DIF_h2h) >
                      parseFloat(team2data.DIF_h2h)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <SportsFootball />
                  </SC.primaryColorFont>
                  <SC.primaryColorFont
                    className="category-leader-icon right"
                    style={
                      parseFloat(team2data.DIF_h2h) >
                      parseFloat(team1data.DIF_h2h)
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
            <TeamH2H
              team={team2data}
              winsRank_h2h={winsRank_h2h}
              ppgRank_h2h={ppgRank_h2h}
              pfRank_h2h={pfRank_h2h}
              difRank_h2h={difRank_h2h}
              difpgRank_h2h={difpgRank_h2h}
            />
          </div>
          {winStreak > 1 ? (
            <SC.primaryBorderColor className="h2h-winstreak-container">
              <SC.textOnBgColor>
                <div className="h2h-winstreak-header">
                  <Helmet team={winner} size="h2h-streak" />
                  <span>{winStreak} game win streak</span>
                  <div className="mirror-helmet-inactive">
                    <Helmet team={winner} size="h2h-streak" />
                  </div>
                </div>
              </SC.textOnBgColor>
            </SC.primaryBorderColor>
          ) : (
            <> </>
          )}
        </>
      ) : (
        <h1>no data</h1>
      )}
    </div>
  );
}
