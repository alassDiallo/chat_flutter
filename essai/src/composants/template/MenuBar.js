import { sliceEvents } from '@fullcalendar/common';
import React, {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Connexion from '../../controller/Connexion';
import IO from 'socket.io-client';

const MenuBar = ()=>{

const [nv,changeNV] = useState(0);

const [utilisateurs,change]=useState(null);

useEffect(() => {
 const socket = IO("http://192.168.1.13:3000");
 change(JSON.parse(Connexion.getUser()))
 console.log(utilisateurs)
 socket.on('message',(data)=>{
   if(data.recipient_id==utilisateurs.email){
     changeNV(nv++)
   }
 })
}, [])
const b = nv>0?<span className="badge badge-danger">{nv}</span>:""
  const utilisateur = JSON.parse(Connexion.getUser())
  //console.log(utilisateurs)
    return(
      <aside className="">
      <div id="sidebar" className="nav-collapse ">
        <ul className="sidebar-menu" id="nav-accordion">
          <p className="centered"><a href="#"><img src="img/vol.png" className="img-circle" width="80" /></a></p>
          <h5 className="centered">Dr. {utilisateur.prenom } {utilisateur.nom}</h5>
          <li className="mt">
            <NavLink className="" to="/accueil">
              <i className="fa fa-home"></i>
              <span>Accueil</span>
              </NavLink>
          </li>
          <li className="sub-menu">
            <NavLink to="/ordonnance">
              <i className="fa fa-file-text-o"></i>
              <span>Ordonnance</span><i className="fa fa-plus pull-right" style={{height: 50}}></i>
              </NavLink>
            {/* <ul className="sub">
              <li><a href="ordonnance.index">Ordonance</a></li>
              <li><a href="/prescriptionAnalise">Analyse</a></li>
             
            </ul> */}
          </li>
          <li className="sub-menu">
            <NavLink to="/analyse">
              <i className="fa fa-file-text-o"></i>
              <span>Analyse</span><i className="fa fa-plus pull-right" style={{height: 50}}></i>
              </NavLink>
           
          </li>
          <li className="sub-menu">
            <NavLink to="/rendezvous">
              <i className="fa fa-stethoscope"></i>
              <span>Rendez-vous</span><i className="fa fa-plus pull-right" style={{height: 50}}></i>
              </NavLink>
           
          </li>
          <li className="sub-menu">
            <NavLink to="/calendrier">
              <i className="fa fa-calendar"></i>
              <span>Calendrier</span><i className="fa fa-plus pull-right" style={{height: 50}}></i>
              </NavLink>
           
          </li>
          <li className="sub-menu">
            <NavLink to="/discussion">
              <i className="fa fa-comments"></i>
              <span>Discussion { b}  </span><i className="fa fa-plus pull-right" style={{height: 50}}></i>
              </NavLink>
           
          </li>
          {/* <li className="sub-menu">
            <a href="#">
              <i className="fa fa-calendar"></i>
              <span>Rendez-vous</span><i className="fa fa-plus pull-right" style={{ height: 50}}></i>
              </a> 
            <ul className="sub">
              <li><a href="/lm">voir les demandes</a></li>
              <li><a href="/calendrier">calendrier</a></li>
            </ul>
           </li>  */}
        </ul>
      </div>
    </aside>
    ) 
}

export default MenuBar;