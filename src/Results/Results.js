import React, { useState, useEffect, useContext } from "react";
import GameContext from "../GameContext";
import Winner from "./Winner.js";
import Loser from "./Loser.js";
import { v4 as uuid } from 'uuid';

import "./Results.css";

const Results = ({players}) => {

    const { isHost, handleMessage } = useContext(GameContext);
    const [winner, setWinner] = useState({});
    const [losers, setLosers] = useState([]);

    useEffect(() => {
        const playersCopy = [...players];
        playersCopy.sort((a, b) => b.score - a.score);
        setWinner(playersCopy.shift());
        setLosers([...playersCopy]);
    }, []);

    const resetGame = () => {
        handleMessage("resetGame");
    }

    return (
        <div className="Results">
            <div className="Results-winner">
                <Winner
                    name={winner.name}
                    score={winner.score}
                    avatarId={winner.avatarId}
                />
            </div>
            <div className="Results-losers">
                {losers.map(player => (
                    <Loser
                        name={player.name}
                        score={player.score}
                        avatarId={player.avatarId}
                        key={uuid()}
                    />
                ))}
            </div>
            {isHost &&
                <div>
                    <button onClick={resetGame}>Play Again?</button>
                </div>
            }
        </div>
    );
}

export default Results;