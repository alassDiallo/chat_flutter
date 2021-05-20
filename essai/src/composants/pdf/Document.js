import React from 'react'
import {render} from 'react-dom'
import ReactToPrint from 'react-to-print'
import Connexion from '../../controller/Connexion'
import logo from '../../images/logoJic.png'
//import { ComponentToPrint } from './Exemple';
export default class Document extends React.PureComponent {

state = {
    medecin:null,
    p:0,
    total:0
}

 prix = this.props.medicament.map(item=>{
    return item.prix
  });

  
  reducer = (accumulateur,currentValue)=>{
    return accumulateur + currentValue
  }
componentDidMount(){
    this.getMedecin();
    this.setState({
        p:this.prix
    })
}
    async getMedecin() {
    
        const reponse = await Connexion.recuperation('getMedecin')
      console.log(reponse)
      this.setState({
          medecin:reponse
      })
    }
    render() {
        console.log(this.state.p)
      return (
          <div style={{ marginLeft:50,marginRight:50,height:"100%" }} >
        <div className="container row" style={{width: "100%",padding:20}}>
        <div className="col-md-6" style={{width:"200px",fontSize:16}}>
                <img src={logo} alt="logo" width="200px" height="200px"/><br/>        
         {this.state.medecin!=null&&<>{this.state.medecin.structure.charAt(0).toUpperCase()+this.state.medecin.structure.slice(1)}<br/>
        region : {this.state.medecin.region.charAt(0).toUpperCase()+this.state.medecin.region.slice(1)}<br/>
        telephone :  {this.state.medecin.telephoneStructure}<br/></>
    }
        </div>
        <div className="col-md-6" style={{marginLeft:"",fontSize:16}} align="right">
           {this.props.patient.prenom.charAt(0).toUpperCase() + 
         this.props.patient.prenom.slice(1)} { this.props.patient.nom.charAt(0).toUpperCase() + 
         this.props.patient.nom.slice(1) }<br/>
            age : { new Date().getFullYear() - this.props.patient.dateDeNaissance.split('-')[0]} ans<br/>
           
            Telelephone : {this.props.patient.telephone}<br/>
            Adresse : {this.props.patient.adresse.charAt(0).toUpperCase()+this.props.patient.adresse.slice(1)}<br/>
            date :  {new Date().toLocaleDateString()}
        </div>
    </div>
    <div className="">
        <h1 className="text-center" style={{ fontSize:40 }}>Ordonnance</h1><hr/>

    </div>
    <div className="">

 <div>
    
     {
         this.props.medicament.map(item=>(
            <div key={item.idMedicament}>
    <div className="" style={{}}>
        <div style={{ fontWeight: "bold",fontSize:20}} align="left">{item.libelle}</div>
        <div align="right" style={{ marginRight:20,fontSize:14 }}>{item.prix}</div>
    </div>
    <div style={{marginBottom: 20,fontSize:14 }}>
        {item.posologie}
        
    </div>
    </div>)
         )
     }
 </div>
 </div>
 <div classNameName="row" style={{fontSize: 14,fontWeight:'bold',marginTop:80}}>
     <div className="col-md-3" style={{ width:"32%" }}>
         Total : {this.props.total} Franc Cfa
     </div>
     <div className="col-md-5" style={{ width:"35%" }}>
         Prise en charge(80%) : {this.props.total*0.8} Franc Cfa
     </div>
     <div className="col-md-4" style={{ width:"33%" }}>
         charge patient : {this.props.total*0.2}  Franc Cfa
     </div>
 </div>
     <div className="row pull-right col-md-4" style={{marginTop: "30%",marginBottom:50}}>
         <div style={{fontSize: 16,fontWeight:"bold"}} align="right">
           {
               this.state.medecin !=null && <>Dr. {this.state.medecin.nom.charAt(0).toUpperCase()+this.state.medecin.nom.slice(1)}<br/>
               Telephone : {this.state.medecin.telephone}</>
           } 
         </div>
     </div>
    
    </div>
      );
    }
  }

  
