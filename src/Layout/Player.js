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
    const chatRunning = useRef(false);
    //const spchBubTxt = useRef(null);

    useEffect(() => {
        username.current = user
    }, []);

    /** "chat" ws message type received by Game Component. */ 
    useEffect(() => {
        console.log(chatUpdate);
        //debugger;
        if (chatUpdate.name === username.current) {
            chatQueue.current.push(chatUpdate.text);
        }

        // if (chatMsg.current.name === username.current) {
        //     chatQueue.current.push(chatMsg.current);
        //     chatMsg.current = {name: "", text: ""};
        // }
        //if (chatQueue.current.length === 1) showBubble();
        // if (!spchBubTxt.current) showBubble();
        //debugger;
        if (!chatRunning.current) showBubble();
        
    }, [chatUpdate]);

    function showBubble() {
        chatRunning.current = true;
        //debugger;
        if (!chatQueue.current.length) {
            chatRunning.current = false;
            return
        };
        let msg = chatQueue.current.shift();
        setSpchBubTxt(() => msg);
        //spchBubTxt.current = msg;
        setTimeout(() => {
            setSpchBubTxt(() => null);
            //spchBubTxt.current = null;
            showBubble();
        }, 7000);
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