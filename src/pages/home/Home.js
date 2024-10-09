/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
import SC from "../../themes/styledComponents";
import "./Home.scss";
import { SportsFootball } from "@material-ui/icons";
import keeperList from "../../assets/2024_keeperList.png";
import Countdown from "../../components/countdown/Countdown";

export default function Home({ setCurrentPage }) {
  useEffect(() => {
    setCurrentPage("home");
  }, []);

  return (
    <div style={{maxHeight: "inherit", overflowY: "hidden"}}>
      <SC.teampageHeader className="page-header">
        <div className="standings-header">PEFFL</div>
      </SC.teampageHeader>
      <SC.PageWrapper className="home-page">
        <SC.textOnBgColor className="home-container">
          {/* STRUCTURE */}
          {/*
          <Countdown year={2024} month={8} day={9} title={"2023 Draft Day Countdown"} message={"It's Draft Day!"}/>
          <Countdown year={2024} month={9} day={7} title={"Week 1 Countdown"} message={"It's Week 1!"}/>
          */}
          <div className="home-section">
            <SC.primaryColorUnderline className="home-section-header-container">
              <div className="home-section-header"> News & Updates</div>
            </SC.primaryColorUnderline>
            {/* 2023 */}
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
                Congratulations to Fig for winning the 2023 DenR Cup over DenR
                by a score of 143 - 140!
              </div>
            </div>
            {/* 2024 */}
            <div className="home-section-item">
              <div className="home-section-item-title">
                <SC.primaryColorFont className="home-ball-container">
                  <SportsFootball />
                </SC.primaryColorFont>
                2024
              </div>
              <div className="home-section-item-detail">
                <SC.primaryColorFont className="item-arrow">
                  &gt;
                </SC.primaryColorFont>
                Draft Day is Friday, August 9th.
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
                2024 Keeper List
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
      </SC.PageWrapper>
    </div>
  );
}
