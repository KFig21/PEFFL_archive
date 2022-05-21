import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teams.scss";
import AllTeams from "./components/AllTeams";

export default function Teams({
  setCurrentPage,
  j_Division,
  helmetStyle,
  helmetView,
}) {
  useEffect(() => {
    setCurrentPage("teams");
  }, []);

  return (
    <div>
      <AllTeams
        j_Division={j_Division}
        helmetStyle={helmetStyle}
        helmetView={helmetView}
      />
    </div>
  );
}
