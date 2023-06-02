import React, { useState, useEffect } from "react";
import "./MessageBox.css";
import { Input, Label, Form, Button } from "reactstrap";
import { useContext } from "react";
import GameContext from "../GameContext";
import ChatMessage from "./ChatMessage";
import { v4 as uuid } from 'uuid';

const MessageBox = ({messages=[]}) => {

    const [formData, setFormData] = useState("");
    const { handleMessage } = useContext(GameContext);
    // const [ messages, setMessages ] = useState([]);

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
            <div className="MessageBox-messages">
                <ul className="MessageBox-messages-list">
                    <ChatMessage name={"Fatty"} text={"I am a fatty."} type={"chat"}/>
                    {messages.map(({name, text, type}) => (
                        <ChatMessage name={name} text={text} type={type} key={uuid()}/>
                    ))}
                </ul>
            </div>
            <div className="MessageBox-form">            
                <Form onSubmit={handleSubmit}>
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
        </div>
    );
}

export default MessageBox;