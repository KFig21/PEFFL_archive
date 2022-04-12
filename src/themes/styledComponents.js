import styled from "styled-components";
import {
  blue_primaryColor,
  blue_primaryColorFaded,
  blue_textOnPrimaryColor_dark,
  blue_textOnPrimaryColor_light,
  green_primaryColor,
  green_primaryColorFaded,
  green_textOnPrimaryColor_dark,
  green_textOnPrimaryColor_light,
  red_primaryColor,
  red_primaryColorFaded,
  red_textOnPrimaryColor_dark,
  red_textOnPrimaryColor_light,
  yellow_primaryColor,
  yellow_primaryColorFaded,
  yellow_textOnPrimaryColor_dark,
  yellow_textOnPrimaryColor_light,
} from "./ThemeBase";

// mobile
export const mobileWidthMax = "800px";
export const mobileHeightMin = "421px";
// desktop
export const desktopWidthMin = "801px";
// mobile keyboard
export const mobileKeyboardHeightMax = "500px";

const SC = {
  // ---------- APP.JS ----------
  mainContent: styled.div`
    background-color: ${(props) =>
      props.theme.colors.backgroundColor} !important;
    ::-webkit-scrollbar-thumb {
      background-color: ${(props) =>
        props.theme.colors.primaryColorFaded} !important;
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.primaryColor} !important;
      }
    }
  `,
  textOnBgColor: styled.span`
    color: ${(props) => props.theme.colors.textOnBgColor} !important;

    &.hoverToPrimary {
      transition: all ease 0.12s;
      &:hover {
        color: ${(props) => props.theme.colors.primaryColor} !important;
      }
    }
  `,
  subtextOnBgColor: styled.span`
    color: ${(props) => props.theme.colors.subtextOnBgColor} !important;
  `,
  primaryColorButton: styled.button`
    color: ${(props) => props.theme.colors.textOnPrimaryColor} !important;
    background-color: ${(props) =>
      props.theme.colors.primaryColorFaded} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
  `,
  primaryColorAnchor: styled.a`
    color: ${(props) => props.theme.colors.textOnPrimaryColor} !important;
    background-color: ${(props) =>
      props.theme.colors.primaryColorFaded} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
  `,
  primaryColorAnchorInverse: styled.a`
    color: ${(props) => props.theme.colors.textOnBgColor} !important;
    background-color: ${(props) =>
      props.theme.colors.backgroundColor} !important;
    border-color: ${(props) => props.theme.colors.primaryColorFaded} !important;
    &.active {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
      color: ${(props) => props.theme.colors.textOnPrimaryColor} !important;
      border-color: transparent !important;
    }
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
      color: ${(props) => props.theme.colors.textOnPrimaryColor} !important;
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
    }
    &.Green {
      border-color: ${green_primaryColorFaded} !important;
      &:hover {
        background-color: ${green_primaryColor} !important;
        color: ${(props) => props.theme.colors.textOnPrimaryColor} !important;
        border-color: ${green_primaryColor} !important;
        &.dark {
          color: ${green_textOnPrimaryColor_dark} !important;
        }
        &.light {
          color: ${green_textOnPrimaryColor_light} !important;
        }
      }
      &.active {
        background-color: ${green_primaryColor} !important;
      }
    }
    &.Blue {
      border-color: ${blue_primaryColorFaded} !important;
      &:hover {
        background-color: ${blue_primaryColor} !important;
        color: ${(props) => props.theme.colors.textOnPrimaryColor} !important;
        border-color: ${blue_primaryColor} !important;
        &.dark {
          color: ${blue_textOnPrimaryColor_dark} !important;
        }
        &.light {
          color: ${blue_textOnPrimaryColor_light} !important;
        }
      }
      &.active {
        background-color: ${blue_primaryColor} !important;
      }
    }
    &.Red {
      border-color: ${red_primaryColorFaded} !important;
      &:hover {
        background-color: ${red_primaryColor} !important;
        color: ${(props) => props.theme.colors.textOnPrimaryColor} !important;
        border-color: ${red_primaryColor} !important;
        &.dark {
          color: ${red_textOnPrimaryColor_dark} !important;
        }
        &.light {
          color: ${red_textOnPrimaryColor_light} !important;
        }
      }
      &.active {
        background-color: ${red_primaryColor} !important;
      }
    }
    &.Yellow {
      border-color: ${yellow_primaryColorFaded} !important;
      &:hover {
        background-color: ${yellow_primaryColor} !important;
        border-color: ${yellow_primaryColor} !important;
        &.dark {
          color: ${yellow_textOnPrimaryColor_dark} !important;
        }
        &.light {
          color: ${yellow_textOnPrimaryColor_light} !important;
        }
      }
      &.active {
        background-color: ${yellow_primaryColor} !important;
      }
    }
  `,

  // ---------- SIDEBAR ----------
  Sidebar: styled.div`
    background-color: ${(props) =>
      props.theme.colors.sidebarBgColor} !important;
  `,
  SidebarLink: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin: 2px 0px;
    padding: 8px 20px;
    border-radius: 100px;
    transition: background-color 0.25s ease;
    position: relative;
    color: ${(props) => props.theme.colors.textSidebarColor} !important;
    cursor: pointer;

    &.active-nav-link {
      font-weight: bold;
      border-radius: 0px;
      border-left: solid 4px ${(props) => props.theme.colors.primaryColor};
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
      overflow: visible;
      padding: 8px 20px 8px 16px;
    }
  `,

  // ---------- TABLES ----------
  TableContainer: styled.div`
    ::-webkit-scrollbar-thumb {
      background-color: ${(props) =>
        props.theme.colors.primaryColorFaded} !important;
      &:hover {
        background-color: ${(props) =>
          props.theme.colors.primaryColor} !important;
      }
    }
  `,
  tableBorderColorTR: styled.tr`
    border-color: ${(props) => props.theme.colors.tableBorderColor} !important;
    &.logged-in {
      background-color: ${(props) =>
        props.theme.colors.rowHoverColor} !important;
    }

    @media (min-height: ${mobileHeightMin}) {
      @media (min-width: ${desktopWidthMin}) {
        &:hover {
          background-color: ${(props) =>
            props.theme.colors.rowHoverColor} !important;
        }
      }
    }
  `,
  tableBorderColorTD: styled.td`
    border-color: ${(props) => props.theme.colors.tableBorderColor} !important;
  `,
  tableHeaderBgColor: styled.tr`
    color: ${(props) => props.theme.colors.tableHeaderColor} !important;
    background-color: ${(props) =>
      props.theme.colors.tableHeaderBgColor} !important;
  `,
  tableSortableCol: styled.td`
    &.active {
      background-color: ${(props) =>
        props.theme.colors.activeColColor} !important;
    }
  `,
  tableSortableColHeader: styled.th`
    &.active {
      background-color: ${(props) =>
        props.theme.colors.activeColColorHeader} !important;
    }
  `,
  seasonsTableWeekCell: styled.td`
    font-size: 14px;
    min-width: 30px;
    max-width: 30px;
    min-height: 30px;
    max-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;

    &.win {
      background-color: ${(props) => props.theme.colors.weeklyWinBg};
      border-radius: 40px;
    }
    &.loss {
      background-color: ${(props) => props.theme.colors.weeklyLossBg};
    }
    &.weekly-high {
      border: solid 2px ${(props) => props.theme.colors.weeklyHighBorder};
      background-color: ${(props) =>
        props.theme.colors.weeklyHighBg} !important;
      border-radius: 40px;
      font-weight: bold;
    }
    &.weekly-low {
      border: solid 2px ${(props) => props.theme.colors.weeklyLowBorder};
      background-color: ${(props) => props.theme.colors.weeklyLowBg} !important;
    }
  `,

  // ---------- TEAMPAGE ----------
  teampageHeader: styled.div`
    background-color: ${(props) =>
      props.theme.colors.teampageHeaderBGcolor} !important;
    color: ${(props) => props.theme.colors.teampageHeaderTextColor} !important;
  `,

  // ---------- H2H ----------
  h2hSelect: styled.select`
    background-color: transparent !important;
    color: ${(props) => props.theme.colors.textOnBgColor} !important;
    border: none;
    font-size: 20px;
    margin: 0px 20px;
    padding: 0px 5px;
    border-bottom: solid 2px ${(props) => props.theme.colors.primaryColor} !important;
    outline: none;

    &.input-as-title {
      font-size: inherit !important;
      font-weight: inherit !important;
      color: inherit !important;
      margin: 0px 20px 0px 0px;
    }
  `,
  primaryColorFont: styled.div`
    color: ${(props) => props.theme.colors.primaryColor} !important;
  `,
  h2hSelectOption: styled.option`
    background-color: ${(props) =>
      props.theme.colors.backgroundColor} !important;
    color: ${(props) => props.theme.colors.textOnBgColor} !important;
    border: none;
    outline: none;

    &:hover {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
    }
  `,

  // ---------- SETTINGS ----------
  ThemeIcon: styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .theme-icon {
      cursor: pointer;
      min-width: 60px;
      max-width: 60px;
      min-height: 60px;
      max-height: 60px;
      padding: 5px;
      transition: all ease 0.12s;
      color: ${(props) => props.theme.colors.textOnBgColor} !important;

      &.active {
        color: ${(props) => props.theme.colors.primaryColor} !important;
      }
    }
  `,
  HelmetSelection: styled.a`
    color: ${(props) => props.theme.colors.textOnBgColor} !important;
    background-color: ${(props) =>
      props.theme.colors.backgroundColor} !important;
    border-color: transparent !important;
    border-radius: 20px;
    font-weight: 500;
    cursor: pointer;
    border: 2px solid;
    text-decoration: none;
    transition: all ease 0.12s;
    padding: 5px 12px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.active {
      border-color: grey !important;
    }
    &:hover {
      border-color: darkgrey !important;
    }
  `,

  // ---------- MODAL ----------
  ModalPage: styled.div`
    width: inherit;
    min-height: 100vh;
    max-height: 100vh;
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    z-index: 100;

    &.open {
      transition: all ease 0.75s;
      left: 0px;
      z-index: 100;
    }

    &.close {
      transition: all ease-in-out 2s;
      z-index: 100;
      left: -2000px;
    }

    @media (max-height: ${mobileKeyboardHeightMax}) {
      @media (max-width: ${mobileWidthMax}) {
        display: none;
      }
    }
  `,
  ModalBackground: styled.div`
    background-color: ${(props) => props.theme.colors.modalBgColor};
    backdrop-filter: blur(3px);
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    z-index: 2;

    &.open {
      transition: all ease 0.75s;
      background-color: ${(props) => props.theme.colors.modalBgColor};
    }

    &.close {
      transition: all ease 2s;
      background-color: transparent;
    }
  `,
  ModalContainer: styled.div`
    background-color: ${(props) => props.theme.colors.sidebarBgColor};
    padding: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: -2000px;
    transform: translateY(50%);

    z-index: 3;

    &.open {
      bottom: 50%;
      transition: all ease 1.45s;
    }

    &.close {
      transition: all ease 0.75s;
      bottom: -2000px;
    }

    .close-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      color: ${(props) => props.theme.colors.textOnContainerColor};
      z-index: 4;
      cursor: pointer;
      background-color: crimson;
      border-radius: 50px;
      opacity: 0.4;
      transition: all ease 0.15s;

      &:hover {
        opacity: 1;
      }

      min-width: 30px;
      max-width: 30px;
      max-height: 30px;
      min-height: 30px;
    }

    .arrow-icon {
      position: absolute;
      color: ${(props) => props.theme.colors.textOnBgColor};
      z-index: 4;
      cursor: pointer;
      opacity: 0.4;
      transition: all ease 0.15s;
      top: 50%;
      transform: translateY(-50%);

      &:hover {
        opacity: 1;
      }

      min-width: 50px;
      max-width: 50px;
      max-height: 50px;
      min-height: 50px;

      &.back {
        left: -70px;
      }

      &.fwd {
        right: -70px;
      }
    }

    @media (min-height: ${mobileHeightMin}) {
      @media (max-width: ${mobileWidthMax}) {
        background-color: transparent;
        max-width: 75vw;
        min-width: 75vw;
        min-height: unset;
        max-height: 80vh;

        .close-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          color: ${(props) => props.theme.colors.textOnContainerColor};
          z-index: 4;
          cursor: pointer;
          background-color: crimson;
          border-radius: 50px;
          opacity: 0.4;
          transition: all ease 0.15s;

          &:hover {
            opacity: 1;
          }

          min-width: 20px;
          max-width: 20px;
          max-height: 20px;
          min-height: 20px;
        }

        .arrow-icon {
          position: absolute;
          color: ${(props) => props.theme.colors.textOnBgColor};
          z-index: 4;
          cursor: pointer;
          opacity: 0.4;
          transition: all ease 0.15s;
          top: 50%;
          transform: translateY(-50%);

          &:hover {
            opacity: 1;
          }

          min-width: 36px;
          max-width: 36px;
          max-height: 36px;
          min-height: 36px;

          &.back {
            left: -45px;
          }

          &.fwd {
            right: -45px;
          }
        }
      }
    }
  `,
  authInput: styled.input`
    background-color: transparent !important;
    color: ${(props) => props.theme.colors.textSidebarColor} !important;
    border: none;
    outline: none;
    border-bottom: solid 2px #6e6e6f !important;
    transition: all 0.15s ease;
    padding: 7px 12px;
    border-radius: 3px 3px 0px 0px !important;
    margin: 0px 10px 16px 10px;
    font-size: 18px;
    font-family: poppins, sans-serif;

    &:focus {
      background-color: ${(props) =>
        props.theme.colors.modalInputBackgroundColor} !important;
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
    }
    &.auth-input {
      &:focus {
        background-color: ${(props) =>
          props.theme.colors.inputBackgroundColor} !important;
      }
    }
  `,
  primaryColorButtonInverse: styled.button`
    color: ${(props) => props.theme.colors.textSidebarColor} !important;
    background-color: ${(props) =>
      props.theme.colors.sidebarBgColor} !important;
    border: solid 2px;
    border-color: ${(props) => props.theme.colors.primaryColorFaded} !important;
    border-radius: 50px;
    padding: 6px 15px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    transition: all ease 0.12s;
    font-family: poppins, sans-serif;

    &:focus {
      background-color: ${(props) =>
        props.theme.colors.primaryColorFaded} !important;
      color: ${(props) => props.theme.colors.textOnPrimaryColor} !important;
      border-color: transparent !important;
    }
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.primaryColor} !important;
      color: ${(props) => props.theme.colors.textOnPrimaryColor} !important;
      border-color: ${(props) => props.theme.colors.primaryColor} !important;
    }
    &.auth-button {
      .login-button-wrapper {
        min-width: 50px;
        min-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;d
      }
    }

    &.refresh-icon-container{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 12px;
      padding: 4px;

      .refresh-icon{

        max-height: 20px;
        max-width: 20px;
      }
    }
  `,

  // ---------- MISC ----------
  Loader: styled.div`
    color: ${(props) => props.theme.colors.primaryColor} !important;
  `,

  primaryColorUnderline: styled.div`
    text-decoration: underline solid 4px
      ${(props) => props.theme.colors.primaryColor} !important;
    text-underline-offset: 0.5px;
  `,

  primaryBorderColor: styled.div`
    border-color: ${(props) => props.theme.colors.primaryColor} !important;
  `,
};

export default SC;
