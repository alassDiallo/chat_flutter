import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import ChatBody from '../../components/chatBody/ChatBody'
import Messagerie from './Messagerie'
const ENDPOINT = "http://192.168.43.100:3000";
var socket;

function Discussion() {
  const [response, setResponse] = useState("");
  const [message,messagerie]= useState("");

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.on("message", (data) => {
      console.log(data)
      setResponse(data);
    });
    //console.log(response)
  }, []);

  const ecrire = (e)=>{
      messagerie(e.target.value);
  }

  const envoi = (e)=>{
    e.preventDefault();
    console.log("envoi message "+message)
    socket.emit('message',message);
  }
  return (
    <section id="main-content" className="bg-dark" >
      <section className="wrapper">
        <div className="row mt"  >
    <div className="" style={{ marginTop:0, marginLeft:40}}>
      <div className="row text-center" >
        <div className="container">
      <div className="row" >
        <div className="__main" >
          <ChatBody />
        </div>
       
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    </section>
  );
  
}

export default Discussion;