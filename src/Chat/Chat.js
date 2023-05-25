import React from "react";
import Player from "./Player";
import MessageBox from "./MessageBox";
import { useContext } from "react";
import GameContext from "../GameContext";

import "./Chat.css";

const Chat = () => {

    const { players } = useContext(GameContext);

    return (
        <div className="Chat">
            <div className="PlayerGroup">
                {players.map(({name}) => (
                    <Player
                        user={name} />
                ))}
            </div>
            <MessageBox />
        </div>
    );
}

export default Chat;