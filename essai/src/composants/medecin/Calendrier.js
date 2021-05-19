import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import axios from 'axios'
import "@fullcalendar/core/locales-all";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Connexion from '../../controller/Connexion'
import './calendrier.css'
import AjouterRendezVous from "./AjouterRendezVous";

export default class Calendrier extends React.Component {

  state = {
    list:[],
    ajout:false,
    date:null,
    r:""
  }

  recharge = (nv)=>{
    this.setState({
      ajout:!this.state.ajout,
      list:[...this.state.list,nv]
    })
    
  }
  async componentDidMount(){

    const reponse = await Connexion.recuperation("rv");
    console.log(reponse);
    this.setState({
      list:reponse
    });

    // axios.get("http://192.168.1.4:8000/api/rv").then((response)=>{
    //   this.setState({
    //     list : response.data
    //   })
    // })

    
  }

   rendezvous = (dateClickinfo)=>{

    console.log(dateClickinfo.dateStr)
    //var data = moment(start, 'DD.MM.YYYY').format('YYYY-MM-DD');
      var d = new Date();
      var a = d.getMonth() <10?"0":"";
      var b = d.getDate()<10?"0":"";
      var today = d.getFullYear()+"-"+(a+(d.getMonth()+1))+"-"+(b+d.getDate());
      console.log(today);
     
      if(dateClickinfo.dateStr < today){
        alert("vous ne pouvez pas prendre cette date");
      }
      else{
        this.setState({
          ajout:true,
          date:dateClickinfo.dateStr
        })
      }

  }

  
    onClose =()=>{
    this.setState(prev=>{
     this.setState({
       ajout:!this.state.ajout
     })
    })
}
  render() {
    console.log(this.state.list)
    return (
      
      <section id="main-content" className="" >
         {this.state.ajout && <AjouterRendezVous onClose={this.onClose} aff={this.state.ajout} date={this.state.date} re={this.recharge} />}
          <section className="wrapper">
              <div className="row mt" >
                  <div className="mt-4 col-md-11" style={{ margintTop:50, marginLeft:50}}>
                     <div className="row text-center">
                        <div className="container"  style={{ color:"black",height:500 }} > 
                       
                          <FullCalendar className="bg-black"
                          themeSystem = 'bootstrap'
                            defaultView="dayGridMonth"
                            buttonText = {{
                              today:'Aujourd\'hui',
                              day:'Jour',
                              week:'Semaine',
                              month:'Mois'
                          }}
                            headerToolbar={{

                              locale:'fr',
                              left: "prev,next today",
                              center: "title",
                              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                            }}
                            locale='fr'
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            dateClick = {this.rendezvous}
                            events={this.state.list}
                            editable={true}
                            selectable={true}
                              
                          />
      
                </div>
              </div>
            </div>
          </div>
         
        </section>
      </section>
    )
  }
}