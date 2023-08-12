/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
import SC from "../../themes/styledComponents";
import "./Home.scss";
import { SportsFootball } from "@material-ui/icons";
import keeperList from "../../assets/2023_keeperList.png";
import Countdown from "../../components/countdown/Countdown";

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
        <Countdown year={2023} month={8} day={12} title={"2023 Draft Day Countdown"} message={"It's Draft Day!"}/>
        {/* <Countdown year={2023} month={9} day={7} title={"Week 1 Countdown"} message={"It's Week 1!"}/> */}
        <div className="home-section">
          <SC.primaryColorUnderline className="home-section-header-container">
            <div className="home-section-header"> News & Updates</div>
          </SC.primaryColorUnderline>
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
              Congratulations to The Boo for winning the 2022 DenR Cup over Frankie
              by a score of 151 - 145!
            </div>
          </div>
          {/* 2022 */}
          <div className="home-section-item">
            <div className="home-section-item-title">
              <SC.primaryColorFont className="home-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              2023
            </div>
            <div className="home-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Draft day is Saturday August 12th at 7pm.
            </div>
            <div className="home-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Pay league dues before the start of the draft.
            </div>
            {/* <div className="home-section-item-detail">
              <SC.primaryColorFont className="item-arrow">
                &gt;
              </SC.primaryColorFont>
              Currently looking for a location/host for the upcoming draft.
            </div> */}
          </div>
          {/* KEEPERS */}
          <div className="home-section-item">
            <div className="home-section-item-title">
              <SC.primaryColorFont className="home-ball-container">
                <SportsFootball />
              </SC.primaryColorFont>
              2023 Keeper List
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
