import React from 'react';
import Accueil from '../medecin/ComposantAccueil';
import Header from './Header';
import MenuBar from './MenuBar';
// import Ordonnance from '../ordonnance/Ordonnance';
import Calendrier from '../medecin/Calendrier'
import Discussion from '../discussion/Discussion'
import ListeDemande from '../rendezvous/ListeDemande'
import DemoApp from '../medecin/Essai'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Modal from '../medicament/Modal'
import Login from '../Login';
import Ordonnance from '../ordonnance/PrescriptionOrdonnance';
import Analyses from '../analyse/Analyses';
import GenerationOrd from '../pdf/generation_ord';

class Template extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            token:false
        }
    }

    getToken(){
        const t = localStorage.getItem("token");
        console.log(t)
        if(t!=null){
        return true       
    }
    return false
    }

    componentDidMount(){
        // if(this.getToken()===false)
        // this.props.history.push('/')
        // console.log(this.props)
    }


    render(){

        return(
            
        <Router>
            <Header etat={this.props} />
            <MenuBar />
        <Switch>
            
            <Route exact path="/" component={Login} />
            <Route  exact path="/accueil" component={Accueil} />
            <Route exact path="/ordonnance" component={Ordonnance} />
            <Route exact path="/prescription" component={GenerationOrd} />
            <Route exact path="/analyse" component={Analyses} />
            <Route exact path="/rendezvous" component={ListeDemande} />
            <Route exact path="/calendrier" component={Calendrier} />
            <Route exact path="/discussion" component={Discussion} />
        </Switch> 
    </Router>
    )
    }
}

export default Template;