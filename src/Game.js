import React, { useRef, useEffect, useState, useContext } from "react";
import GameContext from "./GameContext";
import CurrUserContext from "./CurrUserContext";
import Layout from "./Layout/Layout.js";
import { useParams } from "react-router-dom";
import MessageBox from "./Layout/MessageBox";
import "./Game.css";

const Game = () => {

    const { gameId } = useParams();
    const ws = useRef(null);
    const { currUser, setCurrUser } = useContext(CurrUserContext);
    const [ players, setPlayers ] = useState([]);
    const [ chatUpdate, setChatUpdate ] = useState(false);
    const chatMsg = useRef({name: null, text: null});
    const [ isHost, setIsHost] = useState(false);
    const [ chatMessages, setChatMessages ] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [ gameState, setGameState ] = useState({
        phase: "lobby",
        choosingCategories: false
    });

    /** Primary handler for message from server */
    function handleGameUpdate(msg) {
        if (msg.type === "chat") {
            handleChatUpdate(msg);
        } else if (msg.type === "gameStateUpdate") {
            handleGameStateUpdate(msg);
        } else if (msg.type === "timerRequest") {
            handleMessage("timerUpdate", timeRemaining);
        }
    }

    function handleGameStateUpdate(msg) {
        setGameState(() => ({...msg.state}));
        if (msg.state.phase === "lobby") {
            msg.players.forEach((player) => {
                if (player.isHost) {
                    player.status = "Host"
                }
            });
        }
        setPlayers([...msg.players]);

        // Check if this user is the host
        msg.players.forEach((player) => {
            if (player.name === currUser && player.isHost) {
                setIsHost(() => true);
            }
        });
    }

    function handleChatUpdate(msg) {
        chatMsg.current = msg;
        setChatUpdate((chat) => !chat);
        setChatMessages((oldMess) => [...oldMess, msg])
        
    }

    useEffect(() => {
        if (!currUser) setCurrUser(() => localStorage.username);
        
        // Open and initialize websocket when first loaded
        if (localStorage.username) {
            ws.current = new WebSocket(`ws://localhost:3001/games/${gameId}?username=${localStorage.username}`);
        } else {
            ws.current = new WebSocket(`ws://localhost:3001/games/${gameId}`);
        }
        
        ws.current.onopen = (evt) => {
            // Get current state of Game
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
    const handleMessage = (type, payload) => {
        const data = {
            type: type,
            data: payload
        }
        ws.current.send(JSON.stringify(data));
    }

    const testPlayers = [
        {
            name: "Derp",
            isHost: false,
            score: 45,
            status: "",
            avatarId: 0
        },
        {
            name: "Herp",
            isHost: false,
            score: -10,
            status: "",
            avatarId: 1
        },
        {
            name: "Slurp",
            isHost: true,
            score: 30,
            status: "",
            avatarId: 2
        },
        {
            name: "Steve",
            isHost: false,
            score: 80,
            status: "",
            avatarId: 3
        },
        {
            name: "Barry",
            isHost: false,
            score: 55,
            status: "",
            avatarId: 4
        }
    ];

    return (
        <div className="Game">
            <GameContext.Provider value={{
                handleMessage,  // used by MessageBox InGame
                chatUpdate, // used by Player
                chatMsg,  // used by Player
                gameState, // used by multiple
                isHost, // used by Lobby
                timeRemaining, // used by InGame
                setTimeRemaining // used by InGame
                }}>
                <Layout
                    players={players}
                    //players={testPlayers}
                    gameMode={gameState.phase}
                />
                <MessageBox messages={chatMessages}/>
            </GameContext.Provider>
        </div>
    );
}

export default Game;