import React from "react";

import "./Winner.css";

const Winner = ({name, score, avatarId}) => {
    return (
        <div className="Winner">
            <div className="Winner-winText">
                Winner!
            </div>
            <div className="Winner-winPlayer">
                <div className="Winner-score">
                    {score}
                </div>
                <div className="Winner-avatar">
                    <div className={`Results-pic Results-Winner Results-pic-${avatarId}`}></div>
                </div>
                <div className="Winner-name">
                    {name}
                </div>
            </div>
            
        </div>
    );
}

export default Winner;