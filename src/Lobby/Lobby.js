import React, { useContext } from "react";
import GameContext from "../GameContext";
import { useParams } from "react-router-dom";
import HostView from "./HostView";
import NonHostView from "./NonHostView";

import "./Lobby.css";

const Lobby = () => {

    const { gameState, isHost } = useContext(GameContext);
    const { gameId } = useParams();

    if (!gameState.choosingCategories) {
        return (
            <div className="Lobby">
                {isHost  ? <HostView />
                : <NonHostView />}
                <div className="Lobby-GameId">
                    <p className="invite">Invite your friends to join with game code:</p>
                    <p className="GameId">{gameId}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="Lobby">
                Pick a catagory!
            </div>
        )
    }
    
}

export default Lobby;