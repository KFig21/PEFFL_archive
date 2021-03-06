// blue imports
import {
  red_primaryColor,
  red_primaryColorFaded,
  red_textOnPrimaryColor_dark,
} from "./ThemeBase";

// dark imports
import {
  dark_backgroundColor,
  dark_textOnBgColor,
  dark_subtextOnBgColor,
  dark_tableHeaderColor,
  dark_rowHoverColor,
  dark_activeColColor,
  dark_activeColColorHeader,
  dark_tableBorderColor,
  dark_tableHeaderBgColor,
  dark_weeklyHighBorder,
  dark_weeklyHighBg,
  dark_weeklyLowBorder,
  dark_weeklyLowBg,
  dark_weeklyWinBg,
  dark_weeklyLossBg,
  dark_teampageHeaderBGcolor,
  dark_teampageHeaderTextColor,
  dark_modalBgColor,
  dark_textSidebarColor,
  dark_sidebarBgColor,
  dark_teampageHeaderBGcolorMOZ,
} from "./ThemeBase";

const darkThemeRed = {
  name: "darkThemeRed",
  type: "dark",
  accent: "Red",
  colors: {
    // core
    primaryColor: red_primaryColor,
    primaryColorFaded: red_primaryColorFaded,
    backgroundColor: dark_backgroundColor,
    textOnBgColor: dark_textOnBgColor,
    textSidebarColor: dark_textSidebarColor,
    sidebarBgColor: dark_sidebarBgColor,
    textOnPrimaryColor: red_textOnPrimaryColor_dark,
    subtextOnBgColor: dark_subtextOnBgColor,
    tableHeaderColor: dark_tableHeaderColor,
    // table
    rowHoverColor: dark_rowHoverColor,
    activeColColor: dark_activeColColor,
    activeColColorHeader: dark_activeColColorHeader,
    tableBorderColor: dark_tableBorderColor,
    tableHeaderBgColor: dark_tableHeaderBgColor,
    weeklyHighBorder: dark_weeklyHighBorder,
    weeklyHighBg: dark_weeklyHighBg,
    weeklyLowBorder: dark_weeklyLowBorder,
    weeklyLowBg: dark_weeklyLowBg,
    weeklyWinBg: dark_weeklyWinBg,
    weeklyLossBg: dark_weeklyLossBg,
    // teampage
    teampageHeaderBGcolor: dark_teampageHeaderBGcolor,
    tableHeaderColorMOZ: dark_teampageHeaderBGcolorMOZ,
    teampageHeaderTextColor: dark_teampageHeaderTextColor,
    // modal
    modalBgColor: dark_modalBgColor,
  },
};

export default darkThemeRed;
