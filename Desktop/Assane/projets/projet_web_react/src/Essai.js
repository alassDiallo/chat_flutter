import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

export default class DemoApp extends React.Component {
  state = {
    list:[]
  }
  // async componentDidMount(){

  //   // const reponse = await Connexion.recuperation("rv");
  //   // console.log(reponse);
  //   // this.setState({
  //   //   list:reponse
  //   // });

  //   // axios.get("http://192.168.1.4:8000/api/rv").then((response)=>{
  //   //   this.setState({
  //   //     list : response.data
  //   //   })
  //   // })

    
  // }

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
        
      }

  }
  render() {
    console.log(this.state.list)
    return (
      <section id="main-content" className="" >
          <section className="wrapper">
              <div className="row mt" >
                  <div className="mt-4 col-md-11" style={{ margintTop:50, marginLeft:50}}>
     
                     <div className="row text-center">
                        <div className="container"  style={{ color:"black" }} >
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