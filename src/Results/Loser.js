import React from "react";

import "./Loser.css";

const Loser = ({name, score, avatarId}) => {
    return (
        <div className="Loser">
            <div className="Loser-score">
                {score}
            </div>
            <div className="Loser-avatar">
                <div className={`Results-pic Results-Loser Results-pic-${avatarId}`}></div>
            </div>
            <div className="Loser-name">
                {name}
            </div>
        </div>
    );
}

export default Loser;