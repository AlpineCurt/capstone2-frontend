import React, { useContext } from "react";
import GameContext from "../GameContext";
import { useParams } from "react-router-dom";
import HostView from "./HostView";
import NonHostView from "./NonHostView";

import "./Lobby.css";

const Lobby = () => {

    const { isHost } = useContext(GameContext);
    const { gameId } = useParams();

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
}

export default Lobby;