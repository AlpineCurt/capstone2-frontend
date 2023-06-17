import React from "react";
import "./Avatar.css";


const Avatar = ({avatarId}) => {
    return (
        <div className="Avatar">
            {/* <img className="Avatar-pic" src="/pics/img_trans.jpg"/> */}
            <div className={`Avatar-pic Avatar-pic-${avatarId}`}></div>
        </div>
    );
}

export default Avatar;