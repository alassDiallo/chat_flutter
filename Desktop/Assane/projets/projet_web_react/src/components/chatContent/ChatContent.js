import React, { Component, useState, createRef, useEffect } from "react";
import IO from 'socket.io-client'

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import Connexion from "../../controller/Connexion";

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  socket;
  chatItms = [
    {
      key: 1,
      image:
        "img/avatar.jpg",
      type: "",
      msg: "bonjour",
    },
    {
      key: 2,
      image:
        "img/avatar.jpg",
      type: "other",
      msg: "oui bonjour comment tu vas",
    },
    {
      key: 3,
      image:
        "img/avatar.jpg",
      type: "other",
      msg: "oui cva bien oui et vous",
    },
    {
      key: 4,
      image:
        "img/avatar.jpg",
      type: "",
      msg: "cva aussi",
    },
    {
      key: 5,
      image:
        "img/avatar.jpg",
      type: "other",
      msg: "alors comment te sent tu",
    },
    {
      key: 6,
      image:
        "img/avatar.jpg",
      type: "",
      msg: "je vais un peu mieu merci",
    },
    {
      key: 7,
      image:
        "img/avatar.jpg",
      type: "other",
      msg: "c'est bien alors",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      msg: "",
      messages:null,
    };
  }

  affich = ()=>{
    console.log(this.state.messages)
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  getMessage = async () => {
    console.log(this.props.messagerie.idMessagerie)
    const utilisateur = JSON.parse(Connexion.getUser())
    const reponse = await Connexion.recuperation('messages/'+this.props.messagerie.idMessagerie)
    reponse.map(item=>{
      const type = utilisateur.email==item.sender_id?"":"other"
      const sms ={
        image:
          "img/avatar.jpg",
        type: type,
        msg: item.contenu,
      }
      this.setState({
        chat:[...this.state.chat,sms]
      })
    })
    
    // this.setState({
    //   messages:reponse
    // })

   
  }

  componentDidMount() {

    this.getMessage()
    this.socket = IO("http://192.168.43.100:3000");
    const utilisateur = JSON.parse(Connexion.getUser())
    console.log(utilisateur)
    this.affich()
    // window.addEventListener("keydown", (e) => {
    //   if (e.keyCode == 13) {
    //     if (this.state.msg != "") {
    //       this.chatItms.push({
    //         key: 9,
    //         type: "",
    //         msg: this.state.msg,
    //         image:
    //           "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    //       });
    //       this.setState({ chat: [...this.chatItms] });
    //       this.scrollToBottom();
    //       this.setState({ msg: "" });
    //     }
    //   }
    // });
    // this.scrollToBottom();
    this.socket.on("message",(data)=>{
      console.log(data);
      
      if (data != null) {
        console.log(data.recipient_id)
        if(data.recipient_id===utilisateur.email && data.idMessagerie===this.props.messagerie.idMessagerie){
          console.log("bien")
        // this.chat.push({
        
        //   type: "other",
        //   msg: data.contenu,
        //   image:
        //     "img/avatar.jpg",
        // });
        let sms = {
          type:"other",
          msg:data.contenu,
          image:"img/avatar.jpg",
        }
        this.setState({ chat: [...this.state.chat,sms]});
        this.scrollToBottom();
        this.setState({ msg: "" });
      }
      else{
        console.log("faux")
      }
      // this.scrollToBottom();
    }
    });
  
  }


  componentWillUnmount(){
    this.setState({
      messagesEndRef:createRef(null)
    })

  }

  envoyer = (e)=>{
    e.preventDefault();
    console.log('valider')
    if (this.state.msg != "") {

      let sms = {
        type:"",
        msg:this.state.msg,
        image:"img/avatar.jpg",
      }
      // this.chatItms.push({
      //   key: 9,
      //   type: "",
      //   msg: ,
      //   image:
      //     "img/avatar.jpg",
      // });
      this.setState({ chat: [...this.state.chat,sms] });
      this.scrollToBottom();
      this.setState({ msg: "" });
    }

this.scrollToBottom();
    // const sms = {
    //   key:8,
    //   type:"",
    //   msg:this.state.msg,
    //   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
    // }
    // this.setState({
    //   chatItms:[...this.state.chat,
    //   sms
    //   ]
    // })
    // //console.log(this.socket)
    const message = {
      contenu:this.state.msg,
      recipient_id:this.props.messagerie.sender_id,
      dateEnvoi: new Date(),
      idMessagerie:this.props.messagerie.idMessagerie
    }
    this.envoi(message)
    console.log(message)
    this.socket.emit('message',message);
    console.log(this.state.msg)
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  async envoi(mess){
     var reponse = await Connexion.envoiDedonnee("message",mess);
     console.log(reponse)

  }
  render() {
    console.log(this.state.messages)
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="img/avatar.jpg"
              />
              <p className="text-light"><h2>{this.props.messagerie.prenom+"  "+this.props.messagerie.nom}</h2></p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog text-light"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            <div style={{ height:300}}>
            {this.state.chat.length<1 ? <p className="text-light justify-content-md-center" style={{ marginTop:100,fontSize:14 }}>cette conversation est vide</p>:this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={index}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            </div>
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            {/* <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button> */}
            <form onSubmit={this.envoyer}>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn" >
              <i className="fa fa-paper-plane"></i>
            </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
