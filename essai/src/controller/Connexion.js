import axios from "axios";

class Connexion{

     url = "http://192.168.43.100:8000/api/auth/";
     token;

     getToken(){
         const t = localStorage.getItem("token");

         t!=null?this.token = t:this.token="";
     }

    async envoiDedonnee(lien,info){
        this.getToken();

        console.log(this.token);
        try{
            console.log(this._setHeader());
            const response = await axios.post(this.url+lien,info,{headers:this._setHeader()});
            return response.data;
        }catch(error){
            console.error("erreur "+error.response);
            return false;
        }

    }


    async modifier(lien,info){
        this.getToken();

        console.log(this.token);
        try{
            console.log(this._setHeader());
            const response = await axios.put(this.url+lien,info,{headers:this._setHeader()});
            return response.data;
        }catch(error){
            console.error("erreur "+error.response);
            return false;
        }

    }

    async recuperation(lien){
        this.getToken();
        try{
            const response = await axios.get(this.url+lien,{headers:this._setHeader()})

            return response.data;
        }
        catch(error){
            console.error("erreur "+error.response);
            return false;
        }

    }

    async deconnexion(lien){

        this.getToken();
        try{
            console.log(this._setHeader())
            console.log(this.url+lien)
            const response = await axios.post(this.url+lien,{headers:this._setHeader()})
            console.log(response.data)
            return response.data
        }
        catch(error){
            console.log("erreur "+error);
            return false;
        }
    }

    _setHeader = () => {
        
      const  header = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }
        return header;
       
      }

      getUser(){

        const localstorage = localStorage.getItem('utilisateur');
        return localstorage;
      }
}

export default new Connexion();