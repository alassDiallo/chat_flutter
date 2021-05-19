import React,{useContext,useState} from 'react'
import { useDrop } from 'react-dnd'
import Medicament from '../medicament/Medicament'
import MedocContext from './Ordonnance'

export default function Detail(props) {

    const [liste,setListe] = useState(null)

   const drop = e=>{
        e.preventDefault()
        console.log("drop")
        setListe(...liste,props.medicament)
    }

    const dragOver = e=>{

        e.preventDefault()
        console.log("dragover")
    }

    // const contexte = useContext(MedocContext)

    // const [{isOver},drop] = useDrop({
    //     accept:Medicament,
    //     drop:(item,monitor)=>console.log(item),
    //     collect:monitor=>({
    //         isOver:!!monitor.isOver()
    //     })
    // })
    return (
        <div>
            <h1>
                Ordonnance
                
            </h1>
            <div
                // onDrop={drop}
                // onDragOver={dragOver} 
            >
                {
                    props.liste!=null && props.liste.map(item=><Medicament detail={item}  key={item.idMedicament}/>)
                }
            </div>
        </div>
    )
}
