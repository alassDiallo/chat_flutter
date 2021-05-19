import React,{useState,useEffect} from 'react'
import Connexion from '../../controller/Connexion'

export default function dataTable() {

    const [data,getData] = useState(null)
    const [f,filtre] = useState(null)
    useEffect(()=>{
        donnee() 
    },[])

   const  donnee = async ()=>{

        const reponse = await Connexion.recuperation("listeRendezvous");
        getData(reponse)
    }

    return (
        <div>
            
        </div>
    )
}
