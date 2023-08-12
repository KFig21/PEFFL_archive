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
                  "medal" + weeksMostPFmedals.indexOf(parseInt(team_.pf))
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">{team_.pf || 0}</div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              <span className="rank-text">RANK</span>{" "}
              <strong className="rank-number">
                {1 + weeksMostPFmedals.indexOf(parseInt(team_.pf))}
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
                  "medal" + weeksMostPAmedals.indexOf(parseInt(team_.pa))
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">{team_.pa || 0}</div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              <span className="rank-text">RANK</span>{" "}
              <strong className="rank-number">
                {1 + weeksMostPAmedals.indexOf(parseInt(team_.pa))}
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
                  "medal" + weeksLeastPFmedals.indexOf(parseInt(team_.leastpf))
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">{team_.leastpf || 0}</div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              <span className="rank-text">RANK</span>{" "}
              <strong className="rank-number">
                {1 + weeksLeastPFmedals.indexOf(parseInt(team_.leastpf))}
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
                  "medal" + weeksLeastPAmedals.indexOf(team_.leastpa)
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">{team_.leastpa || 0}</div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              <span className="rank-text">RANK</span>{" "}
              <strong className="rank-number">
                {1 + weeksLeastPAmedals.indexOf(team_.leastpa)}
              </strong>
              of 10
            </div>
          </SC.subtextOnBgColor>
        </div>
      </div>
    </div>
  );
}
