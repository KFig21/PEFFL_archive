/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import SC from "../../../../themes/styledComponents";
import { awards } from "../../../../helpers/hardStats";
// trophy images
import denRcup from "../../../../assets/denrCup.png";
import denRcupEmpty from "../../../../assets/denrCupEmpty.png";
import ruTrophy from "../../../../assets/ruTrophy.png";
import ruTrophyEmpty from "../../../../assets/ruTrophyEmpty.png";
import jdivBanner from "../../../../assets/jdivBanner.png";
import jdivBannerEmpty from "../../../../assets/jdivBannerEmpty.png";
import fdivBanner from "../../../../assets/fdivBanner.png";
import fdivBannerEmpty from "../../../../assets/fdivBannerEmpty.png";
import mostPointsAward from "../../../../assets/mostPointsAward.png";
import mostPointsAwardEmpty from "../../../../assets/mostPointsAwardEmpty.png";
import rscTrophy from "../../../../assets/rscTrophy.png";
import rscTrophyEmpty from "../../../../assets/rscTrophyEmpty.png";
import { Link } from "react-router-dom";

export default function PlayoffStats({ team, j_Division }) {
  const [teamTrophies, setTeamTrophies] = useState(awards[team.team]);

  useEffect(() => {
    setTeamTrophies(awards[team.team]);
  }, [team]);

  return (
    <div className="teampage-section-container">
      <div className="teampage-section-header-container">
        <SC.textOnBgColor>
          <div className="teampage-section-header">
            TROPHY CASE
            <span className="section-header-subtext">
              <SC.subtextOnBgColor>
                {team.awards_Championships +
                  team.awards_RunnerUps +
                  team.awards_RSC +
                  team.awards_MostPoints +
                  team.awards_DivisionTitles}{" "}
                AWARDS -{" "}
                <strong style={{ color: team.awards_Money > 0 ? "green" : "" }}>
                  ${team.awards_Money.toLocaleString()}
                </strong>{" "}
                won
              </SC.subtextOnBgColor>
            </span>
          </div>
        </SC.textOnBgColor>
      </div>
      <div className="rs-stats trophy-case">
        {/* DENR CUPS */}
        <div className="teampage-award-container">
          <img
            src={team.awards_Championships > 0 ? denRcup : denRcupEmpty}
            alt=""
            className="awards-trophy-img"
          />
          <div className="mobile-right">
            <SC.textOnBgColor>
              <span className="stat-title">DENR CUPS</span>
            </SC.textOnBgColor>
            <SC.textOnBgColor>
              <div className="stat-value">
                <div className="x">x</div>
                {team.awards_Championships}
              </div>
            </SC.textOnBgColor>
            {/* YEARS */}
            {team.awards_Championships > 0 && (
              <div className="year-container">
                {teamTrophies.lc.map((year) => (
                  <Link to={`/seasons/${year}`}>
                    <SC.textOnBgColor className="hoverToPrimary">
                      <span className="year-title">{year}</span>
                    </SC.textOnBgColor>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* RUNNER UPS */}
        <div className="teampage-award-container">
          <img
            src={team.awards_RunnerUps > 0 ? ruTrophy : ruTrophyEmpty}
            alt=""
            className="awards-trophy-img"
          />
          <div className="mobile-right">
            <SC.textOnBgColor>
              <span className="stat-title">RUNNER UPS</span>
            </SC.textOnBgColor>
            <SC.textOnBgColor>
              <div className="stat-value">
                <div className="x">x</div>
                {team.awards_RunnerUps}
              </div>
            </SC.textOnBgColor>
            {/* YEARS */}
            {team.awards_RunnerUps > 0 && (
              <div className="year-container">
                {teamTrophies.ru.map((year) => (
                  <Link to={`/seasons/${year}`}>
                    <SC.textOnBgColor className="hoverToPrimary">
                      <span className="year-title">{year}</span>
                    </SC.textOnBgColor>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* RSC */}
        <div className="teampage-award-container">
          <img
            src={team.awards_RSC > 0 ? rscTrophy : rscTrophyEmpty}
            alt=""
            className="awards-trophy-img"
          />
          <div className="mobile-right">
            <SC.textOnBgColor>
              <span className="stat-title">RS CHAMP</span>
            </SC.textOnBgColor>
            <SC.textOnBgColor>
              <div className="stat-value">
                <div className="x">x</div>
                {team.awards_RSC}
              </div>
            </SC.textOnBgColor>
            {/* YEARS */}
            {team.awards_RSC > 0 && (
              <div className="year-container">
                {teamTrophies.rsc.map((year) => (
                  <Link to={`/seasons/${year}`}>
                    <SC.textOnBgColor className="hoverToPrimary">
                      <span className="year-title">{year}</span>
                    </SC.textOnBgColor>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* MOST POINTS */}
        <div className="teampage-award-container">
          <img
            src={
              team.awards_MostPoints > 0
                ? mostPointsAward
                : mostPointsAwardEmpty
            }
            alt=""
            className="awards-trophy-img"
          />
          <div className="mobile-right">
            <SC.textOnBgColor>
              <span className="stat-title">MOST POINTS</span>
            </SC.textOnBgColor>
            <SC.textOnBgColor>
              <div className="stat-value">
                <div className="x">x</div>
                {team.awards_MostPoints}
              </div>
            </SC.textOnBgColor>
            {/* YEARS */}
            {team.awards_MostPoints > 0 && (
              <div className="year-container">
                {teamTrophies.p.map((year) => (
                  <Link to={`/seasons/${year}`}>
                    <SC.textOnBgColor className="hoverToPrimary">
                      <span className="year-title">{year}</span>
                    </SC.textOnBgColor>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* DIVISION TITLES */}
        <div className="teampage-award-container end-col">
          <img
            src={
              j_Division.includes(team.team)
                ? team.awards_DivisionTitles > 0
                  ? jdivBanner
                  : jdivBannerEmpty
                : team.awards_DivisionTitles > 0
                ? fdivBanner
                : fdivBannerEmpty
            }
            alt=""
            className="awards-trophy-img"
          />
          <div className="mobile-right">
            <SC.textOnBgColor>
              <span className="stat-title">DIV TITLES</span>
            </SC.textOnBgColor>
            <SC.textOnBgColor>
              <div className="stat-value">
                <div className="x">x</div>
                {team.awards_DivisionTitles}
              </div>
            </SC.textOnBgColor>
            {/* YEARS */}
            {team.awards_DivisionTitles > 0 && (
              <div className="year-container">
                {team.awards_DivisionTitles > 0 &&
                  teamTrophies.dc.map((year) => (
                    <Link to={`/seasons/${year}`}>
                      <SC.textOnBgColor className="hoverToPrimary">
                        <span className="year-title">{year}</span>
                      </SC.textOnBgColor>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
