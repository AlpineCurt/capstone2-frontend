import React, { useState, useEffect, useRef } from "react";

import "./Timer.css";

const Timer = ({ counting, startingTime, handleAnswer, timeRemaining, setTimeRemaining }) => {

    //const [timeRemaining, setTimeRemaining] = useState(startingTime);
    const timerId = useRef();

    const resetTimer = () => {
        clearInterval(timerId.current);
        setTimeRemaining(() => startingTime);
    }

    useEffect(() => {
        //debugger;
        if (counting) {
            timerId.current = setInterval(() => {
                console.log(timerId.current);
                setTimeRemaining(t => t - 1);
            }, 1000);
        } else {
            resetTimer();
        }
    }, [counting]);

    useEffect(() => {
        if (timeRemaining < 1) {
            handleAnswer({
                answer: "timeOut-33",
                timeRemaining: timeRemaining
            });
            resetTimer();
        }
        
    }, [timeRemaining]);

    return (
        <div className="Timer">
            {timeRemaining}
        </div>
    );
}

export default Timer;