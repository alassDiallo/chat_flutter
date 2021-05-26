import React from 'react'

// import { DndProvider } from 'react-dnd';
//import { HTML5Backend } from 'react-dnd-html5-backend';
// import Backend from 'react-dnd-html5-backend'
import Connexion from '../../controller/Connexion';
import Medicament from '../medicament/Medicament'
import Modal from '../medicament/Modal'
import Detail from './detail'
import Medicaments from './medicaments';

class Ordonnance extends React.Component{

    state = {
        medicament:null,
        recherche:"",
        liste:[]
    }

    componentDidMount(){

        this.getMedicament();
       
    }

    async getMedicament(){

        const reponse = await Connexion.recuperation('medicament');
        this.setState({
            medicament:reponse
        })

        console.log(reponse)
        
    }

    ondragend = (medic)=>{
        console.log(medic)
       
        this.setState({
            liste:this.state.medicament
        })
        console.log(this.state.liste)
    }

    recherche = (e)=>{
        this.setState({
            recherche:e.target.value
        })
    }

     filtre(data){

        return data.filter((item)=>item.libelle.toLowerCase().indexOf(this.state.recherche.toLowerCase())> -1)        
    }

    render(){
        console.log(this.state.liste)
        return(
            <section id="main-content" className="bg-light" >
                <section className="wrapper">
                    <div className="row mt" >
                        <div className="mt-4 col-md-11" style={{ margintTop:50, marginLeft:50}}>
                        
                            <div className="row">
                            <DragDropContext onDragEnd={(e)=>console.log("drag")}>
                                <div className="col-md-5 border border-dark bg-dark card" style={{ height:"100%" }}>
                                    <div className="">
                                    <h1  className="text-center m-4 text-light">Liste des medicaments</h1><hr/>
                                    <div className="mb-4 mt-4 ml-2 mr-2  row border border-light" style={{ borderRadius:50 }} >
                                        <i className="fa fa-search col-md-1 text-light mt-4" style={{ fontSize:14 }}></i>
                                        <input type="text" 
                                                className="form-control col-md-10 text-light" 
                                                style={{height:40,fontSize:14,background:"transparent",border:"none"}} 
                                                placeholder="recherche..."
                                                value={this.state.recherche}
                                                onChange={this.recherche}
                                        />
                                    </div>
                                    </div>
                                   
                                
                                {
                                    this.state.medicament!==null && <Medicaments donnees={this.filtre(this.state.medicament)} />
                                    
                                }
                                </div>
                            
                                {/* <div className="col-md-7 pull-right col-offset-1">
                                    <Detail liste={this.state.liste} />
                                    <hr/>
                                </div> */}
                               
                                </DragDropContext> 
                               
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </section>
            </section>
        )
    }

}
export default Ordonnance;