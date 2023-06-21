import React, { useContext } from "react";
import StyleContext from "../StyleContext";

import "./Loser.css";

const Loser = ({name, score, avatarId}) => {

    const { Styles } = useContext(StyleContext);

    return (
        <div className="Loser">
            <div className="Loser-score">
                {score}
            </div>
            <div className="Loser-avatar">
                <div
                    className={`Results-pic Results-Loser`}
                    style={{
                        backgroundImage: Styles.avatarSprites,
                        backgroundPositionX: Styles.avatarSpritesXPos[avatarId],
                        backgroundPositionY: 0
                    }}
                >
                </div>
            </div>
            <div className="Loser-name">
                {name}
            </div>
        </div>
    );
}

export default Loser;