import React from "react";
import "./Score.css";

const Score = ({username, score}) => {
    return (
        <div className="Score">
            <div className="Score-name">
                {username}
            </div>
            <div className="Score-score">
                {score}
            </div>
        </div>
    )
}

export default Score;