import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDrag } from 'react-dnd'
import './style.css'


export default function Medicament(props) {

    // const [{isDragging},drag] = useDrag({
    //     item:{
    //         type:Medicament,
    //         medicament:props.detail
    //     },
    //     collect:monitor=>({
    //         isDragging: !!monitor.isDragging(),
    //     })

    // })
// const dragStart = e=>{
//     // e.preventDefault()
//     console.log("dragStart")
// }

// const dragOver = e=>{
//     e.stopPropagation();
//     console.log("dragOver")
// }

const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: props.type,
      index:props.index,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
       props.onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

const fin = e=>{
    e.preventDefault();
    console.log("fin")
}
const { provided, innerRef } = props;
const bg = isDragging?'bg-danger':""

    return (
        // <Draggable draggableId={props.detail.idMedicament} id={props.index}>
        <li className="list-group-item my-1 p-2 mb-3" ref={dragRef} onClick={()=>alert(`vous avez cliquez sur ${props.detail.libelle}`)}>
            <div className="medoc"
                //  {...provided.draggableProps}
                //  {...provided.dragHandleProps}
                //  ref={innerRef}
        // onDragStart={dragStart}
        // onDragOver={dragOver}
        // draggable="true"
        // onDragEnd={()=>props.fin(props.detail)}
        // onDrop = {()=>props.fin(props.detail)}
        //  ref={drag}
        //  opacity={isDragging?'0.5':'1'}
         ><div>
            <span style={{ fontSize:16 }}>{props.detail.libelle}</span>
            <span className="pull-right" style={{ fontWeight:"bold",fontSize:10 }}>{props.detail.prix}<br/>Fcfa</span>
            </div>
            <p className="posologie">{props.detail.posologie}</p>
        </div>
        </li>
        // </Draggable>
    )
}
