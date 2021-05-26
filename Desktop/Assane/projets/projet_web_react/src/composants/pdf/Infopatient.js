import { translateRect } from "@fullcalendar/common";
import React, { useState } from "react";
import Modal from 'react-modal'
import Connexion from "../../controller/Connexion";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// // import { useDispatch } from "react-redux";
// // import { createContact } from "actions/contacts";

const Infopatient = (props) => {

    const [over,ouvrir]=useState(true)
    const [erreur,setErreur]=useState(false)
    const [date,setDate]=useState(props.date)
    const [heure,setHeure]=useState("")
    const [numero,setNumero]=useState("")

   async function valider(e){
       e.preventDefault();
       var info={
        info:numero
       }
        var reponse = await Connexion.recuperation("recherche/"+numero);
        if(reponse.error){
            console.log(reponse.error)
            document.getElementById('info').classList.add('is-invalid')
            setErreur(true);
            // onClose()
            return
        }
        document.getElementById('info').classList.remove('is-invalid')
        setErreur(false);
        console.log(reponse)
        props.onClose()
        props.patient(reponse)
    }

 const h = (e)=>{
    //  console.log(e.taget.value)
        setHeure(e.target.value)
    }

    const d = (e)=>{
        //console.log(e.taget.value.toString())
           setDate(e.target.value)
       }

       const n = (e)=>{
        console.log(e.target.value)
        setNumero(e.target.value)
       }

    return (
        <Modal isOpen={props.info}
        onRequestClose={()=>props.onClose()
        }
        appElement={document.getElementById("root")}
            style={{overlay: {
                position: 'fixed',
                zIndex:99,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
               
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
           
       <div className=""  id="">
        <div className="">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title ">Ajouter un rendez-vous</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
            </div>
            <div className="modal-body">
                <form className="" id="forma" onSubmit={valider}>
                    <div className="form-group mb-3">
                          <label htmlFor="date">Information patient(Telephone/reference/numeroCIN/email)</label>
                          <input type="text" placeholder="veuillez entrez les informations du patient" name="info" id="info" className="form-control" maxLength="12"  value={numero} onChange={n} required style={{ fontSize:14 }} />
                          { erreur && <span className="erreur" id="erreur_info" style={{ color: 'red'}}>le patient n'existe pas</span>}
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
//     // const dispatch = useDispatch();

//     const [inputs, setInputs] = useState({ name: "", phone: "" });

//     // const updateFormValue = ({ target: { name, value } }) =>
//     //     setInputs(inputObj => ({ ...inputObj, [name]: value }));

//     const Infopatient = () => {
//         console.log(inputs);
//         // dispatch(createContact({ ...inputs }));
//         onClose();
//     };

//     return (
//         <Modal show={true} onHide={onClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>New Contact</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                <h1>bonjour</h1>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onClose}>
//                     Close
//                 </Button>
//                 <Button variant="primary" onClick={Infopatient}>
//                     Add Contact
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
};

export default Infopatient;
