<template>
<div class="container-fluid">
    <div class="row">
    <div class="col-sm-6 partie-fond" id="fond">

        <img v-bind:src="Logo" alt="Logo">
    </div>
    
    <div class="col-sm-6 partie-Authentification" id="Seconnecter">
    

   <form @submit.prevent="SeConnecter()" style="text-align: center;">
    <h1 style="color:white;border: 1px solid rgba(219, 219, 219, 0.4); border-radius:10px; padding: 10px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Bienvenue sur OnlineNIF</h1>
    <h2 style="text-align: center; font-family: Verdana, Geneva, Tahoma, sans-serif; border-bottom: 3px solid rgb(91, 122, 215); color: rgb(255, 255, 255); box-shadow: 10px 10px 10px 10x black;">CONNEXION</h2>
    <p style="color:white;">Veuillez remplir les champs pour s'authentifier</p>
    <p v-if="messageErreur" class="alert alert-danger" id="largeur">
        {{ Erreur }}
    </p>
    <div class="input-group" style="width: 200px; margin-left: 131px;">
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="user"/></span>
        <input type="number" placeholder="NIF" v-model="Connexion.NIF" required class="form-control">
    </div><br>

    <div class="input-group" style="width: 200px;margin-left: 131px;">
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="lock"/></span> 
        <input type="password" placeholder="Mot de passe" v-model="Connexion.MotDePasse" required class="form-control">
    </div>
    <span class="badge">Vous n'avez pas de compte ?</span><router-link to="/PageInscription" style="font-size: 15px;">Inscrire ici</router-link>
<br>
            
    <button type="submit" class="btn btn-primary">
    <span v-if="chargement" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Se connecter
    </button>
   </form>
   </div>
</div>
</div>
    



</template>
<script>
import App from "../App.vue";
import axios from "axios";
export default{
    name:"PageAuthentification",
    data(){
        return{
            Logo:"src/image/logoDGI.png",
            Connexion:{
                NIF:'',
                MotDePasse:''
            },
            Erreur:'',
            messageErreur:false,
            chargement:false
        }
    },
    methods:{
        SeConnecter:function(){
            this.chargement = true;
            axios.post("http://localhost:3000/SeConnecter", this.Connexion).then(response=>{
            // AVEC SUCCES
            
            if(response.status == 200){
                this.chargement = true;
                console.log(response);
                localStorage.setItem('token', response.data.token);
                this.$router.push('/Accueil');
            }

        }).catch((err)=>{
            this.Erreur=err.response.data.title;
            this.chargement = false;
            this.messageErreur = true;
        })
        },
        activerMenu:function(){
            App.methods.activerMenu();
        
        }
    }
}
</script>
<style scoped>



#fond{
    
    box-shadow:9px 9px 10px rgb(37, 37, 37);
    min-height: 100vh;
}
.partie-fond{
    background-image:url('../image/fondformulaire.jpg');
    background-size:cover;
    background-repeat:no-repeat;
    background-position: center;

}
.partie-Authentification{
    background-image:url('../image/fondformulaire2.jpg');
    background-size:cover;
    background-repeat:no-repeat;
    background-position: center;
    display:inline-flex;
    justify-content: center;
    align-items: center;
}
img{
    border:3px solid rgb(255, 255, 255);
    width:150px;
    margin-top:30%;
    margin-left:210px;
    border-radius: 15px;
}   
</style>