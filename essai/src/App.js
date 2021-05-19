import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
// import Ordonnance from './composants/ordonnance/PrescriptionOrdonnance';
import DemoApp from './Essai';
import Login from './composants/Login';
// import Login from './composants/Login';
// import Discussion from './composants/discussion/Discussion';
// import Accueil from './composants/medecin/ComposantAccueil';
import Template from './composants/template/Template';
// import Calendrier from './composants/medecin/Calendrier'


function App() {
  // return  <Ordonnance />
  return<Router>
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/accueil" component={Template} />
 
    {/* <Template /> */}
  
  </Switch>
  </Router> 
}

export default App;
