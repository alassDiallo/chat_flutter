import { formatRange } from '@fullcalendar/common';
import React from 'react'

const Rendezvous = (props)=>{

    const formatage = (d)=>{
       const a = d.split('-')

        return a[2]+"/"+a[1]+"/"+a[0]
    }
    
    //  const accepter = (id)=>{
    //     // e.preventDefault()
    //      alert("vous avez valider "+id)
    //  }                          
                                

    return (
        <tr>
            <td>{props.index}</td>
            <td>{props.rv.prenom}</td>
            <td>{props.rv.nom}</td>
            <td>{props.rv.adresse}</td>
            <td>{props.rv.telephone}</td>
            <td>{ formatage(props.rv.date)}</td>
            <td>{props.rv.heure}</td>
            <td>{props.rv.etat}</td>
            <td><a className="btn  btn-sm btn-success"
             href="#" data-toggle="tooltip"
              data-id="#" data-original-title="accepter" onClick={(e)=>{
                  e.preventDefault()
                  props.accepter(props.rv)}}>
                  <i className="fa fa-check" style={{color:'white'}}>
                      </i>accepter</a>
            <a className="btn  btn-sm btn-primary ml-2 mr-2" 
            href="#" data-toggle="tooltip" data-id="#" data-original-title="modifier" onClick={(e)=>{
                e.preventDefault()
                props.reporter(props.rv)}} >
                <i className="fa fa-edit" style={{color:'white'}}>
                </i>renvoyer</a>
        <a className="btn  btn-sm btn-danger" href="#" data-toggle="tooltip" data-id="#" data-original-title="supprimer" onClick={(e)=>{
                  e.preventDefault()
                  props.refuser(props.rv)}}>
                <i className="fa fa-trash-o" style={{color:'white'}} ></i>decliner</a>
            </td>
        </tr>
    )
}

export default Rendezvous;