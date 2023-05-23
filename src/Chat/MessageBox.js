import React, { useState } from "react";
import "./MessageBox.css";
import { Input, Label, Form, Button } from "reactstrap";
import { useContext } from "react";
import GameContext from "../GameContext";

const MessageBox = () => {

    const [formData, setFormData] = useState("");
    const { handleMessage } = useContext(GameContext);

    const handleChange = (e) => {
        const {value} = e.target;
        setFormData(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleMessage(e, "chat", formData);
        e.target.reset();
    }

    return (
        <div className="MessageBox">
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="chatMsg">
                    Chat
                </Label>
                <Input
                    id="chatMsg"
                    name="chatMsg"
                    className="MessageBox-chatMsg"
                    placeholder="Chat here!"
                    type="text"
                    onChange={handleChange}
                />
                <Button className="MessageBox-btn">
                    Send
                </Button>
            </Form>
            
        </div>
    );
}

export default MessageBox;