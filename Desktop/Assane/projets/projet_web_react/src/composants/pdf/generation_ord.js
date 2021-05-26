import React,{useRef,useEffect,useState} from 'react'
// import {useReactToPrint} from 'react-to-print'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import Connexion from '../../controller/Connexion';
import logo from '../../images/logoJic.png'
import {render} from 'react-dom'
import Document from './Document';
// import ReactToPrint from 'react-to-print'

export default class GenerationOrd extends React.PureComponent {

    // const [medecin,setMedecin]=useState(null)

    // useEffect( () => {
    //   getMedecin()
    // }, )

    // async function getMedecin() {
    //     const reponse = await Connexion.recuperation('getMedecin')
    //   console.log(reponse)
    //   setMedecin(reponse)
    // }

    // console.log(props.medicament)
    render(){
    return (
        <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <button className="btn btn-primary">Imprimer</button>;
          }}
          content={() => this.componentRef}
        />
        <Document ref={el => (this.componentRef = el)} patient={this.props.patient } medicament={this.props.medicament} total={this.props.total} />
        </div>

            );
        }
   
}