/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, createRef } from "react";
import "./Records.scss";
import SC from "../../themes/styledComponents";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// records
import SingleGameMostPF from "./records/SingleGameMostPF";
import SingleSeasonMostPF from "./records/SingleSeasonMostPF";
import HighestScoringGame from "./records/HighestScoringGame";
import HighestMarginOfVictory from "./records/HighestMarginOfVictory";
import WeeklyRecords from "./records/WeeklyRecords";

export default function Records({
  setCurrentPage,
  j_Division,
  weeksMostPFmedals,
  weeksMostPAmedals,
  weeksLeastPFmedals,
  weeksLeastPAmedals,
  scrollProgress,
  page,
  helmetStyle,
  helmetView,
}) {
  //scroll functionality
  const [index, setIndex] = useState(0);
  const list = {
    1: "records-page",
    2: "single-game-most-pf",
    3: "single-season-most-pf",
    4: "highest-scoring-game",
    5: "highest-margin-of-victory",
    6: "weekly-records",
  };
  const [upButton, setUpButton] = useState(0);
  const [downButton, setDownButton] = useState(2);

  // scroll functionality

  useEffect(() => {
    if (scrollProgress < 5) {
      setIndex(1);
      setUpButton(1);
      setDownButton(2);
    } else if (scrollProgress < 25) {
      setIndex(2);
      setUpButton(1);
      setDownButton(3);
    } else if (scrollProgress < 50) {
      setIndex(3);
      setUpButton(2);
      setDownButton(4);
    } else if (scrollProgress < 73) {
      setIndex(4);
      setUpButton(3);
      setDownButton(5);
    } else if (scrollProgress < 91) {
      setIndex(5);
      setUpButton(4);
      setDownButton(6);
    } else {
      setIndex(6);
      setUpButton(5);
      setDownButton(6);
    }
  }, [scrollProgress]);

  useEffect(() => {
    setCurrentPage("records");
    page.scrollTo(0, 0);
  }, []);

  return (
    <div className="records-page">
      <SC.teampageHeader className="page-header">
        <div className="records-header">Records</div>
      </SC.teampageHeader>
      {/* <div className="top-of-page" id="records-page"></div> */}

      {/* CANNOT USE REFERENCES WITH HASHROUTER
CANNOUT REFRESH PAGE WITH BROWSER ROUTER
DECIDED TO STICK WITH BROWSER ROUTER */}

      {/* <div className="records-references">
        <SC.primaryColorAnchorInverse
          className="records-references-links"
          href="#single-game-most-pf"
        >
          Single Game Most PF
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className="records-references-links"
          href="#single-season-most-pf"
        >
          Single Season Most PF
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className="records-references-links"
          href="#highest-scoring-game"
        >
          Highest Scoring Game
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className="records-references-links"
          href="#highest-margin-of-victory"
        >
          Highest Margin Of Victory
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className="records-references-links"
          href="#weekly-records"
        >
          Weekly Records
        </SC.primaryColorAnchorInverse>
      </div> */}
      <div className="record-tables-container">
        <SingleGameMostPF
          j_Division={j_Division}
          helmetStyle={helmetStyle}
          helmetView={helmetView}
        />
        <SingleSeasonMostPF
          j_Division={j_Division}
          helmetStyle={helmetStyle}
          helmetView={helmetView}
        />
        <HighestScoringGame
          j_Division={j_Division}
          helmetStyle={helmetStyle}
          helmetView={helmetView}
        />
        <HighestMarginOfVictory
          j_Division={j_Division}
          helmetStyle={helmetStyle}
          helmetView={helmetView}
        />
        <WeeklyRecords
          j_Division={j_Division}
          weeksMostPFmedals={weeksMostPFmedals}
          weeksMostPAmedals={weeksMostPAmedals}
          weeksLeastPFmedals={weeksLeastPFmedals}
          weeksLeastPAmedals={weeksLeastPAmedals}
          helmetStyle={helmetStyle}
          helmetView={helmetView}
        />
        <br />
      </div>
      {/* <div className="arrows-container">
        <div className="prev-next-button-container">
          <SC.primaryColorAnchor
            className="prev-record-button"
            href={`#${list[upButton]}`}
          >
            <KeyboardArrowUpIcon />
          </SC.primaryColorAnchor>
        </div>
        <div className="prev-next-button-container">
          <SC.primaryColorAnchor
            className="next-record-button"
            href={`#${list[downButton]}`}
          >
            <KeyboardArrowDownIcon />
          </SC.primaryColorAnchor>
        </div>
        <SC.primaryColorAnchor
          className="return-to-top-button"
          href="#records-page"
        >
          <KeyboardDoubleArrowUpIcon />
        </SC.primaryColorAnchor>
      </div> */}
    </div>
  );
}
