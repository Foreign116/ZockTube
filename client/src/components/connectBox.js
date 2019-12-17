import React, { useState, useEffect }  from 'react'

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

      const escapeHtml = (unsafe) => {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
     }

    const sendMessage = (e) => {
        e.preventDefault();
        const messageString = escapeHtml(message);
        if(messageString && messageString != '' && messageString != ' ' && messageString != null && messageString != undefined){
        socket.emit("incoming message", ({user:cookies.get('userName'), message:messageString}));
        }
        setMessage("");
    }

    return (
        <div className="chat-area">
            <div className="textbox-label form-message">
                <h1>Chat</h1>
            </div>
            <div id="dm" className="dynamic-messages">
                {messages.map(({ userName, msg, id }) => <span className="text-white font-weight-light" key={id}><span className="font-weight-bold text-white">{`${userName}`}</span>{`${msg}`}<br/></span>)}
            </div>
            <div className="row form-message">
                <div className="col-9">
                    <form className="form-inline" onSubmit={(e) => sendMessage(e) }>  
                        <input onChange={(e) => setMessage(e.target.value)} value={message} placeholder="send a message" className="form-control" id="message" type="text" aria-label="Enter Message"/>
                    </form>
                </div>
                <div className="col-3">
                    <button onClick={(e) => sendMessage(e)} className=" btn btn-light text-dark" type="submit">Enter</button>
                </div>
            </div>   
        </div>
    )
}
