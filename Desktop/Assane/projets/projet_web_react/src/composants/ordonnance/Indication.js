import { translateRect } from "@fullcalendar/common";
import React, { useState,useEffect } from "react";
import Modal from 'react-modal'
import Connexion from "../../controller/Connexion";
import './css.css'
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// // import { useDispatch } from "react-redux";
// // import { createContact } from "actions/contacts";

const Indication = (props) => {

    const [over,ouvrir]=useState(true)
    const [erreur,setErreur]=useState(false)
    const [date,setDate]=useState("")
    const [indication,setindication]=useState(props.indication);
    const [quantite,setQuantite]=useState(1)
    

   async function valider(e){
       e.preventDefault();
        var donnees = {
            'indication':indication,
            'quantite':quantite
        }
        console.log(donnees)
        props.modif(donnees)
        props.onClose()
        console.log("valider")
        // var reponse = await Connexion.modifier("rendezvous/"+props.info.id,donnees);
        // if(reponse.error){
        //     console.log(reponse.error)
        //     document.getElementById('info').classList.add('is-invalid')
        //     setErreur(true);
        //     // onClose()
        //     return
        // }
        // document.getElementById('info').classList.remove('is-invalid')
        // setErreur(false);
        //props.();
        // props.modifier(props.info.id)
        // console.log(reponse)
    }
    

 const h = (e)=>{
    console.log('indication')
        setQuantite(e.target.value)
    }

    const n = (e)=>{
       
        setindication(e.target.value)
       }

    //    const n = (e)=>{
    //     console.log(e.target.value)
    //     setindication(e.target.value)
    //    }

    return (
        <Modal isOpen={props.aff}
        onRequestClose={()=>props.onClose()
        }
        appElement={document.getElementById("root")}
            style={{overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex:999
            },
            content: {
                border:'none',
                position: 'absolute',
                top: '50%',
                //width:'500px',
                height:'70%',
                left: '50%',
                // right: '40px',
                // bottom: '40px',
                transform:'translate(-50%,-50%)',
                // border: '1px solid #ccc',
                backgroundColor: 'transparent',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                // borderRadius: '4px',
                // outline: 'none',
                // padding: '20px'
              }
              }}
        >
            {
            console.log(date)}
            {console.log(indication)
            }
       <div className=""  id="">
        <div className="">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title ">Indication du medicament</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
            </div>
            <div className="modal-body">
                <form className="" id="forma" onSubmit={valider}>
                    <div className="form-group mb-3">
                          <label htmlFor="indication">Indication ou posologie</label>
                          <input type="text" placeholder="veuillez entrez les informations du patient" name="indication" id="indication" className="form-control" maxLength=""  value={indication} onChange={n} required style={{ fontSize:14 }} />
                          {/* { erreur && <span className="erreur" id="erreur_info" style={{ color: 'red'}}>le patient n'existe pas</span>} */}
                      </div>
                      {/* <div className="form-group mb-3">
                          <label htmlFor="date">Date</label>
                          <input type="date" placeholder="veuillez choisir la date" min={new Date().toISOString().slice(0,10)} max="" name="dater" id="dater" className="form-control" value={date} onChange={d}  required />
                          <span className="erreur" id="erreur_dater"></span>
                      </div> */}
                      <div className="mb-3">
                        <label htmlFor="indication">Quantité</label>
                        <input type="text" placeholder="veuillez choisir la quantité" className="form-control" value={quantite} onChange={h} name="quantite" id="quantite" required />
                        {/* <span className="erreur" id="erreur_indicationr"></span> */}
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">annuler</button>
                        
                      </div>
                </form>    
            </div>
        </div>
        </div>
        </div>
    
        </Modal>
    )
};

export default Indication;
