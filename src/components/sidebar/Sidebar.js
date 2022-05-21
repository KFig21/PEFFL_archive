import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import {
  HomeRounded,
  HomeOutlined,
  SportsFootball,
  SportsFootballOutlined,
  EmojiEvents,
  EmojiEventsOutlined,
  ViewList,
  ViewListOutlined,
  Star,
  StarBorderOutlined,
  Settings,
  SettingsOutlined,
  PeopleAltOutlined,
  People,
  GpsFixedOutlined,
  GpsNotFixedOutlined,
  Face,
  FaceOutlined,
} from "@material-ui/icons";
import StadiumIcon from "@mui/icons-material/Stadium";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import LanIcon from "@mui/icons-material/Lan";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SC from "../../themes/styledComponents";
import { useSelector } from "react-redux";
import Helmet from "../helmet/Helmet";

export default function Sidebar({
  currentPage,
  currentYear,
  setCurrentPage,
  setShowLoginModal,
  showLoginModal,
  showMobileSidebar,
  setShowMobileSidebar,
  handleCloseModals,
  expandSidebar,
  helmetStyle,
}) {
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const switchTeams = (user) => {
    setShowMobileSidebar(false);
    navigate(`/teams/${user}`);
    window.location.reload();
  };

  return (
    <div
      className={`sidebar-container ${showMobileSidebar && "active"} ${
        !expandSidebar && "collapse"
      }`}
    >
      <SC.Sidebar className={`sidebar ${showMobileSidebar && "active"}  `}>
        <div className="sidebar-list-container">
          <ul className="sidebar-list">
            {/* LOGIN */}
            {user.username === null ? (
              <SC.SidebarLink
                className={"sidebar-link "}
                onClick={() => setShowLoginModal(!showLoginModal)}
              >
                <Helmet
                  team={"loading"}
                  size={"sidebar-team"}
                  helmetStyle={helmetStyle}
                />
                <li className="sidebar-link-text with-helmet">Login</li>
              </SC.SidebarLink>
            ) : (
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "myteam" ? "active-nav-link" : "")
                }
                onClick={() => switchTeams(user.username)}
              >
                <Helmet
                  team={user.username}
                  size={"sidebar-team"}
                  helmetStyle={user.helmetStyle}
                />
                <li className="sidebar-link-text with-helmet">
                  {user.username}
                </li>
              </SC.SidebarLink>
            )}
            {/* HOME */}
            <Link to="/">
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "home" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "home" ? (
                  <HomeRounded className="sidebar-icon" />
                ) : (
                  <HomeOutlined className="sidebar-icon" />
                )}{" "}
                <li className="sidebar-link-text">Home</li>
              </SC.SidebarLink>
            </Link>
            {/* STANDINGS */}
            <Link to="/standings">
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "standings" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "standings" ? (
                  <ViewList className="sidebar-icon" />
                ) : (
                  <ViewListOutlined className="sidebar-icon" />
                )}{" "}
                <li className="sidebar-link-text">Standings</li>
              </SC.SidebarLink>
            </Link>
            {/* PLAYOFFS */}
            {/* <Link to="/playoffs">
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "playoffs" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "playoffs" ? (
                  <LanIcon className="sidebar-icon lan" />
                ) : (
                  <LanOutlinedIcon className="sidebar-icon lan" />
                )}{" "}
                <li className="sidebar-link-text">Playoffs</li>
              </SC.SidebarLink>
            </Link> */}
            {/* SEASONS */}
            <Link to={`/seasons/${currentYear}`}>
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "seasons" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "seasons" ? (
                  <CalendarMonthIcon className="sidebar-icon  " />
                ) : (
                  <CalendarMonthOutlinedIcon className="sidebar-icon  " />
                )}{" "}
                <li className="sidebar-link-text">Seasons</li>
              </SC.SidebarLink>
            </Link>
            {/* TEAMS */}
            <Link to="/teams">
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "teams" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "teams" ? (
                  <SportsFootball className="sidebar-icon" />
                ) : (
                  <SportsFootballOutlined className="sidebar-icon" />
                )}{" "}
                <li className="sidebar-link-text">Teams</li>
              </SC.SidebarLink>
            </Link>
            {/* MATCHUPS */}
            <Link to="/matchups">
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "matchups" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "matchups" ? (
                  <People className="sidebar-icon" />
                ) : (
                  <PeopleAltOutlined className="sidebar-icon" />
                )}{" "}
                <li className="sidebar-link-text">Matchups</li>
              </SC.SidebarLink>
            </Link>
            {/* H2H */}
            <Link to={`/h2h/DenR/The Boo`}>
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "h2h" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "h2h" ? (
                  <GpsFixedOutlined className="sidebar-icon" />
                ) : (
                  <GpsNotFixedOutlined className="sidebar-icon" />
                )}{" "}
                <li className="sidebar-link-text">H2H</li>
              </SC.SidebarLink>
            </Link>
            {/* RECORDS */}
            <Link to="/records">
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "records" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "records" ? (
                  <Star className="sidebar-icon" />
                ) : (
                  <StarBorderOutlined className="sidebar-icon" />
                )}{" "}
                <li className="sidebar-link-text">Records</li>
              </SC.SidebarLink>
            </Link>
            {/* AWARD */}
            <Link to="/awards">
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "awards" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "awards" ? (
                  <EmojiEvents className="sidebar-icon" />
                ) : (
                  <EmojiEventsOutlined className="sidebar-icon" />
                )}{" "}
                <li className="sidebar-link-text">Awards</li>
              </SC.SidebarLink>
            </Link>
            {/* RULES */}
            <Link to="/rules">
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "rules" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "rules" ? (
                  <StadiumIcon className="sidebar-icon" />
                ) : (
                  <StadiumOutlinedIcon className="sidebar-icon" />
                )}{" "}
                <li className="sidebar-link-text">Rules</li>
              </SC.SidebarLink>
            </Link>
            {/* SETTINGS */}
            <Link to="/settings">
              <SC.SidebarLink
                className={
                  "sidebar-link " +
                  (currentPage === "settings" ? "active-nav-link" : "")
                }
                onClick={() => handleCloseModals()}
              >
                {currentPage === "settings" ? (
                  <Settings className="sidebar-icon" />
                ) : (
                  <SettingsOutlined className="sidebar-icon" />
                )}{" "}
                <li className="sidebar-link-text">Settings</li>
              </SC.SidebarLink>
            </Link>
          </ul>
        </div>
      </SC.Sidebar>
      <SC.ModalBackground
        className={`sidebar-mobile-background ${
          showMobileSidebar ? "open" : "close"
        }`}
        onClick={() => handleCloseModals()}
      ></SC.ModalBackground>
    </div>
  );
}
