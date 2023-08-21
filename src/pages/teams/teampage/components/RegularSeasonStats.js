/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import SC from "../../../../themes/styledComponents";
import { numberWithCommas } from "../../../../helpers/utils";

export default function RegularSeasonStats({
  team,
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
}) {
  const [perStat, setPerStat] = useState(true);
  const [schedule, setSchedule] = useState("RS");
  // STAT VARIABLES

  // regular season
  const rs_record = `${team.rs_w} - ${team.rs_l}`;
  const rs_winP = (((parseInt(team.rs_w) / (parseInt(team.rs_w) + parseInt(team.rs_l))) * 100) / 100)
    .toFixed(3)
    .toString()
    .substring(1);
  const rs_PF = numberWithCommas(parseInt(team.rs_pf));
  const rs_PPG = (Math.round(team.rs_ppg * 100) / 100).toFixed(1);
  const rs_PA = numberWithCommas(parseInt(team.rs_pa));
  const rs_PAPG = (Math.round(team.rs_papg * 100) / 100).toFixed(1);
  const rs_DIF = numberWithCommas(parseInt(team.rs_dif));
  const rs_DIFPG = (Math.round(team.rs_difpg * 100) / 100).toFixed(1);

  // PLAYOFFS
  const p_win = parseInt(team.playoffs_w) ? parseInt(team.playoffs_w) : 0
  const p_loss = parseInt(team.playoffs_l) ? parseInt(team.playoffs_l) : 0
  const p_games = p_win + p_loss 
  const playoff_record = `${p_win} - ${p_loss}`;
  const playoff_winP = (p_win + p_loss) > 0 ? (
    ((p_win / (p_win + p_loss)) * 100) /
    100
  )
    .toFixed(3)
    .toString()
    .substring(1) : ".000"
  const playoff_PF =  team.playoffs_pf ? numberWithCommas(team.playoffs_pf) : 0;
  const playoff_PPG = team.playoffs_ppg ? (Math.round(team.playoffs_ppg * 100) / 100).toFixed(1) : 0.0;
  const playoff_PA = team.playoffs_pa ? numberWithCommas(team.playoffs_pa) : 0;
  const playoff_PAPG = team.playoffs_papg ? (Math.round(team.playoffs_papg * 100) / 100).toFixed(1) : 0.0;
  const playoff_DIF = team.playoffs_dif ? numberWithCommas(team.playoffs_dif) : 0;
  const playoff_DIFPG = team.playoffs_difpg ? (Math.round(team.playoffs_difpg * 100) / 100).toFixed(1) : 0.0;
  // ALL GAMES
  const total_W = parseInt(team.rs_w) + parseInt(team.playoffs_w);
  const total_L = parseInt(team.rs_l) + parseInt(team.playoffs_l);
  const total_PF = numberWithCommas(parseInt(team.rs_pf) + parseInt(team.playoffs_pf));
  const total_PA = numberWithCommas(parseInt(team.rs_pa) + parseInt(team.playoffs_pa));
  const total_DIF = numberWithCommas(parseInt(team.rs_dif) + parseInt(team.playoffs_dif));
  const total_Games = parseInt(team.rs_w) + parseInt(team.playoffs_w) + parseInt(team.rs_l) + parseInt(team.playoffs_l);

  const ag_record = `${total_W} - ${total_L}`;
  const ag_winP = (((total_W / total_Games) * 100) / 100)
    .toFixed(3)
    .toString()
    .substring(1);
  const ag_PF = total_PF.toLocaleString();
  const ag_PPG = (Math.round((total_PF / total_Games) * 100) / 100).toFixed(1);
  const ag_PA = total_PA.toLocaleString();
  const ag_PAPG = (Math.round((total_PA / total_Games) * 100) / 100).toFixed(1);
  const ag_DIF = total_DIF.toLocaleString();
  const ag_DIFPG = (Math.round((total_DIF / total_Games) * 100) / 100).toFixed(
    1
  );

  // STAT HOOKS
  const [display_Record, setDisplay_Record] = useState(rs_record);
  const [display_WinP, setDisplay_WinP] = useState(rs_winP);
  const [display_PF, setDisplay_PF] = useState(rs_PF);
  const [display_PPG, setDisplay_PPG] = useState(rs_PPG);
  const [display_PA, setDisplay_PA] = useState(rs_PA);
  const [display_PAPG, setDisplay_PAPG] = useState(rs_PAPG);
  const [display_DIF, setDisplay_DIF] = useState(rs_DIF);
  const [display_DIFPG, setDisplay_DIFPG] = useState(rs_DIFPG);

  // MEDALS

  // REGULAR SEASON
  let rs_rankMedal =
    rs_Standings.indexOf(team.team) > -1
      ? "medal" + rs_Standings.indexOf(team.team)
      : "nomedal";
  let rs_winpMedal =
    rs_WinP.indexOf(rs_winP) > -1
      ? "medal" + rs_WinP.indexOf(rs_winP)
      : "nomedal";
  let rs_pfMedal =
    rs_PFmedals.indexOf(team.rs_pf) > -1
      ? "medal" + rs_PFmedals.indexOf(team.rs_pf)
      : "nomedal";
  let rs_paMedal =
    rs_PAmedals.indexOf(team.rs_pa) > -1
      ? "medal" + rs_PAmedals.indexOf(team.rs_pa)
      : "nomedal";
  let rs_difMedal =
    rs_DIFmedals.indexOf(team.rs_dif) > -1
      ? "medal" + rs_DIFmedals.indexOf(team.rs_dif)
      : "nomedal";
  let rs_ppgMedal =
    rs_PPGmedals.indexOf(rs_PPG) > -1
      ? "medal" + rs_PPGmedals.indexOf(rs_PPG)
      : "nomedal";
  let rs_papgMedal =
    rs_PAPGmedals.indexOf(rs_PAPG) > -1
      ? "medal" + rs_PAPGmedals.indexOf(rs_PAPG)
      : "nomedal";
  let rs_difpgMedal =
    rs_DIFPGmedals.indexOf(rs_DIFPG) > -1
      ? "medal" + rs_DIFPGmedals.indexOf(rs_DIFPG)
      : "nomedal";

  // ALL GAMES
  let ag_rankMedal =
    ag_Standings.indexOf(team.team) > -1
      ? "medal" + ag_Standings.indexOf(team.team)
      : "nomedal";
  let ag_WinpMedal =
    ag_WinP.indexOf(ag_winP) > -1
      ? "medal" + ag_WinP.indexOf(ag_winP)
      : "nomedal";
  let ag_pfMedal =
    ag_PFmedals.indexOf(total_PF) > -1
      ? "medal" + ag_PFmedals.indexOf(total_PF)
      : "nomedal";
  let ag_paMedal =
    ag_PAmedals.indexOf(total_PA) > -1
      ? "medal" + ag_PAmedals.indexOf(total_PA)
      : "nomedal";
  let ag_difMedal =
    ag_DIFmedals.indexOf(total_DIF) > -1
      ? "medal" + ag_DIFmedals.indexOf(total_DIF)
      : "nomedal";
  let ag_ppgMedal =
    ag_PPGmedals.indexOf(ag_PPG) > -1
      ? "medal" + ag_PPGmedals.indexOf(ag_PPG)
      : "nomedal";
  let ag_papgMedal =
    ag_PAPGmedals.indexOf(ag_PAPG) > -1
      ? "medal" + ag_PAPGmedals.indexOf(ag_PAPG)
      : "nomedal";
  let ag_difpgMedal =
    ag_DIFPGmedals.indexOf(ag_DIFPG) > -1
      ? "medal" + ag_DIFPGmedals.indexOf(ag_DIFPG)
      : "nomedal";

  // PLAYOFFS
  let playoff_rankMedal =
    playoff_Standings.indexOf(team.team) > -1
      ? "medal" + playoff_Standings.indexOf(team.team)
      : "nomedal";
  let playoff_WinpMedal =
    playoff_WinP.indexOf(playoff_winP) > -1
      ? "medal" + playoff_WinP.indexOf(playoff_winP)
      : "nomedal";
  let playoff_pfMedal =
    playoff_PFmedals.indexOf(team.playoffs_pf) > -1
      ? "medal" + playoff_PFmedals.indexOf(team.playoffs_pf)
      : "nomedal";
  let playoff_paMedal =
    playoff_PAmedals.indexOf(team.playoffs_pa) > -1
      ? "medal" + playoff_PAmedals.indexOf(team.playoffs_pa)
      : "nomedal";
  let playoff_difMedal =
    playoff_DIFmedals.indexOf(team.playoffs_dif) > -1
      ? "medal" + playoff_DIFmedals.indexOf(team.playoffs_dif)
      : "nomedal";
  let playoff_ppgMedal =
    playoff_PPGmedals.indexOf(playoff_PPG) > -1
      ? "medal" + playoff_PPGmedals.indexOf(playoff_PPG)
      : "nomedal";
  let playoff_papgMedal =
    playoff_PAPGmedals.indexOf(playoff_PAPG) > -1
      ? "medal" + playoff_PAPGmedals.indexOf(playoff_PAPG)
      : "nomedal";
  let playoff_difpgMedal =
    playoff_DIFPGmedals.indexOf(playoff_DIFPG) > -1
      ? "medal" + playoff_DIFPGmedals.indexOf(playoff_DIFPG)
      : "nomedal";

  const [display_PFmedal, setDisplayPFmedal] = useState(rs_pfMedal);
  const [display_PAmedal, setDisplayPAmedal] = useState(rs_paMedal);
  const [display_PPGmedal, setDisplayPPGmedal] = useState(rs_ppgMedal);
  const [display_PAPGmedal, setDisplayPAPGmedal] = useState(rs_papgMedal);
  const [display_DIFmedal, setDisplayDIFmedal] = useState(rs_difMedal);
  const [display_DIFPGmedal, setDisplayDIFPGmedal] = useState(rs_difpgMedal);
  const [display_RecordMedal, setDisplaydisplay_RecordMedal] = useState();
  const [display_WinPmedal, setDisplaydisplay_WinPmedal] = useState();

  const handleChangeSchedule = (schedule) => {
    setSchedule(schedule);
    if (schedule === "playoffs") {
      setDisplay_Record(playoff_record);
      setDisplay_WinP(playoff_winP);
      setDisplay_PF(playoff_PF);
      setDisplay_PPG(playoff_PPG);
      setDisplay_PA(playoff_PA);
      setDisplay_PAPG(playoff_PAPG);
      setDisplay_DIF(playoff_DIF);
      setDisplay_DIFPG(playoff_DIFPG);
      setDisplayPFmedal(playoff_pfMedal);
      setDisplayPAmedal(playoff_paMedal);
      setDisplayPPGmedal(playoff_ppgMedal);
      setDisplayPAPGmedal(playoff_papgMedal);
      setDisplayDIFmedal(playoff_difMedal);
      setDisplayDIFPGmedal(playoff_difpgMedal);
      setDisplaydisplay_RecordMedal(playoff_rankMedal);
      setDisplaydisplay_WinPmedal(playoff_WinpMedal);
    } else if (schedule === "AG") {
      setDisplay_Record(ag_record);
      setDisplay_WinP(ag_winP);
      setDisplay_PF(ag_PF);
      setDisplay_PPG(ag_PPG);
      setDisplay_PA(ag_PA);
      setDisplay_PAPG(ag_PAPG);
      setDisplay_DIF(ag_DIF);
      setDisplay_DIFPG(ag_DIFPG);
      setDisplayPFmedal(ag_pfMedal);
      setDisplayPAmedal(ag_paMedal);
      setDisplayPPGmedal(ag_ppgMedal);
      setDisplayPAPGmedal(ag_papgMedal);
      setDisplayDIFmedal(ag_difMedal);
      setDisplayDIFPGmedal(ag_difpgMedal);
      setDisplaydisplay_RecordMedal(ag_rankMedal);
      setDisplaydisplay_WinPmedal(ag_WinpMedal);
    } else {
      setDisplay_Record(rs_record);
      setDisplay_WinP(rs_winP);
      setDisplay_PF(rs_PF);
      setDisplay_PPG(rs_PPG);
      setDisplay_PA(rs_PA);
      setDisplay_PAPG(rs_PAPG);
      setDisplay_DIF(rs_DIF);
      setDisplay_DIFPG(rs_DIFPG);
      setDisplayPFmedal(rs_pfMedal);
      setDisplayPAmedal(rs_paMedal);
      setDisplayPPGmedal(rs_ppgMedal);
      setDisplayPAPGmedal(rs_papgMedal);
      setDisplayDIFmedal(rs_difMedal);
      setDisplayDIFPGmedal(rs_difpgMedal);
      setDisplaydisplay_RecordMedal(rs_rankMedal);
      setDisplaydisplay_WinPmedal(rs_winpMedal);
    }
  };

  useEffect(() => {
    handleChangeSchedule("RS");
  }, []);

  return (
    <div className="teampage-section-container">
      <div className="teampage-section-header-container">
        <SC.textOnBgColor>
          <div className="teampage-section-header">
            {schedule === "RS" && "REGULAR SEASON"}
            {schedule === "playoffs" && "PLAYOFFS"}
            {schedule === "AG" && "ALL GAMES"}
            <span className="section-header-subtext">
              <SC.subtextOnBgColor>
                {schedule === "RS" && `${parseInt(team.rs_w) + parseInt(team.rs_l)} GAMES`}
                {schedule === "playoffs" &&
                  `${team.playoffs_A || 0} APPEARANCES, ${p_games} GAMES`}
                {schedule === "AG" && `${total_Games} GAMES`}
              </SC.subtextOnBgColor>
            </span>
            <SC.primaryColorButton onClick={() => setPerStat(!perStat)}>
              {perStat ? "total" : "game"}
            </SC.primaryColorButton>
          </div>
        </SC.textOnBgColor>
      </div>
      {/* BUTTONS */}
      <div className="h2h-buttons-container desktop">
        <SC.primaryColorAnchorInverse
          className={schedule === "RS" ? "h2h-button active" : "h2h-button"}
          onClick={() => handleChangeSchedule("RS")}
        >
          Regular Season
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={
            schedule === "playoffs" ? "h2h-button active" : "h2h-button"
          }
          onClick={() => handleChangeSchedule("playoffs")}
        >
          Playoffs
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={schedule === "AG" ? "h2h-button active" : "h2h-button"}
          onClick={() => handleChangeSchedule("AG")}
        >
          All Games
        </SC.primaryColorAnchorInverse>
      </div>
      <div className="h2h-buttons-container mobile">
        <SC.primaryColorAnchorInverse
          className={schedule === "RS" ? "h2h-button active" : "h2h-button"}
          onClick={() => handleChangeSchedule("RS")}
        >
          Season
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={
            schedule === "playoffs" ? "h2h-button active" : "h2h-button"
          }
          onClick={() => handleChangeSchedule("playoffs")}
        >
          Playoffs
        </SC.primaryColorAnchorInverse>
        <SC.primaryColorAnchorInverse
          className={schedule === "AG" ? "h2h-button active" : "h2h-button"}
          onClick={() => handleChangeSchedule("AG")}
        >
          All
        </SC.primaryColorAnchorInverse>
      </div>
      <div className="rs-stats">
        {/* RECORD */}
        <div className="teampage-record-container">
          <SC.textOnBgColor>
            <span className="stat-title">
              {perStat ? "RECORD" : "WIN %"}
              <div
                className={`medal-small teampage ${
                  perStat ? display_RecordMedal : display_WinPmedal
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">
              {perStat ? display_Record : display_WinP}
            </div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              {perStat ? `${display_WinP} win%` : display_Record}
            </div>
          </SC.subtextOnBgColor>
        </div>
        {/* POINTS FOR */}
        <div className="teampage-record-container">
          <SC.textOnBgColor>
            <span className="stat-title">
              {perStat ? "POINTS FOR" : "POINTS/GAME"}
              <div
                className={`medal-small teampage ${
                  perStat ? display_PFmedal : display_PPGmedal
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">
              {perStat ? display_PF : display_PPG}
            </div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              {perStat ? display_PPG + " pg" : display_PF + " pts"}
            </div>
          </SC.subtextOnBgColor>
        </div>
        {/* POINTS AGAINST */}
        <div className="teampage-record-container">
          <SC.textOnBgColor>
            <span className="stat-title">
              {perStat ? "POINTS VS" : "POINTS VS/GAME"}
              <div
                className={`medal-small teampage ${
                  perStat ? display_PAmedal : display_PAPGmedal
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div className="stat-value">
              {perStat ? display_PA : display_PAPG}
            </div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              {perStat ? display_PAPG + " pg" : display_PA + " pts"}
            </div>
          </SC.subtextOnBgColor>
        </div>
        {/* PLUS MINUS */}
        <div className="teampage-record-container end-col">
          <SC.textOnBgColor>
            <span className="stat-title">
              {perStat ? "TOTAL +/-" : "+/- PER GAME"}
              <div
                className={`medal-small teampage ${
                  perStat ? display_DIFmedal : display_DIFPGmedal
                }`}
              ></div>
            </span>
          </SC.textOnBgColor>
          <SC.textOnBgColor>
            <div
              className="stat-value"
              style={{
                color: `${
                  display_DIF > 0 ? "green" : display_DIF < 0 ? "crimson" : null
                }`,
              }}
            >
              {display_DIF > 0 ? "+" : ""}
              {perStat ? display_DIF : display_DIFPG}
            </div>
          </SC.textOnBgColor>
          <SC.subtextOnBgColor>
            <div className="substat-value">
              {display_DIF > 0 ? "+" : ""}
              {perStat ? display_DIFPG : display_DIF}
            </div>
          </SC.subtextOnBgColor>
        </div>
      </div>
    </div>
  );
}
