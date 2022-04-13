import React, { useEffect, useState } from "react";
import ClassicHelmet from "./ClassicHelmet";
import VintageHelmet from "./VintageHelmet";
import "./Helmet.scss";
import ModernHelmet from "./ModernHelmet";
import { useSelector } from "react-redux";

export default function Helmet({ team, size, helmetStyle, helmetView }) {
  const user = useSelector((state) => state.user);
  const teams = useSelector((state) => state.teams);
  const [style, setStyle] = useState("classic");

  let currTeam;
  let currTeamStyle;

  const getStyle = async () => {
    currTeam = await teams.filter((team_) => team_.teamName === team)[0];
    currTeamStyle = await currTeam.helmetStyle;

    if (user.username === null) {
      if (helmetView === "uniform") {
        setStyle(helmetStyle);
      } else {
        setStyle(currTeamStyle);
      }
    } else if (user.helmetView === "custom") {
      setStyle(currTeamStyle);
    } else {
      setStyle(helmetStyle);
    }
  };

  useEffect(() => {
    getStyle();
  }, [teams, team]);

  return (
    <>
      {style === "classic" && <ClassicHelmet team={team} size={size} />}
      {style === "vintage" && <VintageHelmet team={team} size={size} />}
      {style === "modern" && <ModernHelmet team={team} size={size} />}
    </>
  );
}
