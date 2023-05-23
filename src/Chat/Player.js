import React from "react";
import Avatar from "./Avatar";
import SpeechBubble from "./SpeechBubble";
import { Card, CardTitle } from "reactstrap";
import "./Player.css";

const Player = ({username}) => {
    return (
        <Card className="Player-Card">
            <SpeechBubble />
            <Avatar />
            <CardTitle>
                {username}
            </CardTitle>
        </Card>
    );
}

export default Player;