import React, { useEffect, useState } from "react";
import Player from "./Player";
import MessageBox from "./MessageBox";
import { useContext } from "react";
import GameContext from "../GameContext";

import "./Layout.css";

const Layout = () => {

    const { players } = useContext(GameContext);
    const [playersTop, setPlayersTop] = useState([]);
    const [playersBottom, setPlayersBottom] = useState([]);
    const [playersLeft, setPlayersLeft] = useState([]);
    const [playersRight, setPlayersRight] = useState([]);
    

    useEffect(() => {
        for (let i in players) {
            let position;
            if (i === "0") setPlayersTop([players[0]]);
            else if (i === "1") setPlayersBottom([players[1]]);
            else if (i === "2") setPlayersRight([players[2]]);
            else if (i === "3") setPlayersLeft([players[3]]);
            else if (i === "4") setPlayersTop((p) => [...p, players[4]]);
            else if (i === "5") setPlayersBottom((p) => [players[5], ...p]);
            else if (i === "6") setPlayersRight((p) => [players[6], ...p]);
            else if (i === "7") setPlayersLeft((p) => [...p, players[7]]);
            else if (i === "8") setPlayersRight((p) => [...p, players[8]]);
            else if (i === "9") setPlayersTop((p) => [players[9], ...p]);
        }
    }, [players]);


    return (
        <div className="Layout">
            <div className="Layout-top">
                {playersTop.map(({name}) => (
                    <Player 
                        user={name}
                    />
                ))}
            </div>
            <div className="Layout-mid">
                <div className="Layout-left">
                    {playersLeft.map(({name}) => (
                        <Player 
                            user={name}
                        />
                    ))}
                </div>
                <div className="Layout-GameView">
                    Layout-GameView
                </div>
                <div className="Layout-right">
                    {playersRight.map(({name}) => (
                        <Player 
                            user={name}
                        />
                    ))}
                </div>
            </div>
            <div className="Layout-bottom">
                {playersBottom.map(({name}) => (
                    <Player 
                        user={name}
                    />
                ))}
            </div>
            <div className="Layout-MessageBox">
                <MessageBox />
            </div>
        </div>
    );
}

export default Layout;