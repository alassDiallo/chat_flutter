import { translateRect } from "@fullcalendar/common";
import React, { useState,useEffect } from "react";
import Modal from 'react-modal'
import Connexion from "../../controller/Connexion";
import './css.css'
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// // import { useDispatch } from "react-redux";
// // import { createContact } from "actions/contacts";

const Reporter = (props) => {

    const [over,ouvrir]=useState(true)
    const [erreur,setErreur]=useState(false)
    const [date,setDate]=useState(props.info.date)
    const [heure,setHeure]=useState(props.info.heure.replace('h',':'))
    const [numero,setNumero]=useState("")

   async function valider(e){
       e.preventDefault();
        var donnees={
            'dater':date,
            'heurer':heure,
        }
        var reponse = await Connexion.modifier("rendezvous/"+props.info.id,donnees);
        if(reponse.error){
            console.log(reponse.error)
            document.getElementById('info').classList.add('is-invalid')
            setErreur(true);
            // onClose()
            return
        }
        // document.getElementById('info').classList.remove('is-invalid')
        // setErreur(false);
        //props.();
        props.modifier(props.info.id)
        console.log(reponse)
    }
    

 const h = (e)=>{
    console.log('heure')
        setHeure(e.target.value)
    }

    const d = (e)=>{
       
           setDate(e.target.value)
       }

    //    const n = (e)=>{
    //     console.log(e.target.value)
    //     setNumero(e.target.value)
    //    }

    return (
        <Modal isOpen={props.repport}
        onRequestClose={()=>props.repporter()
        }
        appElement={document.getElementById("root")}
            style={{overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
            {console.log(heure)
            }
       <div className=""  id="">
        <div className="">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title ">Reporter le  rendez-vous</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.repporter}></button>
            </div>
            <div className="modal-body">
                <form className="" id="forma" onSubmit={valider}>
                    {/* <div className="form-group mb-3">
                          <label htmlFor="date">Information patient(Telephone/reference/numeroCIN/email)</label>
                          <input type="text" placeholder="veuillez entrez les informations du patient" name="info" id="info" className="form-control" maxLength="12"  value={numero} onChange={n} required style={{ fontSize:14 }} />
                          { erreur && <span className="erreur" id="erreur_info" style={{ color: 'red'}}>le patient n'existe pas</span>}
                      </div> */}
                      <div className="form-group mb-3">
                          <label htmlFor="date">Date</label>
                          <input type="date" placeholder="veuillez choisir la date" min={new Date().toISOString().slice(0,10)} max="" name="dater" id="dater" className="form-control" value={date} onChange={d}  required />
                          <span className="erreur" id="erreur_dater"></span>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="heure">Heure</label>
                        <input type="time" placeholder="veuillez choisir l'heure" className="form-control" value={heure} onChange={h} name="heurer" id="heurer" required />
                        <span className="erreur" id="erreur_heurer"></span>
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

export default Reporter;
