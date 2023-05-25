import React, { useRef, useEffect, useState, useContext } from "react";
import GameContext from "./GameContext";
import CurrUserContext from "./CurrUserContext";
import Lobby from "./Lobby";
import InGame from "./InGame";
import Results from "./Results";
import Chat from "./Chat/Chat.js";
import { useParams } from "react-router-dom";

import "./Game.css";

const Game = () => {

    const { gameId } = useParams();
    const ws = useRef(null);
    const [ gameMode, setGameMode ] = useState("lobby");
    const { currUser } = useContext(CurrUserContext);
    const username = useRef(null);
    const [ players, setPlayers ] = useState([]);
    const [ chatUpdate, setChatUpdate ] = useState({});

    // Open and initialize websocket when first loaded
    useEffect(() => {
        username.current = currUser;

        ws.current = new WebSocket(`ws://localhost:3001/games/${gameId}`);
        
        ws.current.onopen = (evt) => {
            const data = {type: "selfjoin", data: username.current};
            ws.current.send(JSON.stringify(data));
        }

        // Handler for RECEIVING MESSAGE from server
        ws.current.onmessage = (evt) => {
            const msg = JSON.parse(evt.data);

            if (msg.type === "playerUpdate") {
                setPlayers(msg.players);
            } else if (msg.type === "chat") {
                setChatUpdate({ name: msg.name, text: msg.text });
            }
            //debugger;
        }

        ws.current.onclose = (evt) => {
            const data = {type: "selfleave", data: username.current};
            ws.current.send(JSON.stringify(data));
        }
    }, []);

    /** Handler for SENDING MESSAGE to server.
     *  Provided as context via GameContext*/ 
    const handleMessage = (evt, type, payload) => {
        evt.preventDefault();
        const data = {
            type: type,
            data: payload
        }
        ws.current.send(JSON.stringify(data));
    }

    return (
        <div className="Game">
            <GameContext.Provider value={{
                    handleMessage,
                    players,
                    chatUpdate }}>
                <div className="GameDisplay">
                    {gameMode === "lobby" ? <Lobby />
                    : gameMode === "inGame" ? <InGame />
                    : <Results />}
                </div>
                <Chat />
            </GameContext.Provider>
        </div>
    );
}

export default Game;