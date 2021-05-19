import React,{useRef,useEffect,useState} from 'react'
// import {useReactToPrint} from 'react-to-print'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import Connexion from '../../controller/Connexion';
import logo from '../../images/logoJic.png'

export default function GenerationOrd(props) {

    const [medecin,setMedecin]=useState(null)

    useEffect( () => {
      getMedecin()
    }, )

    async function getMedecin() {
        const reponse = await Connexion.recuperation('getMedecin')
      console.log(reponse)
      setMedecin(reponse)
    }

    console.log(props.medicament)
    return (
        <>
        <button className="btn btn-info">imprimer</button>
       <div className="col-md-8 justify-content-center col-offset-4 border border-dark rounded"style={{marginLeft: "100px",padding:50,height:"100%"}} >
        <div className="container row" style={{width: "100%"}}>
        <div className="col-md-6 pull-left" style={{}}>
        <img src={logo} width="100px" height="100px" className="ml-4" /><br/>
            {
                medecin!=null && (<>structure : {medecin.structure}<br/>
                    specialité : {medecin.specialite}<br/>
                    region : {medecin.region}<br/>
                    telephone : {medecin.telephoneStructure}<br/></>)
            }
        
        </div>
        <div className="col-md-4 " style={{marginLeft:85}}>
            {props.patient.prenom}  {props.patient.nom}
            <br/>
            age :  ans<br/>
            
            Tel : {props.patient.telephone}<br/>
            Adresse : {props.patient.adresse}<br/>
            date: {new Date().toLocaleDateString()}
        </div>
    </div>
    <div className="row">
        <h1 className="text-center m-4">Ordonnance</h1><hr style={{ color:"blue"}} />

    </div>
    <div className="row">
<table style={{width: "100%"}}>
    {
        props.medicament.map(item=>
            <>
            <div class="row">
   
   <div class="col-md-8"><h4>{ item.libelle }</h4></div>
   <div class="col-md-4" style={{ fontSize: 12,fontWeight:"bold"}}> {item.prix  }</div>
</div>
<div class="mb-4"  style={{ fontSize: 14 }}>
   { item.posologie }
</div>
            </>
        )
    }
</table>
</div>
<div class="row" style={{fontSize: 12,fontWight:'bold',marginTop:80}}>
    <div class="col-md-3">
        Total :   Franc Cfa
    </div>
    <div class="col-md-5">
        Prise en charge(80%) :  Franc Cfa
    </div>
    <div class="col-md-4">
        Patient :   Franc Cfa
    </div>
</div>
    <div class="row pull-right col-md-4" style={{marginTop: 100}}>
        <div style={{fontSize: 12,fontWeight:"bold"}}>
          {
              medecin !=null && <>Dr. {medecin.nom}<br/>
              Telephone : {medecin.telephone}</>
          } 
        </div>
    </div>
   </div>
   </>

            );
   
}