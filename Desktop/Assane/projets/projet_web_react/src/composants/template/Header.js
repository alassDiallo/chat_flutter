import React from 'react';
import Connexion from '../../controller/Connexion'

const Header =  (props)=>{
const deconnexion =async (e)=>{ 
  e.preventDefault();
  console.log(props)
  //document.getElementById('logout-form').submit();
  // const reponse = await Connexion.deconnexion("logout");
  // if(reponse.success){
  //   console.log(reponse)
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('utilisateur')
  props.etat.history.push('/')
  // }
}
    return (
    <section id="container">
    <header className="header black-bg">
      <div className="sidebar-toggle-box">
        <div className="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
      </div>
      
      <a href="index.html" className="logo"><b><span>SENJICA</span></b></a>
     
      <div className="nav notify-row" id="top_menu">
        
        <ul className="nav top-menu">
         
          <li id="header_inbox_bar" className="dropdown">
            <a data-toggle="" className="" href="#">
              <i className="fa fa-envelope-o"></i>
              <span className="badge bg-theme">5</span>
              </a>
              </li>
          <li id="header_notification_bar" className="dropdown">
            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
              <i className="fa fa-bell-o"></i>
              <span className="badge bg-warning">7</span>
              </a>
          </li>
         
        </ul>
       
      </div>
   
      <div className="top-menu">
        <ul className="nav pull-right top-menu">
          <li><a className="logout btn" href="logout"
            onClick={deconnexion}>
                          <i className="fa fa-sign-out"></i>
            Se deconnecter
         </a>

         <form id="logout-form" action="logout" method="POST" className="d-none">
            
         </form></li>
        </ul>
      </div>
    
    </header>
    </section>
    )
}

export default Header;