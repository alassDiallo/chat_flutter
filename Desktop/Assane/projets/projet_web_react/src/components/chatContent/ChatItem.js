import React, { Component } from "react";
import Avatar from "../chatList/Avatar";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
     
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
          <div className="chat__meta"> 
          </div>
        </div>
        <div >
      {/* <span className="text-primary mt-4">21h</span> */}
      </div>
        <Avatar isOnline="active" image={this.props.image} />
        
      </div>
      
    );
  }
}
