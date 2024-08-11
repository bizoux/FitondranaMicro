<template>
<!-- FORMULAIRE INSCRIPTION -->
<div class="container-fluid">
    <div class="row">
    <div class="col-sm-6 partie-fond" id="fond">

      <img v-bind:src="Logo" alt="Logo">
    </div>
    
    <div class="col-sm-6 partie-Authentification" id="Seconnecter">
    
      
   <form @submit.prevent="AjoutContribuable()" style="text-align: center;">
    <h1 style="color:white;border: 1px solid rgba(219, 219, 219, 0.4); border-radius:10px; padding: 10px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Bienvenue sur OnlineNIF</h1>
    <h2 style="text-align: center; font-family: Verdana, Geneva, Tahoma, sans-serif; border-bottom: 3px solid rgb(91, 122, 215); color: white; box-shadow: 10px 10px 10px 10x black;">INSCRIPTION</h2>
    <p style="color:white;">Veuillez remplir les champs pour s'inscrire</p>
    <p v-if='this.messageErreur' class="alert alert-danger" id="largeur">{{ messageErreur.erreur }}</p>  
  <div id="aligner">
    <div class="input-group" style="width: 250px; padding: 10px;">
      <input type="text" v-model="Contribuable.NIF" disabled class="form-control">
    </div>

    <div class="input-group" style="width: 250px; padding: 10px;">
      <input type="text" placeholder="Nom" v-model="Contribuable.Nom" required class="form-control">
    </div>
  </div>
    

  <div id="aligner">
    <div class="input-group" style="width: 250px; padding: 10px;">
      <input type="text" placeholder="Prénom" v-model="Contribuable.Prenom" class="form-control">
    </div>

    <div class="input-group" style="width: 250px; padding: 10px;">
      <input type="text" placeholder="Numéro CIN" v-model="Contribuable.NumCIN" required class="form-control">
    </div>
  </div>

    
  <div id="aligner">
    <div class="input-group" style="width: 250px; padding: 10px;">
      <input type="email" placeholder="Adresse email" v-model="Contribuable.Email" required class="form-control">
    </div>

    <div class="input-group" style="width: 250px; padding: 10px;">
      <input type="text" placeholder="Adresse" v-model="Contribuable.Adresse" required class="form-control">
    </div>
  </div>

  <div id="aligner">
    <div class="input-group" style="width: 250px; padding: 10px;">
      <input type="text" placeholder="Numéro téléphone" v-model="Contribuable.NumTelephone" required class="form-control">
    </div>
    
    <div class="input-group" style="width: 250px; padding: 10px;">
      <input type="password" placeholder="Mot de passe" v-model="Contribuable.MotDePasse" required class="form-control">
    </div>
  </div>

  <div style="display:flex; justify-content: center;"> 
    <div class="input-group" style="width: 250px;">
      <input type="password" placeholder="Confirmation du mot de passe" v-model="Contribuable.ConfirmMotDePasse" required class="form-control">
    </div>
  </div>  

    <span class="badge">Vous avez déja un compte ?</span><router-link to="/" style="font-size: 15px;">Se connecter</router-link><br>
    
    <button type="submit" class="btn btn-primary">
    <span v-if="chargement" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Ajouter
    </button>
  </form>
   </div>
</div>
</div>

 </template>
 <script>
 import axios from "axios";
 export default{
     name:"PageInscription",
     data() {
    return {
        Logo:"src/image/logoDGI.png",
        Contribuable:{
            NIF:"",
            Nom:"",
            Prenom:"",
            NumCIN:"",
            Adresse:"",
            Email:"",
            NumTelephone:"",
            MotDePasse:"",
            ConfirmMotDePasse:""
        },
        messageErreur:'',
        chargement:false
    };
  },
  mounted:function(){
        this.ValeurAleatoireNif();
    },
     methods:{
      annuler:function(){
        this.Nom = "",
        this.Prenom = "",
        this.NumCIN = "",
        this.Adresse = "",
        this.Email = "",
        this.NumTelephone = "",
        this.MotDePasse = "",
        this.ConfirmMotDePasse = ""
      },
        AjoutContribuable:function(){
        this.chargement=true;
        axios.post("http://localhost:3000/AjoutContribuable", this.Contribuable).then(response=>{
            this.annuler();
            this.MessageAjout();
            this.messageErreur=false;
            this.chargement=true;
            this.$router.push('/');
            console.log("avec succès");
        }).catch((error)=>{
            this.messageErreur=error.response.data;
            console.log(this.messageErreur);
            this.chargement=false;
        })
    },
    MessageAjout:function(){
      this.$swal({
        icon:'success',
        title:'Ajout du nouveau contribuable le NIF'+' '+this.Contribuable.NIF,
        text:'avec succès!',
        timer:2500,
        showConfirmButton:false
      })
      },
        inscrire:function(){
            this.$router.push('/');
        },
        ValeurAleatoireNif() {
      // Générer un nombre aléatoire de 10 chiffres
      const min = 1000000000; // 10 chiffres minimum
      const max = 9999999999; // 10 chiffres maximum
      this.Contribuable.NIF = Math.floor(Math.random() * (max - min + 1)) + min;
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
    padding: 30px;
}
#aligner{
  display: flex;
  justify-content: space-between;
}
img{
    border:3px solid rgb(255, 255, 255);
    width:150px;
    margin-top:30%;
    margin-left:210px;
    border-radius: 15px;
} 
 </style>