import React, { useState, useEffect }  from 'react'
import { Button } from 'react-bootstrap'

export default function ConnectBox(props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { socket, cookies } = props


      useEffect(() => {
        socket.on("new user", ({user}) =>{ 
            const newMsg = {userName: user, msg: " HAS CONNECTED", id: Math.floor((Math.random()*100)+1)};
            setMessages(messages => [...messages, newMsg])
        })
    
        socket.on("outgoing message", ({user, newMessage}) => {
            const newMsg = {userName: user, msg: ` : ${newMessage}`, id: Math.floor((Math.random()*100)+1)};
            setMessages(messages => [...messages, newMsg])
        })

        return () => {

          }
      }, []);

    const sendMessage = () => {
        socket.emit("incoming message", ({user:cookies.get('userName'), message:message}));
        setMessage("");
    }

    const formPreventDefault = (e) => {
        e.preventDefault();
      }

    return (
        <div className="chat-area">
            <div id="dm" className="dynamic-messages">
                {messages.map(({ userName, msg, id }) => <span className="bg-light text-dark font-weight-light" key={id}><span className="font-weight-bold bg-light text-dark">{`- ${userName}`}</span>{`${msg}`}<br/></span>)}
            </div>
            <div className="row form-message">
                <div className="col-9">
                    <form className="form-inline" onSubmit={(e) => formPreventDefault(e) }>  
                        <input onChange={(e) => setMessage(e.target.value)} value={message} className="form-control" id="message" type="text" aria-label="Enter Message"/>
                    </form>
                </div>
                <div className="col-3">
                    <button onClick={sendMessage} className=" btn btn-light text-dark" type="button">Enter</button>
                </div>
            </div>   
        </div>
    )
}
