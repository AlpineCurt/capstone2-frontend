import React, { useEffect, useRef, useContext, useState } from "react";
import Avatar from "./Avatar";
import SpeechBubble from "./SpeechBubble";
import { Card, CardTitle } from "reactstrap";
import "./Player.css";
import GameContext from "../GameContext";

const Player = ({user}) => {

    const { chatUpdate } = useContext(GameContext);
    const username = useRef(user);
    const chatQueue = useRef([]);
    const timerId = useRef();
    const [spchBubTxt, setSpchBubTxt] = useState("");

    useEffect(() => {
        username.current = user
    }, []);

    /** "chat" ws message type received by Game Component. */ 
    useEffect(() => {
        if (chatUpdate.name === username.current) {
            chatQueue.current.push(chatUpdate);
        }
        if (spchBubTxt === "") showBubble();
    }, [chatUpdate]);

    function showBubble() {
        if (!chatQueue.current.length) return;
        let msg = chatQueue.current.shift();
        setSpchBubTxt(msg.text);
        setTimeout(() => {
            setSpchBubTxt("");
            showBubble();
        }, 6000);
    }

    return (
        <Card className="Player-Card">
            {spchBubTxt ? <SpeechBubble text={spchBubTxt}/> : null}
            <Avatar />
            <CardTitle>
                {user}
            </CardTitle>
        </Card>
    );
}

export default Player;