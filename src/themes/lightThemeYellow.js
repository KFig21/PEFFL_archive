// green imports
import {
  yellow_primaryColor,
  yellow_primaryColorFaded,
  yellow_textOnPrimaryColor_light,
} from "./ThemeBase";

// light imports
import {
  light_backgroundColor,
  light_textOnBgColor,
  light_subtextOnBgColor,
  light_tableHeaderColor,
  light_rowHoverColor,
  light_activeColColor,
  light_activeColColorHeader,
  light_tableBorderColor,
  light_tableHeaderBgColor,
  light_weeklyHighBorder,
  light_weeklyHighBg,
  light_weeklyLowBorder,
  light_weeklyLowBg,
  light_weeklyWinBg,
  light_weeklyLossBg,
  light_teampageHeaderBGcolor,
  light_teampageHeaderTextColor,
  light_modalBgColor,
  light_textSidebarColor,
  light_sidebarBgColor,
} from "./ThemeBase";

const lightThemeYellow = {
  name: "lightThemeYellow",
  type: "light",
  accent: "Yellow",
  colors: {
    // core
    primaryColor: yellow_primaryColor,
    primaryColorFaded: yellow_primaryColorFaded,
    backgroundColor: light_backgroundColor,
    textOnBgColor: light_textOnBgColor,
    textSidebarColor: light_textSidebarColor,
    sidebarBgColor: light_sidebarBgColor,
    textOnPrimaryColor: yellow_textOnPrimaryColor_light,
    subtextOnBgColor: light_subtextOnBgColor,
    tableHeaderColor: light_tableHeaderColor,
    // table
    rowHoverColor: light_rowHoverColor,
    activeColColor: light_activeColColor,
    activeColColorHeader: light_activeColColorHeader,
    tableBorderColor: light_tableBorderColor,
    tableHeaderBgColor: light_tableHeaderBgColor,
    weeklyHighBorder: light_weeklyHighBorder,
    weeklyHighBg: light_weeklyHighBg,
    weeklyLowBorder: light_weeklyLowBorder,
    weeklyLowBg: light_weeklyLowBg,
    weeklyWinBg: light_weeklyWinBg,
    weeklyLossBg: light_weeklyLossBg,
    // teampage
    teampageHeaderBGcolor: light_teampageHeaderBGcolor,
    teampageHeaderTextColor: light_teampageHeaderTextColor,
    // modal
    modalBgColor: light_modalBgColor,
  },
};

export default lightThemeYellow;
