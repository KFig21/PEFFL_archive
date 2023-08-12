/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Helmet from "../../../components/helmet/Helmet";
import Loader from "../../../components/loader/Loader";
import { getTeamStats, getTeamStats2 } from "../../../helpers/apiCalls";
import SC from "../../../themes/styledComponents";
import Awards from "./components/Awards";
import Head2Head from "./components/Head2Head";
import RegularSeasonStats from "./components/RegularSeasonStats";
import Seasons from "./components/Seasons";
import WeeklyAwards from "./components/WeeklyAwards";
import "./TeamPage.scss";

export default function TeamPage({
  setCurrentPage,
  j_Division,
  helmetStyle,
  helmetView,
  rs_Standings,
  rs_WinP,
  rs_PFmedals,
  rs_PAmedals,
  rs_PPGmedals,
  rs_PAPGmedals,
  rs_DIFmedals,
  rs_DIFPGmedals,
  playoff_Standings,
  playoff_Wins,
  playoff_WinP,
  playoff_PFmedals,
  playoff_PAmedals,
  playoff_PPGmedals,
  playoff_PAPGmedals,
  playoff_DIFmedals,
  playoff_DIFPGmedals,
  ag_Standings,
  ag_Wins,
  ag_WinP,
  ag_PFmedals,
  ag_PAmedals,
  ag_PPGmedals,
  ag_PAPGmedals,
  ag_DIFmedals,
  ag_DIFPGmedals,
  weeksMostPFmedals,
  weeksMostPAmedals,
  weeksLeastPFmedals,
  weeksLeastPAmedals,
}) {
  const teamParam = useParams("team");
  const [team, setTeam] = useState({});
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.user);

  const getTeam = async () => {
    let fetchedTeam = await getTeamStats(teamParam.team);
    setTeam(fetchedTeam);
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  useEffect(() => {
    getTeam();
  }, []);

  useEffect(() => {
    if (teamParam.team === user.username) {
      setCurrentPage("myteam");
    } else {
      setCurrentPage("teams");
    }
  }, [team]);

  return (
    <div className="teampage-page">
      <SC.teampageHeader className="page-header" id="header">
        <div className="header-wrapper" id="wrapper">
          {loaded ? (
            <>
              <div
                className="helmet-header-container active-helmet"
                id="helmet"
              >
                <Helmet
                  team={team.team}
                  size={"teampage"}
                  helmetStyle={helmetStyle}
                  helmetView={helmetView}
                />
              </div>
              <span id="header">{team.team}</span>
            </>
          ) : (
            <>
              <div
                className="helmet-header-container active-helmet"
                id="helmet"
              >
                <Helmet
                  team={"loading"}
                  size={"teampage"}
                  helmetStyle={helmetStyle}
                  helmetView={helmetView}
                />
              </div>
              <span id="header">loading</span>
            </>
          )}
        </div>
      </SC.teampageHeader>
      {loaded ? (
        <div className="teampage-content">
          <RegularSeasonStats
            team={team}
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
          />
          <br />
          <Awards team={team} j_Division={j_Division} />
          <br />
          <WeeklyAwards
            team={team}
            weeksMostPFmedals={weeksMostPFmedals}
            weeksMostPAmedals={weeksMostPAmedals}
            weeksLeastPFmedals={weeksLeastPFmedals}
            weeksLeastPAmedals={weeksLeastPAmedals}
          />
          <br />
          <br />
          <Seasons team={team} j_Division={j_Division} />
          <br />
          <br />
          <Head2Head
            team={team}
            j_Division={j_Division}
            helmetStyle={helmetStyle}
          />
          <br />
          <br />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
