/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
import SC from "../../themes/styledComponents";
import "./Home.scss";
import { SportsFootball } from "@material-ui/icons";
import keeperList from "../../assets/2022_keeperList.png";

export default function Home({ setCurrentPage }) {
  useEffect(() => {
    setCurrentPage("home");
  }, []);

  return (
    <div className="home-page">
      <SC.teampageHeader className="page-header">
        <div className="standings-header desktop">PEFFL</div>
      </SC.teampageHeader>
      <SC.textOnBgColor className="home-container">
        {/* STRUCTURE */}
        <div className="home-section">
          <SC.primaryColorUnderline className="home-section-header-container">
            <div className="home-section-header"> News & Updates</div>
          </SC.primaryColorUnderline>
          {/* 2021 */}
          <div className="home-section-item">
            <div className="home-section-item-title">
              <SC.primaryColorFont className="home-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              2021
            </div>
            <div className="home-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Congratulations to The Boo for winning the 2021 DenR Cup over DenR
              by a score of 157 - 103!
            </div>
          </div>
          {/* 2022 */}
          <div className="home-section-item">
            <div className="home-section-item-title">
              <SC.primaryColorFont className="home-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              2022
            </div>
            <div className="home-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Reminder to keep your schedule open for the 2022 draft!
            </div>
            <div className="home-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Currently looking for a location/host for the upcoming draft.
            </div>
          </div>
          {/* KEEPERS */}
          <div className="home-section-item">
            <div className="home-section-item-title">
              <SC.primaryColorFont className="home-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              2022 Keeper List
            </div>
            <a href={keeperList} rel="noreferrer" target="_blank">
              <img src={keeperList} alt="" />
            </a>
            <div className="home-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              <SC.primaryColorFont>
                <a href={keeperList} rel="noreferrer" target="_blank">
                  View
                </a>
              </SC.primaryColorFont>
            </div>
            <div className="home-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              <SC.primaryColorFont>
                <a href={keeperList} download>
                  Download
                </a>
              </SC.primaryColorFont>
            </div>
          </div>
        </div>
      </SC.textOnBgColor>
    </div>
  );
}
