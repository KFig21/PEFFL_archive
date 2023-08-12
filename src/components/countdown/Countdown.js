/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import SC from "../../themes/styledComponents";

export default function Countdown({ year, month, day, message, title }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(`${year}-${month}-${day}`) - +new Date();
        return {
            days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
            hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
            minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
            seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
          };
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
      const [timesUp, setTimesUp] = useState(false);
    
      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
        if(timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) setTimesUp(true)
      });
    
      const timerComponents = [];
    
      Object.keys(timeLeft).forEach((interval) => {
        let key = ""
        if(interval === 'days') key = 'days'
        if(interval === 'hours') key = 'hours'
        if(interval === 'minutes') key = 'minutes'
        if(interval === 'seconds') key = 'seconds'
        if(timeLeft[interval] === 1){
            key = key.split("")
            key.pop()
            key.join("")
        }
        timerComponents.push(
          <span className="timeslot">
            <span className="time">{timeLeft[interval]}</span> {key}
          </span>
        );
      });
      return (
        <SC.countdownContainer>
            <SC.primaryColorUnderline className="home-section-header-container">
                <h1 className="home-section-header">{title}</h1>
            </SC.primaryColorUnderline>
          {timesUp ? <h3>{message}</h3> : <div className="timer">{timerComponents}</div>}
        </SC.countdownContainer>
      );
}
