import React, { useContext } from "react";
import "./Avatar.css";
import StyleContext from "../StyleContext";


const Avatar = ({avatarId}) => {

    const { Styles } = useContext(StyleContext);

    return (
        <div className="Avatar">
            <div
                className={`Avatar-pic`}
                style={{
                    backgroundImage: Styles.avatarSprites,
                    backgroundPositionX: Styles.avatarSpritesXPos[avatarId],
                    backgroundPositionY: 0
                }}
            ></div>
        </div>
    );
}

export default Avatar;