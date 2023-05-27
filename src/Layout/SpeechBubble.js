import React from "react";
import "./SpeechBubble.css";

const SpeechBubble = ({text, pointing}) => {

    const point = pointing === "top" ? "SpeechBubble speech top" : "SpeechBubble speech bottom";

    return (
        <div className={point}>
            {text}
        </div>
    );
}

export default SpeechBubble;