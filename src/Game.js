import React, { useRef, useEffect, useState, useContext } from "react";
import GameContext from "./GameContext";
import CurrUserContext from "./CurrUserContext";
import Layout from "./Layout/Layout.js";
import { useParams } from "react-router-dom";

const Game = () => {

    const { gameId } = useParams();
    const ws = useRef(null);
    const [ gameMode, setGameMode ] = useState("lobby");
    const { currUser, setCurrUser } = useContext(CurrUserContext);
    const [ players, setPlayers ] = useState([]);
    const [ chatUpdate, setChatUpdate ] = useState({});
    const chatMsg = useRef({name: "", text: ""});
    const [ isHost, setIsHost] = useState(false);

    /** Primary handler for message from server */
    function handleGameUpdate(msg) {
        if (msg.type === "chat") {
            handleChatUpdate(msg);
        }
        else if (msg.type === "playerUpdate" || msg.type === "stateReq") {
            handlePlayerUpdate(msg.players);
        }
    }

    function handlePlayerUpdate(players) {
        players.forEach((player) => {
            if (player.isHost) {
                player.status = "Host"
            }
        });
        setPlayers([...players]);

        // Check if this user is the host
        players.forEach((player) => {
            if (player.name === currUser && player.isHost) {
                setIsHost(() => true);
            }
        });
    }

    function handleChatUpdate(msg) {
        setChatUpdate(() => msg);
    }

    useEffect(() => {
        if (!currUser) setCurrUser(() => localStorage.username);

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
            handleGameUpdate(msg);
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
                    handleMessage,  // used by MessageBox
                    chatUpdate, // used by Player
                    gameMode,  // used by Layout
                    chatMsg  // used by Player
                    }}>
                <Layout
                    players={players}
                    gameMode={gameMode}
                />
            </GameContext.Provider>
        </div>
    );
}

export default Game;