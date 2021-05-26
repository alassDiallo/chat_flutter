import React from 'react'
import Medicament from '../medicament/Medicament'
import {Droppable} from 'react-beautiful-dnd'


export default function Medicaments(props) {
    
    return (
        
        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" className="scrollspy-example" tabindex="0" style={{  }}>
            <Droppable droppableId="1">
           {
               provided =>{
                   <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
               {props.donnees.map(
                (item,index)=><Medicament detail={item} key={item.idMedicament} index={index} />)
               }
               {provided.placeholder}
                </div>
               } 
                                    
            }
         </Droppable>
        </div>
    )
}
