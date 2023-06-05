import React, { useContext, useState, useEffect } from "react";
import GameContext from "../GameContext";
import AnswerBtn from "./AnswerBtn";
import { v4 as uuid } from 'uuid';
import "./InGame.css";

const {decodeHtml} = require("../helperFunctions.js");

const InGame = () => {

    const { gameState, handleMessage, isHost } = useContext(GameContext);
    const [ansDis, setAnsDis] = useState(false);

    const handleSubmit = (e, ans) => {
        e.preventDefault();
        handleMessage(e, "answer", ans);
        setAnsDis(true);
    }

    const handleNext = (e) => {
        e.preventDefault();
        handleMessage(e, "nextQuestion");
    }
    
    return (
        <div className="InGame">
            <div className="InGame-left">
                <div className="InGame-question">
                    {decodeHtml(gameState.question)}
                    {gameState.roundFinished && isHost ?
                    <button onClick={handleNext}>Next</button> : null}
                </div>
                <div className="InGame-timer">
                    45
                </div>
            </div>
            <div className="InGame-right">
                {gameState.answers.map((answer) => (
                    <AnswerBtn
                        text={answer}
                        //disabled={ansDis}
                        handleSubmit={handleSubmit}
                        key={uuid()}
                    />
                ))}
            </div>
            
        </div>
    );
}

export default InGame;