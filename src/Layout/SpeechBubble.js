import React from "react";
import "./SpeechBubble.css";

const SpeechBubble = ({text}) => {
    return (
        <div className="SpeechBubble">
            <div className="speech bottom">
                {text}
            </div>
        </div>
    );
}

export default SpeechBubble;