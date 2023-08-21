import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teams.scss";
import AllTeams from "./components/AllTeams";
import SC from "../../themes/styledComponents";

export default function Teams({
  setCurrentPage,
  j_Division,
  helmetStyle,
  helmetView,
}) {
  const [perStat, setPerStat] = useState(true);
  useEffect(() => {
    setCurrentPage("teams");
  }, []);

  return (
    <div style={{maxHeight: "inherit", overflowY: "hidden"}}>
        <SC.teampageHeader className="page-header">
        <div className="teampage-section-header">
          All Teams
          <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
            {perStat ? "total" : "game"}
          </SC.primaryColorButton>
        </div>
      </SC.teampageHeader>
      <AllTeams
        j_Division={j_Division}
        helmetStyle={helmetStyle}
        helmetView={helmetView}
        perStat={perStat}
        setPerStat={setPerStat}
      />
    </div>
  );
}
