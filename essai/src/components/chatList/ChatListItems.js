import React, { Component } from "react";
import Connexion from "../../controller/Connexion";
import Avatar from "./Avatar";
import IO from 'socket.io-client';

export default class ChatListItems extends Component {
  socket;
  constructor(props) {
    super(props);
    this.state={
      dernier:null,
      nbr:0
    }
  }
  selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

 async componentDidMount(){
const utilisateur = JSON.parse(Connexion.getUser())
console.log(utilisateur)

  const reponse = await Connexion.recuperation('message/'+this.props.convert.idMessagerie);
  console.log(reponse);
  this.setState({
    dernier:reponse
  });
this.socket = IO('http://192.168.43.100:3000');
this.socket.on('message',(data)=>{
  if(data.idMessagerie===this.props.convert.idMessagerie && data.recipient_id===utilisateur.email)
  this.setState({
    nbr:this.state.nbr+1
  })
})
console.log("---------------------------")
  console.log(this.state.dernier)
  console.log("---------------------------")

  }

  render() {
    console.log(this.state.nbr)
    const n = this.state.nbr>0?<span className="badge badge-danger text-light rounded-pill text-center pull-center" style={{width:20,padding:2,marginLeft:20  }}>{this.state.nbr}</span>:""
    return (
      <div
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        onClick={()=>this.props.discussion(this.props.convert)}
        className={`chatlist__item ${
          this.props.active ? this.props.active : ""
        } `}
      >
        <Avatar
          image={
            this.props.image ? this.props.image : "img/avatar.jpg"
          }
          isOnline={this.props.isOnline}
        />

        <div className="userMeta">
          <p className="text-light">{this.props.convert.prenom+"  "+this.props.convert.nom}</p>
          <span className="activeTime">{this.state.dernier?this.state.dernier.contenu:""}</span>
        </div>
        <div className="userMeta mt-2" style={{ position:"absolute",right:0 }}>
          <span className="text-light">13/12/2021</span>
          {/* <span className="text-light">{this.state.dernier?this.state.dernier.created_at:""}</span> */}
          {n}
        </div> 
      </div>
    );
  }
}
