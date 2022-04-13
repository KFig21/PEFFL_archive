/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTeams,
  loadUser,
  updateAccent,
  updateExpandSidebar,
  updateHelmetStyle,
  updateHelmetView,
  updateTheme,
} from "./store/actions/authActions";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./app.scss";
import {
  getAwardsRank,
  getWeeksMostPFmedals,
  getWeeksMostPAmedals,
  getWeeksLeastPFmedals,
  getWeeksLeastPAmedals,
  getStandingsRank,
  getStandingsMedals,
} from "./helpers/apiCalls";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// Pages and Components
import Sidebar from "./components/sidebar/Sidebar";
import Teams from "./pages/teams/Teams";
import Home from "./pages/home/Home";
import Standings from "./pages/standings/Standings";
import Records from "./pages/records/Records";
import Awards from "./pages/awards/Awards";
import Rules from "./pages/rules/Rules";
import Settings from "./pages/settings/Settings";
import TeamPage from "./pages/teams/teampage/TeamPage";
import Matchups from "./pages/matchups/Matchups";
import Seasons from "./pages/seasons/Seasons";
import H2H from "./pages/h2h/H2H";
// themes
import { ThemeProvider } from "styled-components";
import SC from "./themes/styledComponents";
import lightThemeGreen from "./themes/lightThemeGreen";
import darkThemeGreen from "./themes/darkThemeGreen";
import darkThemeBlue from "./themes/darkThemeBlue";
import lightThemeBlue from "./themes/lightThemeBlue";
import darkThemeYellow from "./themes/darkThemeYellow";
import lightThemeYellow from "./themes/lightThemeYellow";
import darkThemeRed from "./themes/darkThemeRed";
import lightThemeRed from "./themes/lightThemeRed";
import LoginModal from "./components/modal/LoginModal";

function App() {
  // REGULAR SEASON
  const [rs_Standings, setRS_Standings] = useState([]);
  const [rs_WinP, setRS_WinP] = useState([]);
  const [rs_PFmedals, setRS_PFmedals] = useState([]);
  const [rs_PAmedals, setRS_PAmedals] = useState([]);
  const [rs_PPGmedals, setRS_PPGmedals] = useState([]);
  const [rs_PAPGmedals, setRS_PAPGmedals] = useState([]);
  const [rs_DIFmedals, setRS_DIFmedals] = useState([]);
  const [rs_DIFPGmedals, setRS_DIFPGmedals] = useState([]);
  // PLAYOFFS
  const [playoff_Standings, setPlayoff_Standings] = useState([]);
  const [playoff_Wins, setPlayoff_Wins] = useState([]);
  const [playoff_WinP, setPlayoff_WinP] = useState([]);
  const [playoff_PFmedals, setPlayoff_PFmedals] = useState([]);
  const [playoff_PAmedals, setPlayoff_PAmedals] = useState([]);
  const [playoff_PPGmedals, setPlayoff_PPGmedals] = useState([]);
  const [playoff_PAPGmedals, setPlayoff_PAPGmedals] = useState([]);
  const [playoff_DIFmedals, setPlayoff_DIFmedals] = useState([]);
  const [playoff_DIFPGmedals, setPlayoff_DIFPGmedals] = useState([]);
  // ALL GAMES
  const [ag_Standings, setAG_Standings] = useState([]);
  const [ag_Wins, setAG_Wins] = useState([]);
  const [ag_WinP, setAG_WinP] = useState([]);
  const [ag_PFmedals, setAG_PFmedals] = useState([]);
  const [ag_PAmedals, setAG_PAmedals] = useState([]);
  const [ag_PPGmedals, setAG_PPGmedals] = useState([]);
  const [ag_PAPGmedals, setAG_PAPGmedals] = useState([]);
  const [ag_DIFmedals, setAG_DIFmedals] = useState([]);
  const [ag_DIFPGmedals, setAG_DIFPGmedals] = useState([]);
  // AWARDS
  const [awardsRank, setAwardsRank] = useState([]);
  const [weeksMostPFmedals, setWeeksMostPFmedals] = useState([]);
  const [weeksMostPAmedals, setWeeksMostPAmedals] = useState([]);
  const [weeksLeastPFmedals, setWeeksLeastPFmedals] = useState([]);
  const [weeksLeastPAmedals, setWeeksLeastPAmedals] = useState([]);
  // SETUP
  const [currentPage, setCurrentPage] = useState("home");
  const j_Division = ["Fig", "Chad", "Rose", "Billy", "Big Boy", "Taylor"];
  // const f_Division = ["DenR", "The Boo", "Timmy", "Frankie", "Nordy", "AJ"];
  const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
  const currentYear = 2021;
  // STYLES
  const [theme, setTheme] = useState(darkThemeGreen);
  const [theme1, setTheme1] = useState("dark");
  const [theme2, setTheme2] = useState("green");
  const [helmetStyle, setHelmetStyle] = useState("classic");
  const [helmetView, setHelmetView] = useState("uniform");
  const allThemes = [
    darkThemeGreen,
    lightThemeGreen,
    darkThemeBlue,
    lightThemeBlue,
    darkThemeYellow,
    lightThemeYellow,
    darkThemeRed,
    lightThemeRed,
  ];
  // LOGIN
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // MISC
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [expandSidebar, setExpandSidebar] = useState(true);

  // when dispatch is ready, load user
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getTeams());
  }, [dispatch]);

  // when user is set, load display
  useEffect(() => {
    setUserDisplay();
  }, [user, user.theme, user.accent, user.helmetStyle]);

  // update users display options on load
  const setUserDisplay = async () => {
    const userTheme = await user.theme;
    const userAccent = await user.accent;
    if (userTheme !== null && userAccent !== null) {
      setTheme1(userTheme);
      setTheme2(userAccent);
      const newThemeString = `${userTheme}Theme${userAccent}`;
      const newTheme = allThemes.filter(
        (theme) => theme.name.toLowerCase() === newThemeString.toLowerCase()
      );
      if (newTheme.length === 0) {
        setTheme(darkThemeGreen);
      } else {
        setTheme(...newTheme);
        setHelmetStyle(user.helmetStyle);
        setHelmetView(user.helmetView);
        setExpandSidebar(user.expandSidebar);
      }
    } else {
      setTheme(theme);
    }
  };

  const getData = async () => {
    // REGULAR SEASON
    setRS_Standings(await getStandingsRank("RS"));
    setRS_WinP(await getStandingsMedals("RS", "WinP"));
    setRS_PFmedals(await getStandingsMedals("RS", "PF"));
    setRS_PAmedals(await getStandingsMedals("RS", "PA"));
    setRS_PPGmedals(await getStandingsMedals("RS", "PPG"));
    setRS_PAPGmedals(await getStandingsMedals("RS", "PAPG"));
    setRS_DIFmedals(await getStandingsMedals("RS", "DIF"));
    setRS_DIFPGmedals(await getStandingsMedals("RS", "DIFPG"));

    // PLAYOFFS
    setPlayoff_Standings(await getStandingsRank("playoffs"));
    setPlayoff_Wins(await getStandingsMedals("playoffs", "W"));
    setPlayoff_WinP(await getStandingsMedals("playoffs", "WinP"));
    setPlayoff_PFmedals(await getStandingsMedals("playoffs", "PF"));
    setPlayoff_PAmedals(await getStandingsMedals("playoffs", "PA"));
    setPlayoff_PPGmedals(await getStandingsMedals("playoffs", "PPG"));
    setPlayoff_PAPGmedals(await getStandingsMedals("playoffs", "PAPG"));
    setPlayoff_DIFmedals(await getStandingsMedals("playoffs", "DIF"));
    setPlayoff_DIFPGmedals(await getStandingsMedals("playoffs", "DIFPG"));

    // ALL GAMES
    setAG_Standings(await getStandingsRank("AG"));
    setAG_Wins(await getStandingsMedals("AG", "W"));
    setAG_WinP(await getStandingsMedals("AG", "WinP"));
    setAG_PFmedals(await getStandingsMedals("AG", "PF"));
    setAG_PAmedals(await getStandingsMedals("AG", "PA"));
    setAG_PPGmedals(await getStandingsMedals("AG", "PPG"));
    setAG_PAPGmedals(await getStandingsMedals("AG", "PAPG"));
    setAG_DIFmedals(await getStandingsMedals("AG", "DIF"));
    setAG_DIFPGmedals(await getStandingsMedals("AG", "DIFPG"));

    // AWARDS
    setAwardsRank(await getAwardsRank());
    setWeeksMostPFmedals(await getWeeksMostPFmedals());
    setWeeksMostPAmedals(await getWeeksMostPAmedals());
    setWeeksLeastPFmedals(await getWeeksLeastPFmedals());
    setWeeksLeastPAmedals(await getWeeksLeastPAmedals());
  };

  useEffect(() => {
    getData();
  }, []);

  // use for pages with auto scroll buttons like the records page
  const target = createRef();
  const page = document.getElementById("page");
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollListener = () => {
    if (!target.current) {
      return;
    }
    const element = target.current;
    const windowScroll = element.scrollTop; // Distance of the scrollbar from the leftmost point
    const totalHeight = element.scrollHeight - element.clientHeight; // Total width the scrollbar can traverse
    if (windowScroll === 0) {
      return setScrollProgress(0);
    }

    if (windowScroll > totalHeight) {
      return setScrollProgress(100);
    }
    setScrollProgress((windowScroll / totalHeight) * 100);
  };

  useEffect(() => {
    target.current.addEventListener("scroll", scrollListener);
    return () =>
      target.current &&
      target.current.removeEventListener("scroll", scrollListener);
  });

  // theme change & accent change
  const handleChangeTheme = (theme, type) => {
    if (type === 2) {
      // update theme
      setTheme1(theme);
      const newThemeString = `${theme}Theme${theme2}`;
      const newTheme = allThemes.filter(
        (theme) => theme.name.toLowerCase() === newThemeString.toLowerCase()
      );
      // if there is a user signed in, update their theme
      if (user.theme !== null) {
        dispatch(
          updateTheme({
            theme: theme,
            user: user._id,
          })
        );
      }
      setTheme(...newTheme);
    } else if (type === 1) {
      // update accent
      setTheme2(theme);
      const newThemeString = `${theme1}Theme${theme}`;
      const newTheme = allThemes.filter(
        (theme) => theme.name.toLowerCase() === newThemeString.toLowerCase()
      );
      // if there is a user signed in, update their accent
      if (user.accent !== null) {
        dispatch(
          updateAccent({
            accent: theme,
            user: user._id,
          })
        );
      }
      setTheme(...newTheme);
    }
  };

  const handleChangeHelmetStyle = (style) => {
    // if there is a user signed in, update their accent
    if (user.accent !== null) {
      dispatch(
        updateHelmetStyle({
          helmetStyle: style,
          user: user._id,
        })
      );
    }
    setHelmetStyle(style);
  };

  const handleChangeHelmetView = (style) => {
    // if there is a user signed in, update their accent
    if (user.accent !== null) {
      dispatch(
        updateHelmetView({
          helmetView: style,
          user: user._id,
        })
      );
    }
    setHelmetView(style);
  };

  const handleExpandSidebar = (style) => {
    // if there is a user signed in, update their accent
    if (user.expandSidebar !== null) {
      dispatch(
        updateExpandSidebar({
          expandSidebar: style,
          user: user._id,
        })
      );
    }
    setExpandSidebar(style);
  };

  const handleCloseModals = () => {
    setShowMobileSidebar(false);
    setShowLoginModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/PEFFL_archive">
        <div className="app">
          <SC.primaryColorFont className="mobile-menu-button">
            <MenuOutlinedIcon
              className="mobile-menu-icon"
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            />
          </SC.primaryColorFont>
          <SC.primaryColorFont className="expand-menu-button">
            <MenuOutlinedIcon
              className="expand-menu-icon"
              onClick={() => handleExpandSidebar(!expandSidebar)}
            />
          </SC.primaryColorFont>
          <Sidebar
            currentPage={currentPage}
            currentYear={currentYear}
            setShowLoginModal={setShowLoginModal}
            showLoginModal={showLoginModal}
            showMobileSidebar={showMobileSidebar}
            setShowMobileSidebar={setShowMobileSidebar}
            handleCloseModals={handleCloseModals}
            expandSidebar={expandSidebar}
            helmetStyle={helmetStyle}
          />
          <SC.mainContent className="main" ref={target} id="page">
            {/* <Nav /> */}
            <div className="content">
              <LoginModal
                setShowLoginModal={setShowLoginModal}
                showLoginModal={showLoginModal}
              />
              <Routes>
                {/* HOME */}
                <Route
                  exact
                  path="/"
                  element={<Home setCurrentPage={setCurrentPage} />}
                ></Route>
                {/* TEAMS */}
                <Route
                  exact
                  path="/teams"
                  element={
                    <Teams
                      setCurrentPage={setCurrentPage}
                      j_Division={j_Division}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  }
                ></Route>
                {/* STANDINGS */}
                <Route
                  exact
                  path="/standings"
                  element={
                    <Standings
                      setCurrentPage={setCurrentPage}
                      j_Division={j_Division}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  }
                ></Route>
                {/* PLAYOFFS */}
                {/* <Route
                  exact
                  path="/playoffs"
                  element={
                    <Playoffs
                      setCurrentPage={setCurrentPage}
                      pfMedals={playoffPFmedals}
                      paMedals={playoffPAmedals}
                      ppgMedals={playoffPPGmedals}
                      papgMedals={playoffPAPGmedals}
                      difMedals={playoffDIFmedals}
                      difpgMedals={playoffDIFPGmedals}
                      standings={playoffStandings}
                      j_Division={j_Division}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  }
                ></Route> */}
                {/* SEASONS */}
                <Route
                  exact
                  path="/seasons/:year"
                  element={
                    <Seasons
                      setCurrentPage={setCurrentPage}
                      j_Division={j_Division}
                      years={years}
                      currentYear={currentYear}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  }
                ></Route>
                {/* RECORDS */}
                <Route
                  exact
                  path="/records"
                  element={
                    <Records
                      setCurrentPage={setCurrentPage}
                      j_Division={j_Division}
                      weeksMostPFmedals={weeksMostPFmedals}
                      weeksMostPAmedals={weeksMostPAmedals}
                      weeksLeastPFmedals={weeksLeastPFmedals}
                      weeksLeastPAmedals={weeksLeastPAmedals}
                      scrollProgress={scrollProgress}
                      page={page}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  }
                ></Route>
                {/* AWARDS */}
                <Route
                  exact
                  path="/awards"
                  element={
                    <Awards
                      setCurrentPage={setCurrentPage}
                      awardsRank={awardsRank}
                      j_Division={j_Division}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  }
                ></Route>
                {/* H2H */}
                <Route
                  exact
                  path="/h2h/:away/:home"
                  element={
                    <H2H
                      setCurrentPage={setCurrentPage}
                      j_Division={j_Division}
                      page={page}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  }
                ></Route>
                {/* MATCHUPS */}
                <Route
                  exact
                  path="/matchups"
                  element={
                    <Matchups
                      setCurrentPage={setCurrentPage}
                      j_Division={j_Division}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                    />
                  }
                ></Route>
                {/* RULES */}
                <Route
                  exact
                  path="/rules"
                  element={<Rules setCurrentPage={setCurrentPage} />}
                ></Route>
                {/* SETTINGS */}
                <Route
                  exact
                  path="/settings"
                  element={
                    <Settings
                      setCurrentPage={setCurrentPage}
                      theme={theme}
                      handleChangeTheme={handleChangeTheme}
                      allThemes={allThemes}
                      theme1={theme1}
                      theme2={theme2}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                      handleChangeHelmetStyle={handleChangeHelmetStyle}
                      handleChangeHelmetView={handleChangeHelmetView}
                    />
                  }
                ></Route>
                {/* TEAMPAGE */}
                <Route
                  exact
                  path="/teams/:team"
                  element={
                    <TeamPage
                      setCurrentPage={setCurrentPage}
                      j_Division={j_Division}
                      helmetStyle={helmetStyle}
                      helmetView={helmetView}
                      rs_Standings={rs_Standings}
                      rs_WinP={rs_WinP}
                      rs_PFmedals={rs_PFmedals}
                      rs_PAmedals={rs_PAmedals}
                      rs_PPGmedals={rs_PPGmedals}
                      rs_PAPGmedals={rs_PAPGmedals}
                      rs_DIFmedals={rs_DIFmedals}
                      rs_DIFPGmedals={rs_DIFPGmedals}
                      playoff_Standings={playoff_Standings}
                      playoff_Wins={playoff_Wins}
                      playoff_WinP={playoff_WinP}
                      playoff_PFmedals={playoff_PFmedals}
                      playoff_PAmedals={playoff_PAmedals}
                      playoff_PPGmedals={playoff_PPGmedals}
                      playoff_PAPGmedals={playoff_PAPGmedals}
                      playoff_DIFmedals={playoff_DIFmedals}
                      playoff_DIFPGmedals={playoff_DIFPGmedals}
                      ag_Standings={ag_Standings}
                      ag_Wins={ag_Wins}
                      ag_WinP={ag_WinP}
                      ag_PFmedals={ag_PFmedals}
                      ag_PAmedals={ag_PAmedals}
                      ag_PPGmedals={ag_PPGmedals}
                      ag_PAPGmedals={ag_PAPGmedals}
                      ag_DIFmedals={ag_DIFmedals}
                      ag_DIFPGmedals={ag_DIFPGmedals}
                      weeksMostPFmedals={weeksMostPFmedals}
                      weeksMostPAmedals={weeksMostPAmedals}
                      weeksLeastPFmedals={weeksLeastPFmedals}
                      weeksLeastPAmedals={weeksLeastPAmedals}
                    />
                  }
                ></Route>
              </Routes>
            </div>
          </SC.mainContent>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
