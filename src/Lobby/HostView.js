import React, { useContext } from "react";
import GameContext from "../GameContext";
import "./Lobby.css";

const HostView = () => {

    const { handleMessage } = useContext(GameContext);

    const handleBeginGame = (e) => {
        e.preventDefault();
        handleMessage("begingame");
    }

    return (
        <div className="HostView">
            <p className="beginText">Click "Begin Game" when all players are present!</p>
            <button
                className="button-jittery Lobby-button"
                onClick={handleBeginGame}
            >
                Begin Game
            </button>
        </div>
    );
}

export default HostView;