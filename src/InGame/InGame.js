import React, { useContext, useState, useEffect, useRef } from "react";
import GameContext from "../GameContext";
import AnswerList from "./AnswerList";
import Timer from "./Timer";
import "./InGame.css";

const {decodeHtml} = require("../helperFunctions.js");

const InGame = () => {

    const { gameState, handleMessage, isHost, timeRemaining, setTimeRemaining } = useContext(GameContext);
    const [ansDis, setAnsDis] = useState(false);
    const timerId = useRef();
    const [ showAnswers, setShowAnswers ] = useState(false);
    const [ showTimer, setShowTimer ] = useState(false);
    const [ answers, setAnswers ] = useState([]);
    const [ correctAnswer, setCorrectAnswer ] = useState("");
    const [ didAnswer, setDidAnswer ] = useState(false);

    const handleAnswer = (ans) => {
        setDidAnswer(() => true);
        handleMessage("answer", ans);
        setAnsDis(() => true);
    }

    const handleSubmit = (e, ans) => {
        e.preventDefault();
        handleAnswer({
            answer: ans,
            timeRemaining: timeRemaining
        });
    }

    const setSelected = (text) => {
        let ans = []
        for (let answer of answers) {
            let tempAns = {
                text: answer.text,
                selected: "notSelected"
            }
            if (answer.text === text) {
                tempAns.selected = "selected";
            }
            ans.push(tempAns);
        }
        setAnswers([...ans]);
    }

    /** Timer controls */
    const resetTimer = () => {
        clearInterval(timerId.current);
        setDidAnswer(() => false);
    }

    useEffect(() => {
        if (timeRemaining < 1) {
            if (!didAnswer) {
                handleAnswer({
                    answer: "timeOut-33",
                    timeRemaining: timeRemaining
                });
            }
            clearInterval(timerId.current);
        }
        if (isHost) {
            // if host, update server with timer count
            handleMessage("timerUpdate", timeRemaining);
        }
    }, [timeRemaining]);

    useEffect(() => {
        // Question begins
        if (gameState.questionBegins) {
            let ans = []
            for (let answer of gameState.answers) {
                ans.push({text: answer, selected: "waiting"});
            }
            setAnswers([...ans]);
            setShowTimer(() => false);
            setTimeRemaining(() => gameState.timeRemaining);
            setTimeout(() => {
                setShowTimer(() => true);
                setShowAnswers(true);
                timerId.current = setInterval(() => {
                    setTimeRemaining(t => t - 1);
                    
                }, 1000);
            }, 4000);
            
        } else if (gameState.roundFinished) {
            // Server has ended round, likely all players have answered/timed out
            resetTimer();
        }
        if (gameState.newQuestion) {
            setAnsDis(false);
            setShowAnswers(false);
            setCorrectAnswer(() => null);
        }
    }, [gameState]);
    
    return (
        <div className="InGame">
            <div className="InGame-left">
                <div className="InGame-question">
                    {decodeHtml(gameState.question)}
                </div>
                <div className="InGame-timer">
                    { showTimer && <Timer timeRemaining={timeRemaining}/> }
                </div>
            </div>
            <div className="InGame-right">
                {showAnswers ?
                    <AnswerList
                        answers={answers}
                        disabled={ansDis}
                        correctAnswer={gameState.correctAnswer}
                        handleSubmit={handleSubmit}
                        setSelected={setSelected}
                    />
                : null}
            </div>
            
        </div>
    );
}

export default InGame;