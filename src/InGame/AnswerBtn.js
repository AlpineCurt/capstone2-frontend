import React, { useState, useEffect } from "react";
import GameContext from "../GameContext";
import "./AnswerBtn.css";

const {decodeHtml} = require("../helperFunctions.js");

const AnswerBtn = ({ text, disabled, handleSubmit, correctAnswer, selected, setSelected }) => {

    const handleClick = (e) => {
        e.preventDefault();
        setSelected(text)
        handleSubmit(e, text);
    }

    // useEffect(() => {
    //     console.log("answer button rendered");
    // }, []);
    
    return (
        <button
            className={"AnswerBtn" +
                (correctAnswer ? " correct" : "") + 
                (selected ? " selected" : "")
                }
            onClick={handleClick}
            disabled={disabled}
        >
                {decodeHtml(text)}
        </button>
    );
}

export default AnswerBtn;