import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";

export default class ChatBody extends Component {

  constructor(props){
    super(props)
    this.state = {
      conversation:null
    }
  }

   discussion = (convert)=>{
    console.log(convert)
    this.setState({
      conversation:convert
    })
  }
  

  render() {
    console.log(this.state.conversation)
    const affich = this.state.conversation===null?
    <div style={{ height:500 }}>
      <img src="img/discute.jpg" className="w-100" />
    </div>
    :<ChatContent messagerie={this.state.conversation} />
    return (
      <div className="main__chatbody">
        <ChatList convert={this.discussion} />
        { affich }
       
      </div>
    );
  }
}
