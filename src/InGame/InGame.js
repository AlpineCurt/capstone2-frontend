import React, { useContext, useState, useEffect, useRef } from "react";
import GameContext from "../GameContext";
import AnswerBtn from "./AnswerBtn";
import Timer from "./Timer";
import AnswerList from "./AnswerList";
import { v4 as uuid } from 'uuid';
import "./InGame.css";

const {decodeHtml} = require("../helperFunctions.js");

const InGame = () => {

    const { gameState, handleMessage, isHost } = useContext(GameContext);
    const [ansDis, setAnsDis] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(gameState.timeRemaining);
    const timerId = useRef();
    const [ showAnswers, setShowAnswers ] = useState(false);
    const [ showTimer, setShowTimer ] = useState(false);
    const roundStarted = useRef(false);
    const [ answers, setAnswers ] = useState([]);
    //const [ correctAnswer, setCorrectAnswer ] = useState("");

    const handleAnswer = (ans) => {
        setShowTimer(() => false);
        handleMessage("answer", ans);
        setAnsDis(() => true);
        roundStarted.current = false;
        resetTimer();
    }

    const handleSubmit = (e, ans) => {
        e.preventDefault();
        roundStarted.current = false;
        handleAnswer({
            answer: ans,
            timeRemaining: timeRemaining
        });
    }

    const handleNext = () => {
        handleMessage("nextQuestion");
    }

    const setSelected = (text) => {
        let ans = []
        for (let answer of answers) {
            let tempAns = {
                text: answer.text,
                selected: false
            }
            if (answer.text === text) {
                tempAns.selected = true;
            }
            ans.push(tempAns);
        }
        setAnswers([...ans]);
    }

    const showCorrectAnswer = () => {
        debugger;
        setAnswers((ans) => [...ans]);
    }

    /** Timer controls */
    const resetTimer = () => {
        clearInterval(timerId.current);
        setTimeRemaining(() => gameState.timeRemaining);
    }

    useEffect(() => {
        if (timeRemaining < 1) {
            handleAnswer({
                answer: "timeOut-33",
                timeRemaining: timeRemaining
            });
            resetTimer();
        }
    }, [timeRemaining]);

    useEffect(() => {
        // Question begins
        if (!gameState.roundFinished && !roundStarted.current) {
            let ans = []
            for (let answer of gameState.answers) {
                ans.push({text: answer, selected: false});
            }
            setAnswers([...ans]);
            setTimeout(() => {
                roundStarted.current = true;
                setShowTimer(() => true);
                setShowAnswers(true);
                timerId.current = setInterval(() => {
                    setTimeRemaining(t => t - 1);
                }, 1000);
            }, 4000);
            
        } else if (gameState.roundFinished) {
            // Server has ended round, likely all players have answered/timed out
            roundStarted.current = false;
            setShowTimer(() => false);
            resetTimer();
            if (isHost) setTimeout(() => handleNext(), 5000);
        }
        if (gameState.newQuestion) {
            setAnsDis(false);
            setShowAnswers(false);
            //setCorrectAnswer(() => null);
        }
    }, [gameState]);
    
    return (
        <div className="InGame">
            <div className="InGame-left">
                <div className="InGame-question">
                    {decodeHtml(gameState.question)}
                </div>
                <div className="InGame-timer">
                    { showTimer ? timeRemaining : null }
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