<template>
  <!-- NAVIGATION -->
  <div class="container-fluid couleurContainer">
  <div class="row ligne1">
    <div class="col-md-5">
  
  <div id="app">
        <div class="sidebar">
          <div class="logo">
            <center><img v-bind:src="Logo" alt="Logo"></center>
            <center><p>OnlineNIF</p><hr></center>
          </div>
          <ul class="menu">
            <li @click="selectMenuItem('Accueil')" :class="{ active: activeMenuItem === 'Accueil' }" v-if="this.pageProtegee">
              <font-awesome-icon icon="home" />
              <span>Accueil</span>
            </li>
            <li @click="selectMenuItem('Declaration')" :class="{ active: activeMenuItem === 'Declaration' }" v-if="this.pageProtegee">
              <font-awesome-icon icon="file-alt" />
              <span>Télédéclaration</span>
            </li>
            <li @click="selectMenuItem('Paiement')" :class="{ active: activeMenuItem === 'Paiement' }" v-if="this.pageProtegee">
              <font-awesome-icon icon="credit-card" />
              <span>Télépaiement</span>
            </li>
            <li @click="selectMenuItem('Annexe')" :class="{ active: activeMenuItem === 'Annexe' }" v-if="this.pageProtegee">
              <font-awesome-icon icon="info-circle" />
              <span>Annexe</span>
            </li>
          </ul>
        
      </div>
    </div>  
  </div>
  
  <div class="col-md-7 ligne1Col2">
          <div class="col-md-3 deconnexion">
            <div class="dropdown">
        <a href="#" class="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="../image/user.png" class="rounded-circle" style="width:36px;"> <!-- Icône arrondie (ex : Font Awesome) -->
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:250px;background: rgb(228, 228, 228);">
          <li><div><center><b>NIF: </b>{{Utilisateur.NIF}}</center></div></li><hr>
          <li><div><center>{{Utilisateur.Nom}}&nbsp;{{Utilisateur.Prenom}}</center></div></li>
          <hr>
          <li><center><button @click="deconnexion()">Se deconnecter</button></center></li>
        </ul>
      </div>
          </div>
  </div>
  
  
  </div>
  
  <!-- LIGNE 2 -->
  <br>
  <div class="row ligne2">
          <div class="col-md-6 ligne2Col2">
              
          </div>
  
          <div class="col-md-6 ligne2Col2">
              <b><font-awesome-icon icon="user"/>&nbsp;&nbsp;Creation compte bancaire</b>
          </div>
  </div>
  
  <!-- LIGNE 3 -->
  <div class="row ligne3Col3">
  
  <div class="col-md-3">
  
  </div>
  
  <div class="col-md-9">
  
    <!-- Contenu de la page Ajout du déclaration-->
    <div class="retour">
      <router-link to="/AjoutPaiement"><font-awesome-icon icon="circle-arrow-left" style="margin-top: 5px; font-size:25px;"/></router-link>
    </div>
    
    <div class="formulaire">
      
      <!-- FORMULAIRE -->

      <form @submit.prevent="AjoutCompteBancaire()" style="text-align: center;">  
  <div id="aligner">
    <div class="form-group" style="width: 259px; padding: 10px;">
      <label style="color:rgb(14, 14, 14);font-size:14px;margin-right:98px;"><b>Numero de compte</b><span style="color:red">*</span></label>
      <input type="text" v-model="banque.NumCompte" class="form-control">
    </div>

    <div class="form-group" style="width: 259px; padding: 10px;">
      <label style="color:rgb(14, 14, 14);font-size:14px;margin-right:120px;"><b>Nom du titulaire</b><span style="color:red">*</span></label>
      <input type="text"  v-model="banque.NomTitulaire" required class="form-control">
    </div>

  </div>
    

  <div id="aligner">
    <div class="form-group" style="width: 259px; padding: 10px;">
      <label style="color:rgb(14, 14, 14);font-size:14px;margin-right:115px;"><b>Date d'ouverture</b><span style="color:red">*</span></label>
      <input type="date" v-model="banque.dateOuverture" required class="form-control">
    </div>

    <div class="form-group" style="width: 259px; padding: 10px;">
      <label style="color:rgb(14, 14, 14);font-size:14px;margin-right:130px;"><b>Adresse email</b><span style="color:red">*</span></label>
      <input type="email" v-model="banque.Email" required class="form-control">
    </div>


  </div>

  <div id="aligner">
    <div class="form-group" style="width: 259px; padding: 10px;">
      <label style="color:rgb(14, 14, 14);font-size:14px;margin-right:190px;"><b>Solde</b><span style="color:red">*</span></label>
      <input type="number" v-model="banque.Solde" required class="form-control">
    </div>

    <div class="form-group" style="width: 259px; padding: 10px;">
      <label style="color:rgb(14, 14, 14);font-size:14px;margin-right:100px;"><b>Nom de la Banque</b><span style="color:red">*</span></label>
      <input type="text" v-model="banque.NomBanque" class="form-control">
    </div>
  </div>
  <div id="aligner">
    
    <div class="form-group" style="width: 259px; padding: 10px;">
      <label style="color:rgb(14, 14, 14);font-size:14px;margin-right:135px;"><b>Mot de passe</b><span style="color:red">*</span></label>
      <input type="password" v-model="banque.MotDePasse" required class="form-control">
    </div>

    <div class="form-group" style="width: 259px; padding: 10px;">
      <label style="color:rgb(14, 14, 14);font-size:14px;margin-right:25px;" ><b>Confirmation de mot de passe</b><span style="color:red">*</span></label>
      <input type="password" v-model="banque.ConfirmMotDePasse" required class="form-control">
    </div>

  </div>
    
  <div class="boutonAjouterCompte">
    <button type="submit" class="btnAjout">Ajouter</button>&nbsp;&nbsp;
    <input type="button" class="btnAnnuler" @click="annuler()" value="Annuler">
  </div>
    
  </form>






      <!-- Fin Contenu de la page Ajout du déclaration-->
    </div>
      
  
  </div>
  
  </div>
  
  
  </div>
          
  
  
      
          
  </template>


<script>
import axios from "axios";
export default{
    name:"NouveauCompteBancaire",
    data(){
        return{
            activeMenuItem: '',
            Logo:"src/image/logoDGI.png",
            pageProtegee:true,
            banque:{
              NumCompte:'',
              NomTitulaire:'',
              NomBanque:'',
              Solde:'',
              dateOuverture:'',
              Email:'',
              MotDePasse:'',
              ConfirmMotDePasse:""

            },
            Utilisateur:{
        NIF:'',
        Nom:'',
        Prenom:''
      },
        }
    },
    mounted:function(){
        this.activerMenu();
        const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/proteger", {
         headers: {
          'Authorization': 'Bearer '+ token
         } 
        }).then((response)=>{
          this.Utilisateur.NIF = response.data.userId;
          this.Utilisateur.Nom = response.data.Nom;
          this.Utilisateur.Prenom = response.data.Prenom;
        })
    },
    methods:{
      AjoutCompteBancaire:function(){
        this.chargement=true;
        axios.post("http://localhost:3000/AjoutCompteBancaire", this.banque).then(response=>{
            this.MessageAjout();  
            console.log("avec succès");
        }).catch((error)=>{
            this.messageErreur=error.response.data;
        })
    },
    annuler(){
        this.banque.NomTitulaire="",
        this.banque.Email="",
        this.banque.ConfirmMotDePasse="";
        this.banque.NomBanque="",
        this.banque.Solde="",
        this.banque.dateOuverture=""
      },
    MessageAjout:function(){
      this.$swal({
        icon:'success',
        title:'Ajout du nouveau compte bancaire',
        text:'avec succès!',
        timer:2500,
        showConfirmButton:false
      })
      },
        deconnexion(){
            localStorage.clear();
            this.$router.push('/');
        },
        selectMenuItem(item) {
        this.activeMenuItem = item;
        // Ajoutez ici la logique pour afficher la page correspondante
        this.$router.push({ path:'/'+ item});
      },
      activerMenu:function(){
        this.activeMenuItem = 'Annexe';
        this.pageProtegee=true;
        this.$router.push('/CreerCompteBancaire');
      }
    },
    created(){
        if(localStorage.getItem('token') === null){
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
.boutonAjouterCompte{
  display:flex;
  justify-content:end;
  width:690px;
}
  .dropdown{
    text-align: end;
  }
  .ligne1{
  background:#3a3f51e7;

}
  .ligne1Col2{
    height:45px;
  }
.btnAnnuler{
  background-color:rgb(229, 83, 83);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 5px;
    width:90px;
}

.btnAnnuler:hover{
  background-color:rgb(229, 83, 83,0.8);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 5px;
    width:90px;
    transition:0.2s;
}
.btnAjout{
  background-color:rgb(36, 161, 250);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 5px;
    width:90px;
}

.btnAjout:hover{
  background-color:rgba(36, 161, 250,0.8);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 5px;
    width:90px;
    transition:0.2s;
}
.retour{
  text-align:right;
}
label{
  color:white;
}
.formulaire{
  
  border-radius: 8px;
  padding:20px;
  background-image:url("src/image/fondformulaire.jpg");
  background-size:cover;
  background-repeat:no-repeat;
  
}
.ligne3Col3{

  min-height:80vh;
}
.ligne2Col2{
  display:flex;
  align-items: center;
  background:white;
  height:50px;
}
.ligne2{
  background: white;
}
#aligner{
  display: flex;
  justify-content: space-evenly;
}
#alignerFin{
  display: flex;
  justify-content:space-between;
}
.btn{
  display: flex;
  justify-content: right;
}
#deconnexion{
    background-color:rgb(36, 161, 250);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 5px;
}
#deconnexion:hover{
  background-color:rgba(36, 161, 250,0.9);
}
.ligne1Col2{
  display:flex;
  justify-content: right;
  padding: 5px;
}
.couleurContainer{
  background:rgb(147, 161, 173,0.3);
  min-height: 100vh;
}
h1{
    margin-left:20%;
    border-radius:10px;
}
.sidebar {
    width: 250px;
    background-color: #3a3f51;
    color: #fff;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 25px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif, 'Times New Roman', Times, serif;
  }
  
  .logo img {
    max-width: 37%;
    
  }
  
  .menu {
    list-style-type: none;
    padding: 0;
    margin: 20px 0;
  }
  
  .menu li {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 20px;
    transition: background-color 0.5s;
  }
  .menu li:hover{
    cursor: pointer;
    transition: background-color 0.5s;
    background-color: #747881;
  
  }
  
  .menu li.active {
    background-color: #272b36;
  }
  
  .menu li span {
    margin-left: 20px;
  }
</style>