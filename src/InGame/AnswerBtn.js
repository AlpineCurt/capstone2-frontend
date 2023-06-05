import React, { useContext } from "react";
import GameContext from "../GameContext";
import "./AnswerBtn.css";

const {decodeHtml} = require("../helperFunctions.js");

const AnswerBtn = ({ text, disabled, handleSubmit }) => {

    const handleClick = (e) => {
        e.preventDefault();
        handleSubmit(e, text);
    }
    
    return (
        <button className="AnswerBtn" onClick={handleClick} disabled={disabled}>
            {decodeHtml(text)}
        </button>
    );
}

export default AnswerBtn;