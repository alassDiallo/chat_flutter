import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,NavLing} from 'react-router-dom';
import axios from 'axios';
// import { data } from 'jquery';
import image from '../images/hand-drawn-patient-taking-medical-examination_52683-56720.jpg'
import im from '../images/logoJic.png'
import Connexion from '../controller/Connexion'
class Login extends Component{
  
    constructor(props){
        super(props);
    this.state={
    email:'',
    mp:'',
    er:false,
    isConnecte:false
   }
}
     connexion = async event=>{
        event.preventDefault();
        this.setState({
            isConnecte:true
        })
        console.log('valider');
      const  user = {
            "email":this.state.email,
            "password":this.state.mp
        }

        const reponse = await Connexion.envoiDedonnee("login",user);
        console.log(this.props)
        console.log(reponse);
        if(reponse.success){
           localStorage.setItem('token',reponse.token);
           localStorage.setItem('user',JSON.stringify(reponse.user));
           localStorage.setItem('utilisateur',JSON.stringify(reponse.utilisateur));
            console.log(reponse.success)
            this.setState({isConnecte:false})
            console.log(reponse.user.profil)
            console.log(reponse.utilisateur)
            switch (reponse.user.profil) {
                case "medecin":
                    this.props.history.push('/accueil');
                    break;
                    case "admin":
                    console.log("admin");
                    break;
                    case "volontaire":
                    console.log("volontaire");
                    break;
            
                default:
                    console.log("pas un utilisateur")
                    break;
            }
            
        }
    //   axios.post("http://192.168.1.6:8000/api/auth/login",user)
    //         .then(response=>{
    //            // var donnee = JSON.parse(response.data)
    //             console.log(response.data.success)
    //             //console.log(donnee);
    //             // if(donnee.success=){

    //             //     console.log(donnee);
                  
    //             // }
                else{
                    console.log(reponse)
                    document.getElementById('email').classList.add("is-invalid");
                    document.getElementById('password').classList.add("is-invalid");
                    this.setState({
                        er:true,
                        isConnecte:false
                    })
                    console.log('login ou mot de passe incorrect');
                }
                
    //                 //localStorage.setItem('token',response.data.token);
                
    //         }).catch(error=>{
    //             console.log(error);
    //         })
            //console.log(localStorage.getItem('token'));
    }

    changeemail = e=>{
        this.setState({
            email:e.target.value
        });
    }

    // componentDidMount(){
      
    // }

    changemp = e=>{
        this.setState({
            mp:e.target.value
        });
    }
    render(){
        const d = this.state.isConnecte ?'disabled':''
        const erreur = this.state.er && <span className="invalid-feedback" role="alert" style={{ fontSize:12 }}><strong>login ou mot de passe incorrect</strong></span>
        return <div className="" style={{marginTop:0}}>
            <div className="border border-bottom">
                <img src={im} width="100px" height="80px" className="ml-4" />
            </div>
            <div className="row justify-content-center container mt-4">
            <div className="col-md-6">
                <img src={image} />
            </div>
            <div className="col-md-5 offset-1 mt-4" >
                <div className="card" style={{ height:320 }}>
                    {/* {{-- <div className="card-header">{{ __('Login') }}</div> --}} */}
    
                    <div className="card-body mt-4" >
                        <h1 className="text-center">Authentification</h1>
                        <hr/>
                        <form  onSubmit={this.connexion} className="mt-4 ml-4 mr-4 mb-4">
                            {/* @csrf */}
    
                            <div className="form-group row mt-4 mb-4">
                                {/* {{-- <label for="email" className="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label> --}} */}
    
                                <div className="col-md-12">
                                    <input id="email" type="email" 
                                     className="form-control"
                                     style={{ height:38,fontSize:14 }}
                                     name="email" value={this.state.email}
                                     onChange = {this.changeemail} 
                                     required autocomplete="email" 
                                     placeholder="entrez votre email" autofocus />
                                     {erreur}
    
                                    {/* @error('email')
                                        <span className="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror */}
                                </div>
                                
                            </div>
    
                            <div className="form-group row mt-4 mb-4">
                                {/* {{-- <label for="password" className="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label> --}} */}
    
                                <div className="col-md-12">
                                    <input id="password" 
                                    type="password" 
                                    style={{ height:38,fontSize:14 }}
                                    className="form-control" 
                                    name="password" 
                                    placeholder="entrez votre mot de passe" 
                                    required autocomplete="current-password"
                                    value={this.state.mp}
                                    onChange={this.changemp}
                                     />
    
                                    {/* @error('password')
                                        <span className="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror */}
                                </div>
                            </div>
    
                            <div className="form-group row mb-4">
                                <div className="col-md-6">
                                    <div className="form-check mr-4">
                                        <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="remember"
                                         id="remember"
                                         style={{ height:14,width:14 }}
                                         />
    
                                        <label className="form-check-label ml-2" for="remember" style={{ fontSize:14 }}>
                                            Se souvenir de moi
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    {/* @if (Route::has('password.request')) */}
                                        <a className="btn btn-link" href="#" style={{ fontSize:14 }}>
                                            mot de passe oublié?
                                        </a>
                                    {/* @endif */}
                                </div>
                            </div>
    
                            <div className="form-group row mb-4 mt-4">
                                <div className="col-md-12" >
                                    <button type="submit" className="btn btn-primary form-control text-center" style={{ height:35,fontSize:14 }} {...d}>
                                       {!this.state.isConnecte ?'Se connecter':'connexion...'}
                                    </button>
    
                                    
                                </div>
                            </div>
                        </form>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
}
export default Login;