import axios from "axios";
import React, { Component } from "react";
import Connexion from "../../controller/Connexion";
import "./chatList.css";
import ChatListItems from "./ChatListItems";

export default class ChatList extends Component {
  // allChatUsers = [
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
  //     id: 1,
  //     name: "Tim Hover",
  //     active: true,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
  //     id: 2,
  //     name: "Ayub Rossi",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
  //     id: 3,
  //     name: "Hamaad Dejesus",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
  //     id: 4,
  //     name: "Eleni Hobbs",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
  //     id: 5,
  //     name: "Elsa Black",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
  //     id: 6,
  //     name: "Kayley Mellor",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
  //     id: 7,
  //     name: "Hasan Mcculloch",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://auraqatar.com/projects/Anakalabel/media//vesbrand/designer4.jpg",
  //     id: 8,
  //     name: "Autumn Mckee",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
  //     id: 9,
  //     name: "Allen Woodley",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://pbs.twimg.com/profile_images/770394499/female.png",
  //     id: 10,
  //     name: "Manpreet David",
  //     active: false,
  //     isOnline: true,
  //   },
  // ];
  constructor(props) {
    super(props);
    this.state = {
      allChats: [],
    };
  }

  selectedCovert(id){

    console.log("vous avez cliquer sur la conversation "+id);
  }

  async componentDidMount(){

    const reponse = await Connexion.recuperation("disc");
    this.setState({
      allChats:reponse
    })
    // axios.get('http://192.168.1.4:8000/api/disc').then(response=>{
    //   console.log(response.data)
    //   this.setState({
    //     allChats : response.data
    //   })
    // })
  }
  render() {
    console.log(this.state.allChats)
    console.log(this.props)
    return (
      <div className="main__chatlist">
        <button className="btn">
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button>
        <div className="chatlist__heading">
          <h2 className="text-light">Messagerie</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {this.state.allChats && this.state.allChats.map((item, index) => {
            return (
              <ChatListItems
              convert={item}
                name={item.sender_id}
                key={item.idMessagerie}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.image}
                discussion = {this.props.convert}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
