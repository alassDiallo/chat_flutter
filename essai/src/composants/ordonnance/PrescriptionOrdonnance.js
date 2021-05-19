import React, { useState,useEffect } from "react";
// import Header from "components/Header";
//import MedicamentsJSON from "resources/data/Medicaments.json";
import { useDrag, useDrop } from "react-dnd";
// import ExternalInfo from "components/ExternalInfo";
import Connexion from "../../controller/Connexion";
import Medicament from "../medicament/Medicament";
import Med from './Med'
import './css.css'
import GenerationOrd from "../pdf/generation_ord";
import Infopatient from "../pdf/Infopatient";

const Ordonnance = () => {
  const [Medicaments, setMedicaments] = useState(null);
  const [team, setTeam] = useState([]);
  const [selct, setSelect] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [info,setInfo]=useState(false)
  const [patient,setPatient]=useState(null)
  const [generer,setGenerer]=useState(false)
  const [total,setTotal] = useState(0)
  const prix = team.map(item=>{
    return item.prix
  })

  const reducer = (accumulateur,currentValue)=>{
    return accumulateur + currentValue
  }

  

  useEffect(async () => {
    const reponse = await Connexion.recuperation('medicament');
    setMedicaments(reponse);

    console.log(reponse)
    //   return () => {
    //       cleanup
    //   }
  }, [])

  const rechercher = (e)=>{
      setRecherche(e.target.value)
    }


 const filtre = (data)=>{

    return data.filter((item)=>item.libelle.toLowerCase().indexOf(recherche.toLowerCase())> -1)        
}

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const genererPDF = ()=>{
    setInfo(!info)
    // setGenerer(true)
  }

  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const infopatient = (p)=>{
    setPatient(p)
    setGenerer(true)


  }

  const movePlayer = (item) => {
    console.log(item);
    if (item && item.type === "player") {
      //Accepting player into the team
      setTeam((_team) => [..._team,Medicaments[item.index]]);
      setMedicaments((_Medicaments) => _Medicaments.filter((_, idx) => idx !== item.index));
    } else {
      //Removing a player from team
      setMedicaments((_Medicaments) => [..._Medicaments,team[item.index]]);
      setTeam((_team) => _team.filter((_, idx) => idx !== item.index));
    }
  };
  console.log(prix)
  const dragHoverTeamBG = isOver ? "bg-warning" : "bg-light";
  const dragHoverPlayerBG = isPlayerOver ? "bg-warning" : "bg-light";
  const bouton = team.length>0 && <button className="btn btn-success form-control mt-4 mb-4" onClick={genererPDF}>valider</button>
  const comp = generer?<GenerationOrd medicament={team} patient={patient} />:<div className="row">
  <div className="">
   
    <div className="row justify-content-md-center" >
  <div className="card col-md-4 m-4 text-light" style={{ height:110,background:"blue" }}>
  <p className="mt-4"><strong>Prix total : </strong>{ team.length>0 ? prix.reduce(reducer):0} franc cfa</p>
  <p><strong>Prise en charge 80% : </strong>{ team.length>0 ? prix.reduce(reducer)*0.8:0} franc cfa</p>
  <p className="mb-4"><strong>charge patient  20% : </strong>{ team.length>0 ? prix.reduce(reducer)*0.2:0} franc cfa  {bouton}</p>
 
    </div>
    </div>

    <div className="row justify-content-md-center">
      <div className={`col-5 border m-2 ${dragHoverPlayerBG} bg-dark`}>
      <div className="border border-dark bg-dark card" style={{ height:"100%" }}>
                              <h1  className="text-center m-4 text-light">Liste des medicaments</h1><hr/>
                              <div className="mb-4 mt-4 ml-2 mr-2  row border border-light" style={{ borderRadius:50 }} >
                                  <i className="fa fa-search col-md-1 text-light mt-4" style={{ fontSize:14 }}></i>
                                  <input type="text" 
                                          className="form-control col-md-10 text-light" 
                                          style={{height:40,fontSize:14,background:"transparent",border:"none"}} 
                                          placeholder="recherche..."
                                          value={recherche}
                                          onChange={rechercher}
                                  />
                              </div>
        <ul className="list-group py-2 h-100" ref={removeFromTeamRef}>
          {Medicaments !=null && filtre(Medicaments).map((player, idx) => (
            <Medicament
              {...player}
              detail={player}
              key={player.idMedicament}
              index={idx}
              type="player"
              onDropPlayer={movePlayer}
            />
          ))}
        </ul>
        </div>
      </div>
      <div className={`col-5 border m-2 ${dragHoverTeamBG} ml-4`}>
        <div className="">
          <div className="col font-weight-bold m-4"><h1 className="text-center">Detail Ordonnance</h1><hr></hr></div>
        </div>
        
        <ul className="list-group py-2 h-100" ref={addToTeamRef}>
          {team.map((player, idx) => (
            <Med
              {...player}
              detail={player}
              key={player.idMedicament}
              index={idx}
              type="team"
              onDropPlayer={movePlayer}
            />
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>

  return (
    <>
      {/* <Header title="Team Selection (Drag And Drop)" />

      <ExternalInfo page="dnd" /> */}
  <section id="main-content" className="" style={{ background:"white" }} >
    {
        info && <Infopatient info={info} onClose={genererPDF} patient={infopatient}/>
    }
                <section className="wrapper">
                    <div className="row mt" >
                        <div className="mt-4 col-md-11" style={{ margintTop:0, marginLeft:50}}>
                            <div className="row">
                        {comp}
                            </div></div></div></section></section>
      
    </>
  );
};

// const Player = ({
//   name,
//   age,
//   nationality,
//   photo,
//   index,
//   playerType,
//   onDropPlayer,
// }) => {
//   const [{ isDragging }, dragRef] = useDrag({
//     item: {
//       type: playerType,
//       index,
//     },
//     end: (item, monitor) => {
//       const dropResult = monitor.getDropResult();

//       if (item && dropResult) {
//         onDropPlayer(item);
//       }
//     },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <li className="list-group-item my-1 p-2" ref={dragRef}>
//       <div className="card border-0">
//         <div className="row no-gutters">
//           <div className="col-md-1">
//             <img
//               src={photo}
//               className="img-thumbnail border-secondary rounded-circle"
//             />
//           </div>
//           <div className="col-md-9">
//             <div className="card-body py-1 px-2 text-left">
//               <h5 className="card-title d-inline">{name}</h5>
//               <p className="card-text d-inline">, {nationality}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </li>
//   );
// };
export default Ordonnance;