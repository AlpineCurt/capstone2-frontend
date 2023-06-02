import React from "react";

const ChatMessage = ({name, text, type}) => {
    if (type === "note") {
        return (
            <li><i>{text}</i></li>
        )
    } else if (type === "chat") {
        return (
            <li><b>{name}: </b>{text}</li>
        )
    }
}

export default ChatMessage;