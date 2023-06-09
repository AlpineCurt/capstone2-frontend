import React from "react";
import AnswerBtn from "./AnswerBtn";
import "./AnswerList.css";
import { v4 as uuid } from 'uuid';

const AnswerList = ({ answers, disabled, handleSubmit, correctAnswer, setSelected }) => {
    
    return (
        <div className="AnswerList">
            {answers.map((answer) => (
                <AnswerBtn
                    text={answer.text}
                    disabled={disabled}
                    key={uuid()}
                    correctAnswer={(correctAnswer === answer.text)}
                    handleSubmit={handleSubmit}
                    selected={answer.selected}
                    setSelected={setSelected}
                />
            ))}
        </div>
    );
}

export default AnswerList;