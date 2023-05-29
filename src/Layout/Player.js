import React, { useEffect, useRef, useContext, useState } from "react";
import Avatar from "./Avatar";
import SpeechBubble from "./SpeechBubble";
import { Card, CardTitle, CardText } from "reactstrap";
import "./Player.css";
import GameContext from "../GameContext";

const Player = ({user, location, status=""}) => {

    const { chatUpdate, chatMsg } = useContext(GameContext);
    const username = useRef(user);
    const chatQueue = useRef([]);
    const [ spchBubTxt, setSpchBubTxt ] = useState(null);
    //const spchBubTxt = useRef(null);

    useEffect(() => {
        username.current = user
    }, []);

    /** "chat" ws message type received by Game Component.
     * This is unnecessarily convoluted because it contains
     * the remnants of a currently abandoned feature.*/ 
    useEffect(() => {
        if (chatMsg.current.name === username.current) {
            chatQueue.current.push(chatMsg.current);
            chatMsg.current = {name: null, text: null};
        }
        if (chatQueue.current.length) showBubble();
        
    }, [chatUpdate]);

    function showBubble() {
        if (!chatQueue.current.length) return;
        let msg = chatQueue.current.shift();
        setSpchBubTxt(() => msg.text);
        setTimeout(() => {
            setSpchBubTxt(() => null);
            showBubble();
        }, 4000);
    }

    const classNameString = `Player-Card ${location}`;

    return (
        <Card className={classNameString}>
            <CardText className="Player-Card-status">
                {status}
            </CardText>
            <CardTitle className="Player-Card-username">
                {username.current}
            </CardTitle>
            <Avatar />
            {spchBubTxt ? <SpeechBubble pointing="top" text={spchBubTxt}/> : null}
            {/* <SpeechBubble pointing="top" text={"We need a test sentence here i kan spel gud!"}/> */}
        </Card>
    );    
}

export default Player;