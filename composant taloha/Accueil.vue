<template>
<div class="container-fluid couleurContainer">    
    <div class="row ligne1">
      
      <div class="col-md-5 couleurCol1">
        

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
            <font-awesome-icon icon="file-alt"/>
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
        <li><div><center><b>NIF: </b>{{Utilisateur.userId}}</center></div></li><hr>
        <li><div><center>{{Utilisateur.Nom}}&nbsp;{{Utilisateur.Prenom}}</center></div></li>
        <hr>
        <li><center><button @click="deconnexion()">Se deconnecter</button></center></li>
      </ul>
    </div>
        </div>
</div>        
    
</div>

        <!-- LIGNE 2 -->
    <div class="row">

  <div class="col-md-3 ligne2Col2">

  </div>
      
  <div class="col-md-8 ligne2Col3">    
          <!-- ANIMATION IMAGE -->
          
          <br>
<div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../image/carteCredit.jpg" class="d-block w-100" alt="..." style="width:600px; height: 300px;">
    </div>
    <div class="carousel-item">
      <img src="../image/facture.jpg" class="d-block w-100" alt="..." style="width:600px; height: 300px;">
    </div>
    <div class="carousel-item">
      <img src="../image/calculatrice.jpg" class="d-block w-100" alt="..." style="width:600px; height: 300px;">
    </div>
    <div class="carousel-item">
      <img src="../image/calculatrice2.jpg" class="d-block w-100" alt="..." style="width:600px; height: 300px;">
    </div>
    <div class="carousel-item">
      <img src="../image/paiement.jpg" class="d-block w-100" alt="paiement" style="width:600px; height: 300px;">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
   
          

</div>

<div class="col-md-1 ligne2Col4">

</div>

    </div>

    <div class="row ligne3">
        <div class="col-md-3 ligne3Col1">
            <h2>1</h2>
        </div>
        <div class="col-md-8 ligne3Col2">
            <h2>Bienvenue sur OnlineNIF</h2>
            <p style="text-align:center">Ce site regroupe en un seul espace les differentes fonctionnalité (<b>Télédeclaration</b>, <b>Télépaiement</b>, <b>Consultation des annexes</b>)</p>
        </div>
        <div class="col-md-1 ligne3Col2"></div>
        <hr>
    </div>
    <div class="row ligne4">
        <div class="col-md-3 ligne4Col1">
        </div>
        <div class="col-md-8 ligne4Col2">
            <p style="text-align:justify">Ce service permet aux contribuables adhérent de liquider et de payer leurs impôts à partir de leur poste de travail en se connectant sur INTERNET. Il permet de liquider et de payer les déclarations mensuelles d'impôts: Impôts Synthetique Intermittent.</p>
        </div>
        <div class="col-md-1 ligne4Col3"></div>

    </div>

    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name:"Accueil",
    data() {
      return {
        activeMenuItem: '',
        Logo:"src/image/logoDGI.png",
        pageProtegee:true,
        Utilisateur:{
          userId:'',
          Nom:'',
          Prenom:''
        }
      };
    },
    created(){
      if(localStorage.getItem('token') === null){
        console.log("annuler");
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
          this.Utilisateur = response.data;
        })
        
    },
    methods: {
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
        this.activeMenuItem = 'Accueil';
        this.pageProtegee=true;
        this.$router.push('/Accueil');
      }
    }
  };
  
  
  </script>
  
  <style scoped>
  .dropdown{
    text-align: end;
  }
  .ligne1Col2{
    height:45px;
  }
  .ligne3Col2{
    text-align: center;
  }
  .ligne3Col2{
    width:820px;
  }
  .ligne4Col2{
    padding:6px;
    width:820px;
    opacity:96%;
    background-color: #3a3f51;
    color:white;
  }
  .ligne2Col3{
    width:820px;
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
  .ligne1{
    background:#3a3f51e7;
  }
  .couleurContainer{
  background:rgb(147, 161, 173,0.3);
  height: 100vh;
}
  .ligne1Col2{
  display:flex;
  justify-content: right;
  padding: 0px;
}
  .deconnexion{
    padding:5px;
  }
  .stylediv{
    text-align:center
  }
  img:hover{
    cursor:pointer;
    opacity:98%;
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
  .container{
    background:rgb(147, 161, 173,0.3);
    min-height: 100vh;
  }
  </style>
  
  