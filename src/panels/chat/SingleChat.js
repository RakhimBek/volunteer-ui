import React, {useState, useEffect} from 'react';

const SingleChat = ({}) => {
    const URL = 'ws://127.0.0.1:8080/myHandler';
    const [ws, setWs] = useState(new WebSocket(URL));
    const [messages, setMessages] = useState([]);

    (() => {
        ws.onopen = () => {
            console.log('connected')
        };

        ws.onmessage = e => {
            const data = JSON.parse(e.data);
            setMessages([...messages, data]);
        };

        ws.onclose = () => {
            console.log('disconnected');
            setWs(new WebSocket(URL));
        };
    })();

    const sendMessage = (e) => {
        ws.send("lhhoioo");
    };

    const MessageList = () => {
        return messages.map((e, index) => {
            return <p key={'ke' + e.id}>{e.m}</p>
        });
    };

    return (
        <div>
            <MessageList/>
            <input type="button" onClick={sendMessage}/>
        </div>
    );
};

export default SingleChat;