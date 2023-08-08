/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import "./Rules.scss";
import SC from "../../themes/styledComponents";
import { SportsFootball } from "@material-ui/icons";

export default function Rules({ setCurrentPage }) {
  useEffect(() => {
    setCurrentPage("rules");
  }, []);

  return (
    <div className="rules-page">
      <SC.teampageHeader className="page-header">
        <div className="rules-page-header">League Rules</div>
      </SC.teampageHeader>
      <SC.textOnBgColor className="rules-container">
        {/* STRUCTURE */}
        <div className="rules-section">
          <SC.primaryColorUnderline className="rules-section-header-container">
            <div className="rules-section-header"> League Structure</div>
          </SC.primaryColorUnderline>
          {/* TEAMS */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Teams
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              The League consists of exactly 10 teams, if an owner drops from
              the league a new owner will be voted on to enter the league to
              keep the number at 10. If the league decides to expand, it must
              pass a vote of {">"} 66% approval to proceed with expansion.
            </div>
          </div>
          {/* ROSTER */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Roster
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              A team's starting roster consists of 1 quarterback, 2 running
              backs, 2 wide receivers, 1 tight end, 1 FLEX (RB/WR/TE), 1 OP
              (QB/RB/WR/TE) and 1 team defense. There are 6 bench spots with no
              restrictions on what position the players are, and 2 injured
              reserve spots for injured players.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              A team with a player in the injured reserve spot who is not
              currently injured will be restricted from making any transactions
              until the player is taken off the injured reserve.
            </div>
          </div>
          {/* DRAFT */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Draft
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              A draft is conducted on the best planned day to try and
              accommodate both the league and the owners of the league before
              the NFL regular season begins. Each team must acquire 15 players.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Any professional football player is eligible for the Draft.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              It is expected that each team in its turn will draft a player for
              the roster within the time restrictions set for each round. Time
              retrictions are set on draft day and are subject to change. If the
              time limit is exceeded, that team's pick in that round can be
              skipped by the team who has the next selection if they are ready
              to pick.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Each team has the choice to keep one player who was on their final
              roster from the previous year. A player can only be kept for one
              year, then they are back in the draft pool. The player is kept in
              same round that they were selected the previous year, in the case
              that the player was a free agent pick-up they are a 5th rounder. A
              team under new ownership does not get to keep a player from the
              previous year.
            </div>
          </div>
          {/* STANDINGS */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Standings
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Standings are based on team record. If two teams have the same
              record the tie breaker is the head to head matchup for the season,
              then overall points scored.
            </div>
          </div>
          {/* PLAYOFFS */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Playoffs
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              The playoffs are comprised of 6 teams, 2 division winners and 4
              wild cards. The 2 division winners receive a bye to the
              semi-finals.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Draft positions are determined by reverse order of teams
              eliminated.
            </div>
            <div className="rules-section-item-detail sub-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              example - In the wild card round, If the 3rd seed is eliminated by
              the 6th seed & the 5th seed is eliminated by the 4th seed: The 5th
              seed will receive the 5th pick and the 3rd seed will receive the
              6th pick. Picks 7 & 8 will be determined by reverse order of the 2
              teams eliminated in the semi-finals, pick 9 will go to the
              runner-up, and pick 10 will go to the champion.
            </div>
          </div>
          {/* LOSER BRACKET */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Loser Bracket
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Teams that do not qualify for the playoffs will be placed in the
              losers bracket to determine draft positions.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              In the first round the 7th seed will play the 8th seed. The loser
              will receive the 4th pick and the winner advances to the final
              round.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              In the first round the 9th seed will play the 10th seed. The loser
              will receive the 3rd pick and the winner advances to the final
              round.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              In the final round the winner will get the 1st pick and the loser
              will get the 2nd pick.
            </div>
          </div>
          {/* WAIVERS */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Waivers
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Weekly waviers are decided by the order of reverse standings going
              into the week.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Players picked up from waivers are eligble to be kept in the 5th
              round unless the are re-acquired by the team that dropped them.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Players picked up from waivers that are inactive (on IR,
              suspended, etc..) cannot be kept unless they are activated by
              their team before the end of the fantasy season (week 17)
            </div>
          </div>
          {/* FREE AGENTS */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Free Agents
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Free Agents can be acquired from the time immediately after the
              conclusion of the Draft until the the team is eliminated from
              post-season play.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Players picked up from free agency are eligble to be kept in the
              5th round.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Players picked up from free agency that are inactive (on IR,
              suspended, etc..) cannot be kept unless they are activated by
              their team before the end of the fantasy season (week 17).
            </div>
          </div>
          {/* TRADES */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Trades
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Trades can be made when the draft is completed.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              The trade deadline is before kickoff on thanksgiving.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Trades are voted on by all 10 members of the league and must
              recieve {">"} 66% approval.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Draft picks and other future considerations cannot be traded.
            </div>
          </div>
          {/* VOTING*/}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Voting
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              League rules are discussed and voted upon prior to the start of
              the draft.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              A rule change must receive {">"} 66% approval to be accepted. The
              rule change will not be in effect until the following year unless
              all league members unanimously agree to accept the rule change for
              the upcoming season.
            </div>
          </div>
          {/* FEES & PAYOUT */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Fees and Payout
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Fees are agreed upon before draft day but can be changed if agreed
              upon by a unanimous vote. 100% of fees go towards the prize money
              pool.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Trophy fees are taken from the prize money pool.
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Payouts:
            </div>
            <div className="rules-section-item-detail sub-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              1st place - 53.53%
            </div>
            <div className="rules-section-item-detail sub-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              2nd place - 25%
            </div>
            <div className="rules-section-item-detail sub-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Regular Season Champion - 12.8%
            </div>
            <div className="rules-section-item-detail sub-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Most Points - 8.67%
            </div>
          </div>
        </div>
        {/* SCORING */}
        <br></br>
        <div className="rules-section">
          <SC.primaryColorUnderline className="rules-section-header-container">
            <div className="rules-section-header">Scoring</div>
          </SC.primaryColorUnderline>
          {/* PASSING */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Passing
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              1 pt / 25 passing yds
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              4 pt / passing TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              -2 pt / interception thrown
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              2 pt / 2 point conversion thrown
            </div>
          </div>
          {/* RUSHING */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Rushing
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              1 pt / 10 rushing yds
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / rushing TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              2 pt / 2 point conversion run
            </div>
          </div>
          {/* RECEIVING */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Receiving
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              1 pt / 10 receiving yds
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              1 pt / 1 reception
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / receiving TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              2 pt / 2 point conversion reception
            </div>
          </div>
          {/* MISC */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Miscellaneous
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / kickoff return TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / punt return TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / fumble recovered and returned TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / interception returned TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / blocked FG/punt returned TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              -2 pt / fumble lost
            </div>
          </div>
          {/* DEFENSE */}
          <div className="rules-section-item">
            <div className="rules-section-item-title">
              <SC.primaryColorFont className="rules-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              Defense
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / kickoff return TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / punt return TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / fumble recovered and returned TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / interception returned TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              6 pt / blocked FG/punt returned TD
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              2 pt / fumble recovered
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              2 pt / interception
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              2 pt / safety
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              1 pt / sack
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              5 pt / 0 points allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              4 pt / 1-6 points allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              3 pt / 7-13 points allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              1 pt / 14-17 points allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              -1 pt / 28-34 points allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              -5 pt / 46+ points allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              5 pt / {"<"} 100 yards allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              3 pt / 100-199 yards allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              2 pt / 200-299 yards allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              -1 pt / 350-399 yards allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              -3 pt / 400-449 yards allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              -5 pt / 450-499 yards allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              -6 pt / 500-549 yards allowed
            </div>
            <div className="rules-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              -7 pt / 550+ yards allowed
            </div>
          </div>
        </div>
      </SC.textOnBgColor>
    </div>
  );
}
