/** This is currently unused. */

import React, { useState, useEffect } from "react";

import "./Timer.css";

const Timer = ({ timeRemaining, timerRunning }) => {

    const [ dramatic, setDramatic ] = useState(false);

    useEffect(() => {
        if (timeRemaining <= 5 && timeRemaining > 0 && timerRunning) {
            setDramatic(true);
        } else {
            setDramatic(false);
        }
    }, [timeRemaining, timerRunning]);

    return (
        <div className={"Timer" + (dramatic ? " dramatic" : "")}>
            {timeRemaining}
        </div>
    );
}

export default Timer;