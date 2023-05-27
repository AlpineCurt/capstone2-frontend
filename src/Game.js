import React, { useRef, useEffect, useState, useContext } from "react";
import GameContext from "./GameContext";
import CurrUserContext from "./CurrUserContext";
import Lobby from "./Lobby";
import InGame from "./InGame";
import Results from "./Results";
import Layout from "./Layout/Layout.js";
import { useParams } from "react-router-dom";

const Game = () => {

    const { gameId } = useParams();
    const ws = useRef(null);
    const [ gameMode, setGameMode ] = useState("lobby");
    const { currUser, setCurrUser } = useContext(CurrUserContext);
    const [ players, setPlayers ] = useState([]);
    const [ chatUpdate, setChatUpdate ] = useState({});

    
    useEffect(() => {
        if (!currUser) setCurrUser(localStorage.username);

        // If Game already exists, get current state
        
        // Open and initialize websocket when first loaded
        ws.current = new WebSocket(`ws://localhost:3001/games/${gameId}`);
        ws.current.onopen = (evt) => {
            if (localStorage.username) {
                const data = {type: "selfjoin", data: localStorage.username};
                ws.current.send(JSON.stringify(data));
            } else {
                const data = {type: "stateReq"}
                ws.current.send(JSON.stringify(data));
            }
            
        }

        // Handler for RECEIVING MESSAGE from server
        ws.current.onmessage = (evt) => {
            const msg = JSON.parse(evt.data);
            if (msg.type === "playerUpdate") {
                setPlayers(msg.players);
            } else if (msg.type === "chat") {
                setChatUpdate({ name: msg.name, text: msg.text });
            } else if (msg.type === "stateReq") {
                setPlayers(msg.players);
            }
        }

        ws.current.onclose = (evt) => {
            if (currUser) {
                const data = {type: "selfleave", data: currUser};
                ws.current.send(JSON.stringify(data));
            }
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
                    chatUpdate,
                    gameMode }}>
                {/* <div className="GameDisplay">
                    {gameMode === "lobby" ? <Lobby />
                    : gameMode === "inGame" ? <InGame />
                    : <Results />}
                </div> */}
                <Layout />
            </GameContext.Provider>
        </div>
    );
}

export default Game;