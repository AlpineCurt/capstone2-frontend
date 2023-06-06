import React, { useContext, useState, useEffect, useRef } from "react";
import GameContext from "../GameContext";
import AnswerBtn from "./AnswerBtn";
import { v4 as uuid } from 'uuid';
import "./InGame.css";

const {decodeHtml} = require("../helperFunctions.js");

const InGame = () => {

    const { gameState, handleMessage, isHost } = useContext(GameContext);
    const [ansDis, setAnsDis] = useState(false);
    const timerId = useRef();
    const [ timeRemaining, setTimeRemaining ] = useState(gameState.timeRemaining);
    const [ showAnswers, setShowAnswers ] = useState(false);
    const roundStarted = useRef(false);

    const handleAnswer = (ans) => {
        handleMessage("answer", ans);
        setAnsDis(() => true);
        resetTimer();
    }

    const handleSubmit = (e, ans) => {
        e.preventDefault();
        handleAnswer(ans);
    }

    const handleNext = () => {
        handleMessage("nextQuestion");
    }

    const resetTimer = () => {
        clearInterval(timerId.current);
        setTimeRemaining(() => gameState.timerLangth);
    }

    useEffect(() => {
        if (!gameState.roundFinished && !roundStarted.current) {
            // Question begins
            setTimeRemaining(() => gameState.timeRemaining);
            roundStarted.current = true;
            timerId.current = setInterval(() => {
                setTimeRemaining(t => t - 1);
            }, 1000);
        } else if (gameState.roundFinished) {
            // Server has ended round, likely all players have answered/timed out
            roundStarted.current = false;
            resetTimer();
            if (isHost) setTimeout(() => handleNext(), 5000);
        }

        if (gameState.newQuestion) {

            setAnsDis(false);
        }
    }, [gameState]);

    useEffect(() => {
        if (timeRemaining < 1) {
            handleAnswer("");
        }
    }, [timeRemaining]);
    
    return (
        <div className="InGame">
            <div className="InGame-left">
                <div className="InGame-question">
                    {decodeHtml(gameState.question)}
                    {gameState.roundFinished && isHost ?
                    <button onClick={handleNext}>Next</button> : null}
                </div>
                <div className="InGame-timer">
                    {timeRemaining}
                </div>
            </div>
            <div className="InGame-right">
                {gameState.answers.map((answer) => (
                    <AnswerBtn
                        text={answer}
                        disabled={ansDis}
                        handleSubmit={handleSubmit}
                        key={uuid()}
                    />
                ))}
            </div>
            
        </div>
    );
}

export default InGame;