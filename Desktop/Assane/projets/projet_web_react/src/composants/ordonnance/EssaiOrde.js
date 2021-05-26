import React,{useState,useEffect} from 'react'
import {useDrag,useDrop} from 'react-dnd'
import Connexion from '../../controller/Connexion'
import Medicament from '../medicament/Medicament'
import Med from './Med'

export default function EssaiOrde() {

    const [medicament,setMedicament] = useState(null)
    const [comp,setComp] = useState([])

    const [{isOver},addToComp] = useDrop({
        accept:"comp",
        collect:(monitor)=>({
            isOver:!!monitor.isOver()

        })
    })

    const [{isOver:isCompOver},removeToPlayer] = useDrop({
        accept:"medicament",
        collect:(monitor)=>({
            isOver:!!monitor.isOver()

        })
    })

    useEffect(async()=>{
        const reponse = await Connexion.recuperation('medicament');
        setMedicament(reponse);

        console.log(reponse)
        
    },[])

  const  deplacer = item=>{
        console.log(item)
    }
    return (
        <div className="row">
            <div className="col-md-5">
            <ul className="list-group py-2 h-100" ref={removeToPlayer}>
{
    medicament.map((item,index)=>{
         <Med detail={item}
            {...item}
            key={item.idMedicament}
            index={index}
            type="medicament"
            onDropMedicament={deplacer}            />
    })
}
            </ul>
            </div>
            <div className="col-md-5">
            <ul className="list-group py-2 h-100" ref={removeToPlayer}>
{
    comp.map((item,index)=>{
         <Med detail={item}
            {...item}
            key={item.idMedicament}
            index={index}
            type="medicament"
            onDropMedicament={deplacer}            />
    })
}
            </ul>
            </div>
        </div>
    )
}
