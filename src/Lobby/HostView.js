import React, { useContext } from "react";
import GameContext from "../GameContext";
import { Button } from "reactstrap";

const HostView = () => {

    const { handleMessage } = useContext(GameContext);

    const handleBeginGame = (e) => {
        e.preventDefault();
        handleMessage("begingame");
    }

    return (
        <div className="Layout-HostView">
            <p>Click "Begin Game" when all players are present!</p>
            <Button onClick={handleBeginGame}>Begin Game</Button>
        </div>
    );
}

export default HostView;