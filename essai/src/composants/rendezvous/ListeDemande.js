import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Connexion from '../../controller/Connexion'
import Rendezvous from './rendezvous'
import { getDateMeta } from '@fullcalendar/common'
import Renvoyer from './Renvoyer'
import { data } from 'jquery'
import Pagination from 'react-js-pagination'
import AjoutRendezvous from './AjoutRendezvous'
import Reporter from './Reporter'
const ListeDemande = ()=>{

    const [rv,listeRV]=useState(null);
    const [recherche,rechercher]=useState("")
    const [ajouter,setAjouter] = useState(false);
    const [report,setReport] = useState(false);
    const [info,setDonnees]=useState(null)

    useEffect( async ()  =>  {
        console.log("bonjour")
        donnees();

       
    }, [])

    const onClose =()=>{
        setAjouter(!ajouter)
    }

    const modifier = (id)=>{
        setReport(!report)
        setDonnees(null)
        listeRV(rv.filter((item)=>item.id !=id))
    }

    // const cherche = (e)=>{
    //     rechercher(e.target.value)
    //     alert(e.target.value)
    // }
     const donnees= async ()=>{
        const reponse = await Connexion.recuperation('listeRendezvous');
        console.log(reponse);
        listeRV(reponse);
    }

    async function accepter(id){
       console.log(id.id)
        const reponse = await Connexion.recuperation('valider/'+id.id)
        console.log(reponse)
        listeRV(rv.filter((item)=>item !=id))
    }

    async function refuser(id){
        console.log(id.id)
        if(window.confirm("voulez-vous vraiment refuser cette demande ?")){
         const reponse = await Connexion.recuperation('refuser/'+id.id)
         console.log(reponse)
         listeRV(rv.filter((item)=>item !=id))
        }
     }

     const reporter = (donnees)=>{
         console.log(donnees)
         setDonnees(donnees)
        setReport(!report)
     }

    const afficherForm=()=>{
        console.log('afficher')
         setAjouter(!ajouter);
     }

   function filtrer(data){

        return data.filter((item)=> item.prenom.toLowerCase().indexOf(recherche.toLowerCase())>-1 || item.nom.toLowerCase().indexOf(recherche.toLowerCase())>-1 || item.telephone.indexOf(recherche)>-1 || item.date.indexOf(recherche)>-1
)
    }

    console.log(rv);
    console.log(ajouter)
    console.log('report : '+report)
    return (
        <section id="main-content" >
            <section className="wrapper">
                <div className="row mt" >
                    <div className="col-md-12" style={{ margintTop:0, marginLeft:30}}>
                        <div className="row text-center">
                             <div className="container col-md-11">
                                 <div className="card mt-4" style={{ height:"100%" }}>
                                 <div className="card-header ">
                        <h3 className="pull-left">Mes demandes de rendez-vous</h3>
                        <div className="pull-right">
                <button className="btn mr-4 text-center" style={{background: "#6610f2",color:"white",borderRadius:"100%" }}><i className="fa fa-plus" onClick={afficherForm}></i></button>
                <a href="#" className="btn btn-success ml-4" style={{ background: '#6610f2',color:'white',bordeRadius:"100%" }}><i className="fa fa-refresh"></i></a>
            </div>
                   </div>
                                     <div className="card-body">
                                         <div className="pull-right col-md-3">
                                         <div className="form-group mb-3 row">
                                        <span className="col-md-4 mt-2">rechercher</span>
                                         <input type="text" name="recherche" value={recherche} className="form-control col-md-8" onChange={(e)=>rechercher(e.target.value)} />
                                         </div>
                                         </div>
                                         <table className="table table-bordered  text-center border border-collapses " cellPadding={0} cellSpacing={0}>
                                             <thead style={{fontSize: 15,background:"black",color:"white"}}>
                                                 <tr>
                                                    <th>#</th>
                                                     <th>Prenom</th>
                                                     <th>Nom</th>
                                                     <th>Adresse</th>
                                                     <th>Telephone</th>
                                                     <th>Date</th>
                                                     <th>Heure</th>
                                                     <th>etat</th>
                                                     <th>Action</th>
                                                 </tr>
                                             </thead>
                                             <tbody style={{ fontSize:12 }}>
                                                 { rv && filtrer(rv).map((item,index)=>
                                                    <Rendezvous 
                                                        key={item.id} 
                                                        rv={item} 
                                                        index={index+1} 
                                                        accepter={accepter} 
                                                        refuser={refuser}
                                                        reporter={reporter}
                                                    />
                                                 )
                                                 }
                                             </tbody>

                                         </table>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                   
                </div>
                {
                    ajouter && <AjoutRendezvous onClose={onClose} aff={ajouter} />
                }

                {
                    report && <Reporter repport={report} repporter={reporter} info={info} modifier={modifier}  />
                }
            </section>
        </section>
    )
}

export default ListeDemande;