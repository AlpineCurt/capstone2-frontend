import React, { useContext } from "react";
import GameContext from "../GameContext";
import { useParams } from "react-router-dom";
import HostView from "./HostView";
import NonHostView from "./NonHostView";

const Lobby = () => {

    const { gameState, isHost } = useContext(GameContext);
    const { gameId } = useParams();

    if (!gameState.choosingCategories) {
        return (
            <div className="Lobby">
                {isHost  ? <HostView />
                : <NonHostView />}
                {`Your game code is ${gameId}`}
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