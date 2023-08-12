/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SC from "../../../../themes/styledComponents";
import axios from "axios";
import Loader from "../../../../components/loader/Loader";
import Helmet from "../../../../components/helmet/Helmet";
import { GpsNotFixedOutlined } from "@material-ui/icons";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import "../../teampage/TeamPage.scss";
import {
  getAllMatchupsMedals,
  getH2HmatchupsTeampage,
} from "../../../../helpers/apiCalls";

export default function Head2Head({ team, j_Division, helmetStyle }) {
  const [teams, setTeams] = useState([]);
  const [perStat, setPerStat] = useState(true);
  const [sortBy, setSortBy] = useState("W");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [schedule, setSchedule] = useState("RS");
  let navigate = useNavigate();
  // MATCHUP MEDALS
  const [allMatchupsWINPmedals, setAllMatchupsWINPmedals] = useState([]);
  const [allMatchupsPFmedals, setAllMatchupsPFmedals] = useState([]);
  const [allMatchupsPAmedals, setAllMatchupsPAmedals] = useState([]);
  const [allMatchupsPPGmedals, setAllMatchupsPPGmedals] = useState([]);
  const [allMatchupsPAPGmedals, setAllMatchupsPAPGmedals] = useState([]);
  const [allMatchupsDIFmedals, setAllMatchupsDIFmedals] = useState([]);
  const [allMatchupsDIFPGmedals, setAllMatchupsDIFPGmedals] = useState([]);
  const [allMatchupsTOTmedals, setAllMatchupsTOTmedals] = useState([]);
  const [allMatchupsTOTPGmedals, setAllMatchupsTOTPGmedals] = useState([]);

  const getTeams = async (column, order, table) => {
    setTeams(await getH2HmatchupsTeampage(team.team, column, order, table));
  };

  const fetchMedals = async (table) => {
    setAllMatchupsWINPmedals(await getAllMatchupsMedals(table, "WinP"));
    setAllMatchupsPFmedals(await getAllMatchupsMedals(table, "PF"));
    setAllMatchupsPAmedals(await getAllMatchupsMedals(table, "PA"));
    setAllMatchupsPPGmedals(await getAllMatchupsMedals(table, "PPG"));
    setAllMatchupsPAPGmedals(await getAllMatchupsMedals(table, "PAPG"));
    setAllMatchupsDIFmedals(await getAllMatchupsMedals(table, "DIF"));
    setAllMatchupsDIFPGmedals(await getAllMatchupsMedals(table, "DIFPG"));
    setAllMatchupsTOTmedals(await getAllMatchupsMedals(table, "TOT"));
    setAllMatchupsTOTPGmedals(await getAllMatchupsMedals(table, "TOTPG"));
  };

  const handleColumnSort = (col) => {
    if (col === sortBy) {
      if (sortOrder === "DESC") {
        setSortOrder("ASC");
        getTeams(col, "ASC", schedule);
      } else {
        setSortBy("G");
        setSortOrder("DESC");
        getTeams("G", "DESC", schedule);
      }
    } else {
      setSortBy(col);
      setSortOrder("DESC");
      getTeams(col, "DESC", schedule);
    }
  };

  const changeSchedule = (table) => {
    setSchedule(table);
    getTeams("G", "DESC", table);
    fetchMedals(table);
  };

  const switchTeams = (opp) => {
    navigate(`/teams/${opp}`);
    window.location.reload();
  };

  const handleChangePerStat = () => {
    setPerStat(!perStat);
  };

  useEffect(() => {
    fetchMedals("RS");
    setTimeout(() => {
      getTeams("G", "DESC", "RS");
    }, 250);
  }, []);

  return (
    <div className="teampage-section-container table">
      <div className="teampage-section-header-container">
        <SC.textOnBgColor>
          <div className="teampage-section-header">
            HEAD TO HEAD
            <SC.primaryColorButton onClick={() => handleChangePerStat()}>
              {perStat ? "total" : "game"}
            </SC.primaryColorButton>
          </div>
        </SC.textOnBgColor>
      </div>
      <div className="h2h-buttons-container desktop">
        <SC.primaryColorAnchorInverse
          className={schedule === "RS" ? "h2h-button active" : "h2h-button"}
          onClick={() => changeSchedule("RS")}
        >
          Regular Season
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={
            schedule === "playoffs" ? "h2h-button active" : "h2h-button"
          }
          onClick={() => changeSchedule("playoffs")}
        >
          Playoffs
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={schedule === "AG" ? "h2h-button active" : "h2h-button"}
          onClick={() => changeSchedule("AG")}
        >
          All Games
        </SC.primaryColorAnchorInverse>
      </div>
      <div className="h2h-buttons-container mobile">
        <SC.primaryColorAnchorInverse
          className={schedule === "RS" ? "h2h-button active" : "h2h-button"}
          onClick={() => changeSchedule("RS")}
        >
          Season
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={
            schedule === "playoffs" ? "h2h-button active" : "h2h-button"
          }
          onClick={() => changeSchedule("playoffs")}
        >
          Playoffs
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={schedule === "AG" ? "h2h-button active" : "h2h-button"}
          onClick={() => changeSchedule("AG")}
        >
          All
        </SC.primaryColorAnchorInverse>
      </div>
      <SC.TableContainer className="teampage-h2h-table">
        {teams.length > 0 ? (
          <table>
            <thead>
              <SC.tableHeaderBgColor className="table-header">
                <th className="desktop">Team</th>
                <th className="vs">vs</th>
                <th>Opp</th>
                <th onClick={() => handleColumnSort("W")} title="wins">
                  W
                </th>
                <th></th>
                <th onClick={() => handleColumnSort("L")} title="losses">
                  L
                </th>
                <th onClick={() => handleColumnSort("G")} title="games played">
                  G
                </th>
                <th></th>
                {/* WIN %*/}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "WinP" ? "column-header active" : "column-header"
                  }
                  title="Win%"
                  onClick={() => handleColumnSort("WinP")}
                >
                  <div className="sort-icon">
                    {sortBy === "WinP" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  Win %
                </SC.tableSortableColHeader>
                {/* POINTS FOR */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "PF" || sortBy === "PPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  title={perStat ? "points per game" : "points for"}
                  onClick={() =>
                    perStat ? handleColumnSort("PPG") : handleColumnSort("PF")
                  }
                >
                  <div className="sort-icon">
                    {sortBy === "PF" || sortBy === "PPG" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  {perStat ? "PPG" : "PF"}
                </SC.tableSortableColHeader>
                {/* POINTS AGAINST */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "PA" || sortBy === "PAPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  title={
                    perStat ? "opponents points per game" : "points against"
                  }
                  onClick={() =>
                    perStat ? handleColumnSort("PAPG") : handleColumnSort("PA")
                  }
                >
                  <div className="sort-icon">
                    {sortBy === "PA" || sortBy === "PAPG" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  {perStat ? "PAPG" : "PA"}
                </SC.tableSortableColHeader>
                {/* DIF */}
                <SC.tableSortableColHeader
                  className={
                    sortBy === "DIF" || sortBy === "DIFPG"
                      ? "column-header active"
                      : "column-header"
                  }
                  title={perStat ? "PPG - PAPG" : "PF - PA"}
                  onClick={() =>
                    perStat
                      ? handleColumnSort("DIFPG")
                      : handleColumnSort("DIF")
                  }
                >
                  <div className="sort-icon">
                    {sortBy === "DIF" || sortBy === "DIFPG" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  +/-
                </SC.tableSortableColHeader>
                <SC.tableSortableColHeader
                  className={
                    sortBy === "TOTPG" || sortBy === "TOT"
                      ? "column-header active"
                      : "column-header"
                  }
                  title={
                    perStat ? "average combined score" : "total combined points"
                  }
                  onClick={() =>
                    perStat
                      ? handleColumnSort("TOTPG")
                      : handleColumnSort("TOT")
                  }
                >
                  <div className="sort-icon">
                    {sortBy === "TOT" || sortBy === "TOTPG" ? (
                      sortOrder === "DESC" ? (
                        <ArrowDropDownRoundedIcon />
                      ) : (
                        <ArrowDropUpRoundedIcon />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  Total
                </SC.tableSortableColHeader>
              </SC.tableHeaderBgColor>
            </thead>
            <tbody>
              {teams.map((team, i) => {
                let PPG = (Math.round(team.ppg * 100) / 100).toFixed(1);
                let PAPG = (Math.round(team.papg * 100) / 100).toFixed(1);
                let DIFPG = (Math.round(team.difpg * 100) / 100).toFixed(1);
                let TOTPG = (Math.round(team.totpg * 100) / 100).toFixed(1);

                let winPercentage =
                  team.w === team.g && team.g > 0
                    ? "1.000"
                    : (((team.w / (team.w + team.l)) * 100) / 100)
                        .toFixed(3)
                        .toString()
                        .substring(1);
                // MEDALS
                let winpMedal =
                  allMatchupsWINPmedals.indexOf(winPercentage) > -1
                    ? "medal" + allMatchupsWINPmedals.indexOf(winPercentage)
                    : "nomedal";
                let pfMedal =
                  allMatchupsPFmedals.indexOf(team.pf) > -1
                    ? "medal" + allMatchupsPFmedals.indexOf(team.pf)
                    : "nomedal";
                let paMedal =
                  allMatchupsPAmedals.indexOf(team.pa) > -1
                    ? "medal" + allMatchupsPAmedals.indexOf(team.pa)
                    : "nomedal";
                let difMedal =
                  allMatchupsDIFmedals.indexOf(team.dif) > -1
                    ? "medal" + allMatchupsDIFmedals.indexOf(team.dif)
                    : "nomedal";
                let totMedal =
                  allMatchupsTOTmedals.indexOf(team.tot) > -1
                    ? "medal" + allMatchupsTOTmedals.indexOf(team.tot)
                    : "nomedal";
                let ppgMedal =
                  allMatchupsPPGmedals.indexOf(PPG) > -1
                    ? "medal" + allMatchupsPPGmedals.indexOf(PPG)
                    : "nomedal";
                let papgMedal =
                  allMatchupsPAPGmedals.indexOf(PAPG) > -1
                    ? "medal" + allMatchupsPAPGmedals.indexOf(PAPG)
                    : "nomedal";
                let difpgMedal =
                  allMatchupsDIFPGmedals.indexOf(DIFPG) > -1
                    ? "medal" + allMatchupsDIFPGmedals.indexOf(DIFPG)
                    : "nomedal";
                let totpgMedal =
                  allMatchupsTOTPGmedals.indexOf(TOTPG) > -1
                    ? "medal" + allMatchupsTOTPGmedals.indexOf(TOTPG)
                    : "nomedal";

                let division = j_Division.includes(team.opp)
                  ? "j_Division"
                  : "f_Division";
                let difFormat =
                  team.dif > 0 ? "green" : team.dif < 0 ? "crimson" : null;

                return (
                  <SC.tableBorderColorTR className="h2h-team-row" key={i}>
                    {/* TEAM */}
                    <td className="h2h-team active-helmet desktop">
                      <Helmet
                        team={team.team}
                        size={"standings"}
                        helmetStyle={helmetStyle}
                      />
                    </td>
                    {/* VS */}
                    <td className="standings-col record-col dash-col vs">
                      <SC.textOnBgColor> vs </SC.textOnBgColor>{" "}
                    </td>
                    {/* OPPONENT */}
                    <td
                      className="h2h-opp"
                      onClick={() => switchTeams(team.opp)}
                    >
                      <div className="mirror-helmet ">
                        <Helmet
                          team={team.opp}
                          size={"standings"}
                          helmetStyle={helmetStyle}
                        />
                      </div>
                      <div className="records-team-name">
                        <SC.textOnBgColor className="standings-team-name">
                          {team.opp}
                        </SC.textOnBgColor>
                      </div>
                      <div className={`records-${division}`}></div>
                    </td>
                    {/* WINS */}
                    <td className="standings-col record-col">
                      <SC.textOnBgColor>{team.w}</SC.textOnBgColor>
                    </td>
                    {/* DASH */}
                    <td className="standings-col record-col dash-col">
                      <SC.textOnBgColor> - </SC.textOnBgColor>{" "}
                    </td>
                    {/* LOSSES */}
                    <td className="standings-col record-col">
                      <SC.textOnBgColor>{team.l}</SC.textOnBgColor>
                    </td>
                    {/* GAMES BACK */}
                    <SC.tableBorderColorTD className="standings-col gb-col">
                      <SC.subtextOnBgColor>{team.g}</SC.subtextOnBgColor>
                    </SC.tableBorderColorTD>
                    {/* link to H2H */}
                    <td className="standings-col h2h-link-col">
                      <Link to={`/h2h/${team.team}/${team.opp}`}>
                        <SC.subtextOnBgColor>
                          <span>
                            <GpsNotFixedOutlined />
                          </span>
                        </SC.subtextOnBgColor>
                      </Link>
                    </td>
                    {/* WIN % */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "WinP"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points">
                        <div className="standings-ppg">
                          <SC.textOnBgColor>
                            {winPercentage}
                            <div className={`medal-small ${winpMedal}`}></div>
                          </SC.textOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* POINTS FOR */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "PF" || sortBy === "PPG"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points">
                        <div className="standings-ppg">
                          <SC.textOnBgColor>
                            {perStat ? PPG : team.pf.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? ppgMedal : pfMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? team.pf.toLocaleString() : PPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* POINTS AGAINST */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "PA" || sortBy === "PAPG"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points ">
                        <div className="standings-ppg">
                          <SC.textOnBgColor>
                            {perStat ? PAPG : team.pa.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? papgMedal : paMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? team.pa.toLocaleString() : PAPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* PLUS MINUS */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "DIF" || sortBy === "DIFPG"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points ">
                        <div
                          className="standings-ppg"
                          style={{ color: `${difFormat}` }}
                        >
                          {perStat ? DIFPG : team.dif.toLocaleString()}
                          <div
                            className={`medal-small ${
                              perStat ? difpgMedal : difMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? team.dif.toLocaleString() : DIFPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                    {/* COMBINED */}
                    <SC.tableSortableCol
                      className={
                        sortBy === "TOT" || sortBy === "TOTPG"
                          ? "standings-col points-col active"
                          : "standings-col points-col"
                      }
                    >
                      <div className="standings-points ">
                        <div className="standings-ppg">
                          <SC.textOnBgColor>
                            {perStat ? TOTPG : team.tot.toLocaleString()}
                          </SC.textOnBgColor>
                          <div
                            className={`medal-small ${
                              perStat ? totpgMedal : totMedal
                            }`}
                          ></div>
                        </div>
                        <div className="standings-total-points">
                          <SC.subtextOnBgColor>
                            {perStat ? team.tot.toLocaleString() : TOTPG}
                          </SC.subtextOnBgColor>
                        </div>
                      </div>
                    </SC.tableSortableCol>
                  </SC.tableBorderColorTR>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Loader type={"full-screen"} />
        )}
      </SC.TableContainer>
    </div>
  );
}
