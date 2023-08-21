/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Settings.scss";
import SC from "../../themes/styledComponents";
import ClassicHelmet from "../../components/helmet/ClassicHelmet";
import VintageHelmet from "../../components/helmet/VintageHelmet";
import ModernHelmet from "../../components/helmet/ModernHelmet";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateHighlightUser } from "../../store/actions/authActions";

export default function Settings({
  setCurrentPage,
  allThemes,
  theme,
  handleChangeTheme,
  theme1,
  theme2,
  handleChangeHelmetStyle,
  helmetStyle,
  handleChangeHelmetView,
  helmetView,
}) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage("settings");
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleChangeHighlightUser = (bool) => {
    dispatch(
      updateHighlightUser({
        highlightUser: bool,
        user: user._id,
      })
    );
  };

  return (
    <div style={{maxHeight: "inherit", overflowY: "hidden"}}>
      <SC.teampageHeader className="page-header">
        <div className="settings-page-header">Settings</div>
      </SC.teampageHeader>
      <SC.PageWrapper className="settings-page">
        <SC.textOnBgColor className="settings-container">
          {/* THEME */}
          <div className="settings-section">
            <SC.textOnBgColor className="settings-section-header-container ">
              <div className="settings-section-header">Theme</div>
            </SC.textOnBgColor>
            <div className="settings-section-item-container">
              <div className="settings-section-item">
                <SC.ThemeIcon>
                  <Brightness5Icon
                    className={`theme-icon ${theme.type === "light" && "active"}`}
                    onClick={() => handleChangeTheme("light", 2)}
                  />
                  Light
                </SC.ThemeIcon>
              </div>
              <div className="settings-section-item">
                <SC.ThemeIcon>
                  <DarkModeIcon
                    className={`theme-icon ${theme.type === "dark" && "active"}`}
                    onClick={() => handleChangeTheme("dark", 2)}
                  />
                  Dark
                </SC.ThemeIcon>
              </div>
            </div>
          </div>
          {/* ACCENT */}
          <div className="settings-section">
            <SC.textOnBgColor className="settings-section-header-container ">
              <div className="settings-section-header">Accent</div>
            </SC.textOnBgColor>
            <div className="settings-section-item-container">
              {allThemes.map((_theme) => {
                return (
                  <>
                    {/* CHECK IF LIGHT OR DARK MODE */}
                    {theme1 === _theme.type ? (
                      // CHECK IF CURRENT THEME IS CURRENT COLOR
                      <div className="settings-section-item">
                        <SC.primaryColorAnchorInverse
                          className={
                            theme.accent === _theme.accent
                              ? `settings-button ${_theme.type} ${_theme.accent} active`
                              : `settings-button ${_theme.type} ${_theme.accent}`
                          }
                          onClick={() => handleChangeTheme(_theme.accent, 1)}
                        >
                          {_theme.accent}
                        </SC.primaryColorAnchorInverse>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          </div>
          {/* HELMET STYLE */}
          <div className="settings-section">
            <SC.textOnBgColor className="settings-section-header-container ">
              <div className="settings-section-header">
                Helmet Style
                <SC.primaryColorButtonInverse
                  className="refresh-icon-container"
                  onClick={() => window.location.reload()}
                >
                  <RefreshOutlinedIcon className="refresh-icon" />
                </SC.primaryColorButtonInverse>
              </div>
            </SC.textOnBgColor>
            <div className="settings-section-item-container">
              <div className="settings-section-item">
                <SC.HelmetSelection
                  className={
                    helmetStyle === "classic"
                      ? "settings-helmet-button active"
                      : "settings-helmet-button"
                  }
                  onClick={() => handleChangeHelmetStyle("classic")}
                >
                  <ClassicHelmet
                    team={user.username ? user.username : "Guest"}
                    size={"settings"}
                  />
                  <span className="settings-helmet-name">Classic</span>
                </SC.HelmetSelection>
              </div>
              <div className="settings-section-item">
                <SC.HelmetSelection
                  className={
                    helmetStyle === "vintage"
                      ? "settings-helmet-button active"
                      : "settings-helmet-button"
                  }
                  onClick={() => handleChangeHelmetStyle("vintage")}
                >
                  <VintageHelmet
                    team={user.username ? user.username : "Guest"}
                    size={"settings"}
                  />
                  <span className="settings-helmet-name">Vintage</span>
                </SC.HelmetSelection>
              </div>
              <div className="settings-section-item">
                <SC.HelmetSelection
                  className={
                    helmetStyle === "modern"
                      ? "settings-helmet-button active"
                      : "settings-helmet-button"
                  }
                  onClick={() => handleChangeHelmetStyle("modern")}
                >
                  <ModernHelmet
                    team={user.username ? user.username : "Guest"}
                    size={"settings"}
                  />
                  <span className="settings-helmet-name">Modern</span>
                </SC.HelmetSelection>
              </div>
            </div>
          </div>
          {/* HELMET DISPLAY */}
          <div className="settings-section">
            <SC.textOnBgColor className="settings-section-header-container ">
              <div className="settings-section-header">Helmet Display</div>
            </SC.textOnBgColor>
            <div className="settings-section-item-container">
              {/* CUSTOM */}
              <div className="settings-section-item">
                <SC.primaryColorAnchorInverse
                  className={
                    helmetView === "custom"
                      ? `settings-button active`
                      : `settings-button`
                  }
                  onClick={() => handleChangeHelmetView("custom")}
                >
                  Custom
                </SC.primaryColorAnchorInverse>
              </div>
              {/* UNIFORM */}
              <div className="settings-section-item">
                <SC.primaryColorAnchorInverse
                  className={
                    helmetView === "uniform"
                      ? `settings-button active`
                      : `settings-button`
                  }
                  onClick={() => handleChangeHelmetView("uniform")}
                >
                  Uniform
                </SC.primaryColorAnchorInverse>
              </div>
            </div>
          </div>
          {/* HIGHLIGHT USER */}
          {user.username !== null && (
            <div className="settings-section">
              <SC.textOnBgColor className="settings-section-header-container ">
                <div className="settings-section-header">Highlight User</div>
              </SC.textOnBgColor>
              <div className="settings-section-item-container">
                {/* CUSTOM */}
                <div className="settings-section-item">
                  <SC.primaryColorAnchorInverse
                    className={
                      user.highlightUser
                        ? `settings-button active`
                        : `settings-button`
                    }
                    onClick={() => handleChangeHighlightUser(true)}
                  >
                    Yes
                  </SC.primaryColorAnchorInverse>
                </div>
                {/* UNIFORM */}
                <div className="settings-section-item">
                  <SC.primaryColorAnchorInverse
                    className={
                      !user.highlightUser
                        ? `settings-button active`
                        : `settings-button`
                    }
                    onClick={() => handleChangeHighlightUser(false)}
                  >
                    No
                  </SC.primaryColorAnchorInverse>
                </div>
              </div>
            </div>
          )}
          {/* LOGOUT */}
          {user.username !== null && (
            <div className="settings-section logout">
              <div className="settings-section-item-container">
                <div className="settings-section-item">
                  <SC.primaryColorAnchorInverse
                    className="settings-button"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </SC.primaryColorAnchorInverse>
                </div>
              </div>
            </div>
          )}
        </SC.textOnBgColor>
      </SC.PageWrapper>
    </div>
  );
}
