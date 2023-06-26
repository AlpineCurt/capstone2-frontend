/** This is currently unused. */

import React, { useState, useEffect } from "react";

import "./Timer.css";

const Timer = ({ timeRemaining }) => {

    const [ dramatic, setDramatic ] = useState(false);

    useEffect(() => {
        if (timeRemaining <= 5 && timeRemaining > 0) {
            setDramatic(true);
        } else {
            setDramatic(false);
        }
    }, [timeRemaining]);

    return (
        <div className={"Timer" + (dramatic ? " dramatic" : "")}>
            {timeRemaining}
        </div>
    );
}

export default Timer;