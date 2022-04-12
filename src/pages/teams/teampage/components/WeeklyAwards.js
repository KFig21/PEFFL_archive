/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { getTeamWeeklyRecords } from "../../../../helpers/apiCalls";
import SC from "../../../../themes/styledComponents";

export default function WeeklyAwards({
  team,
  weeksMostPFmedals,
  weeksMostPAmedals,
  weeksLeastPFmedals,
  weeksLeastPAmedals,
}) {
  const [team_, setTeam_] = useState({});

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    setTeam_(await getTeamWeeklyRecords(team.team));
  };

  return (
    <div className="teampage-section-container">
      <div className="teampage-section-header-container">
        <SC.textOnBgColor>
          <div className="teampage-section-header">
            WEEKLY AWARDS
            <span className="section-header-subtext"></span>
          </div>
        </SC.textOnBgColor>
      </div>

      <div className="rs-stats">
        {/* WEEKLY HIGHS */}
        <div className="teampage-record-container">
          <SC.textOnBgColor>
            <span className="stat-title">
              WEEKLY HIGHS
              <div
                className={`medal-small teampage ${
                  "medal" + weeksMostPFmedals.indexOf(team_.PF)
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">{team_.PF || 0}</div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              <span className="rank-text">RANK</span>{" "}
              <strong className="rank-number">
                {1 + weeksMostPFmedals.indexOf(team_.PF)}
              </strong>
              of 10
            </div>
          </SC.subtextOnBgColor>
        </div>
        {/* VS WEEKLY HIGHS */}
        <div className="teampage-record-container">
          <SC.textOnBgColor>
            <span className="stat-title">
              VS WEEKLY HIGHS
              <div
                className={`medal-small teampage ${
                  "medal" + weeksMostPAmedals.indexOf(team_.PA)
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">{team_.PA || 0}</div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              <span className="rank-text">RANK</span>{" "}
              <strong className="rank-number">
                {1 + weeksMostPAmedals.indexOf(team_.PA)}
              </strong>
              of 10
            </div>
          </SC.subtextOnBgColor>
        </div>
        {/* WEEKLY LOWS */}
        <div className="teampage-record-container  ">
          <SC.textOnBgColor>
            <span className="stat-title">
              WEEKLY LOWS
              <div
                className={`medal-small teampage ${
                  "medal" + weeksLeastPFmedals.indexOf(team_.LeastPF)
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">{team_.LeastPF}</div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              <span className="rank-text">RANK</span>{" "}
              <strong className="rank-number">
                {1 + weeksLeastPFmedals.indexOf(team_.LeastPF)}
              </strong>
              of 10
            </div>
          </SC.subtextOnBgColor>
        </div>
        {/* VS WEEKLY LOWS */}
        <div className="teampage-record-container end-col">
          <SC.textOnBgColor>
            <span className="stat-title">
              VS WEEKLY LOWS
              <div
                className={`medal-small teampage ${
                  "medal" + weeksLeastPAmedals.indexOf(team_.LeastPA)
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">{team_.LeastPA}</div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              <span className="rank-text">RANK</span>{" "}
              <strong className="rank-number">
                {1 + weeksLeastPAmedals.indexOf(team_.LeastPA)}
              </strong>
              of 10
            </div>
          </SC.subtextOnBgColor>
        </div>
      </div>
    </div>
  );
}
