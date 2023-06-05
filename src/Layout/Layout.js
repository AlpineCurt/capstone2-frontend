import React from "react";
import Player from "./Player";
import MessageBox from "./MessageBox";
import { v4 as uuid } from 'uuid';
import Lobby from "../Lobby/Lobby.js";
import InGame from "../InGame/InGame.js";
import Results from "../Results.js";

import "./Layout.css";

const Layout = ({players, gameMode}) => {

    function distributePlayers (players_dist, loc) {
        /** Takes array of "players" prop, location we want them to 
         * appear in "loc", and returns array of Player components.
         * Assigns className to the component for styling.
         */
        const location = {
            top: {
                indeces: new Set([0, 3, 6]),
                className: "topBottom"
            },
            bottom: {
                indeces: new Set([]),
                className: "topBottom"
            },
            left: {
                indeces: new Set([2, 5, 7]),
                className: "leftRight"
            },
            right: {
                indeces: new Set([1, 4, 8]),
                className: "leftRight"
            },
        }
        let arr = [];
        players_dist.forEach((player, idx) => {
            if (location[loc].indeces.has(idx)) {
                arr.push(<Player 
                    user={player.name}
                    location={`Player-Card-${location[loc].className}`}
                    key={uuid()}
                    status={player.status}
                    score={player.score}
                />);
            }
        });
        return arr;
    }

    return (
        <div className="Layout">
            <div className="Layout-left">
                {distributePlayers(players, "left")}
                {/* <Player location="Player-Card-leftRight" user={"SadFace"}/>
                    <Player location="Player-Card-leftRight" user={"SadFace"}/> */}
            </div>
            <div className="Layout-mid">
                <div className="Layout-mid-top">
                    {distributePlayers(players, "top")}
                    {/* <Player spchBub="top" location="Player-Card-topBottom" user={"HappyFace"}/>
                <Player spchBub="top" location="Player-Card-topBottom" user={"HappyFace"}/> */}
                </div>
                <div className="Layout-mid-center">
                    {gameMode === "lobby" ? <Lobby />
                    : gameMode === "inGame" ? <InGame />
                    : <Results />}
                </div>
            </div>
            <div className="Layout-right">
                {distributePlayers(players, "right")}
                {/* <Player location="Player-Card-leftRight" user={"CrazyFace"}/>
                    <Player location="Player-Card-leftRight" user={"CrazyFace"}/> */}
            </div>
        </div>
    );
}

export default Layout;