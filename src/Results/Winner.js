import React, { useContext } from "react";
import StyleContext from "../StyleContext";

import "./Winner.css";

const Winner = ({name, score, avatarId}) => {

    const { Styles } = useContext(StyleContext);

    return (
        <div className="Winner">
            <div className="Winner-winText">
                <span style={{"--i": 1}}>W</span>
                <span style={{"--i": 2}}>i</span>
                <span style={{"--i": 3}}>n</span>
                <span style={{"--i": 4}}>n</span>
                <span style={{"--i": 5}}>e</span>
                <span style={{"--i": 6}}>r</span>
                <span style={{"--i": 7}}>!</span>
            </div>
            <div className="Winner-winPlayer">
                <div className="Winner-score">
                    {score}
                </div>
                <div className="Winner-avatar">
                    <div
                        className={`Results-pic Results-Winner`}
                        style={{
                            backgroundImage: Styles.avatarSprites,
                            backgroundPositionX: Styles.avatarSpritesXPos[avatarId],
                            backgroundPositionY: 0
                        }}
                    >
                    </div>
                </div>
                <div className="Winner-name">
                    {name}
                </div>
            </div>
            
        </div>
    );
}

export default Winner;