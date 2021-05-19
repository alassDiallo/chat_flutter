import React,{useState,useEffect} from 'react';
import Connexion from '../../controller/Connexion';

const Accueil = ()=>{

  const [rv,setRv]=useState(0)
  const [patient,setPatient]=useState(0)
  const [ord,setOrd]=useState(0)

  useEffect(async () => {
   
    const reponse = await Connexion.recuperation('accueilmedecin');
    setRv(reponse.rv)
    setPatient(reponse.patient)
    setOrd(reponse.ordonnance)
    
  },)

    return (
        <section id="main-content" >
      <section className="wrapper">
        <div className="row mt" >
    <div className="" style={{ margintTop:0, marginLeft:50}}>
     
      <div className="row text-center">
        <div className="container">
        <div className="card col-md-3 m-4 text-center bg-success border-4" style={{height: 150,color:"white"}}>
          <div className="row text-center">
            <span style={{ fontSize: 50 }}><i className="fa fa-calendar" ></i></span>
            <h4>Rendez-vous</h4>
            <div>
              <h2>{rv}</h2><br/>
              demande en attente
            </div>
          </div>
        </div>
        <div className="card col-md-3 m-4 bg-danger border-4"  style={{height: 150,color:"white"}}>
          <div className="row text-center">
            <span style={{ fontSize: 50 }}><i className="fa fa-files-o" ></i></span>
            <h4>Ordonnances</h4>
            <div>
              <h2>{ord}</h2>
            </div>
          </div>
        </div>
        <div className="card col-md-3 m-4 bg-primary border-4"  style={{height: 150}}>
          <div className="row text-center">
            <span style={{ fontSize: 50 }}><i className="fa fa-users" ></i></span>
            <h4>Patients</h4>
            <div>
              <h2>{patient}</h2>
            </div>
          </div>
        </div>
        </div>
      </div>
            <div style={{height: 500}} className="col-md-6">

              <canvas id="myChart" width="700" height="500"></canvas>
          </div>
          </div>
          </div>
          </section>
          </section>
    
    )
}

export default Accueil;