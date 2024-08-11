<template>
<div class="container-fluid couleurContainer">
<!-- NAVIGATION -->

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
        <li><div><center><b>NIF: </b>{{Utilisateur.userId}}</center></div></li><hr>
        <li><div><center>{{Utilisateur.Nom}}&nbsp;{{Utilisateur.Prenom}}</center></div></li>
        <hr>
        <li><center><button @click="deconnexion()">Se deconnecter</button></center></li>
      </ul>
    </div>
        </div>
</div>


<!-- FIN LIGNE1 -->
</div>

<!-- LIGNE 2 -->
<br>
<div class="row ligne2">
        <div class="col-md-5 ligne2Col2P">
          <b>Liste des paiements</b>          
        </div>

        <div class="col-md-4 ligne2Col2">
            <router-link to="/AjoutPaiement">Ajout du paiement</router-link>
        </div>

        <div class="col-md-3 ligne2Col2">
            
        </div>
</div>


<div class="row">    
    
    <div class="col-md-5 Recherche">
        
    </div>

        

    <div class="col-md-4 Recherche">
        <div class="input-group">
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="search"/></span>
        <input type="text" placeholder="Rechercher date ou reference du paiement..." class="form-control" v-model="Recherche"/>
    </div>
    </div>
    <div class="col-md-3 Recherche">
        
    </div>

</div>

<!-- RESULTAT RECHERCHE -->

<div class="row ligne4">
        <div class="col-md-5 message">

        </div>

        <div class="col-md-4 message">
            <!-- Message de recherche -->
        <div class="alert alert-success" v-if="this.Recherche && getFilterPaiement.length > 0" id="largeur">
            {{getFilterPaiement.length}} resultat<span v-if="getFilterPaiement.length>1">s</span> trouvé<span v-if="getFilterPaiement.length>1">s</span>
        </div>
   
        </div>

        <div class="col-md-3 message">

        </div>
    </div>






<!-- CHARGEMENT -->

<div class="row">

<div class="col-md-4 chargement">

</div>


<div class="col-md-4 chargement">
<!-- Chargement de données -->
<!-- <div class="spinner-border" v-if="this.loading" id="tailleLoader"></div> -->
<img v-bind:src="imageChargement" alt="imageChargement" v-if="this.loading">
</div>

<div class="col-md-4 chargement">

</div>


</div>



<!-- LIGNE 3 -->

<div class="row">


  <div class="col-md-3 ligne3Col1">

  </div>

  <div class="col-md-8 ligne3Col2">
    <div id="RechercheNonTrouver" v-if="messageNonTrouver || getFilterPaiement.length == 0">
    
      <img v-bind:src="imageNonTrouver" alt="imageRecherche" style="width:140px;">
      <p v-if="messageNonTrouverBase">Aucun paiement trouvé</p>  
      <p>{{ NonTrouver }}</p>
    
    </div>   
<table class="table table-light table-striped table-hover" v-if="ChargementDonnee && getFilterPaiement.length>0">
        <thead>
            <tr>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">RefPaiement</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">NIF</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">idDeclaration</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">DatePaiement</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Montant</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">ModePaiement</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Action</th>
                
            </tr>
        </thead>

        <tbody>
            <tr v-for="Paiement in getFilterPaiement" v-bind:key="Paiement.RefPaiement">
                <td>{{Paiement.RefPaiement}}</td>
                <td>{{Paiement.NIF}}</td>
                <td>{{Paiement.idDeclaration}}</td>
                <td>{{formatDate(Paiement.DatePaiement)}}</td>
                <td>{{Paiement.Montant}}</td>
                <td>{{Paiement.ModePaiement}}</td>
                <td v-if='Paiement.statut == "Paye"'>
                    <router-link :to="{name:'RecepisseDeclaration', params:{RefPaiement: Paiement.RefPaiement}}"><button class="btn btn-success">Voir</button></router-link>
            
                </td>
                <td v-if='Paiement.statut == "En attente"' style="color:rgb(243, 152, 49);">Attente de validation</td>
            </tr>
            
        </tbody>
    </table>
  </div>

  <div class="col-md-1 ligne3Col1">

  </div>


  
  
  </div>




</div>
</template>
<script>
import moment from 'moment';
import axios from 'axios';
export default{
    name:"Paiement",
    data(){
        return{
            Paiements:[],
            Recherche:"",
            activeMenuItem: '',
            Logo:"src/image/logoDGI.png",
            pageProtegee:true,
            messageNonTrouverBase: true,
            imageChargement:"src/image/loader-unscreen.gif",
            imageNonTrouver:"src/image/NonTrouver.png",
            loading: true,
            NonTrouver:'',
            messageNonTrouver:false,
            ChargementDonnee:false,
            Utilisateur:{
              userId:'',
              Nom:'',
              Prenom:''
            }
        }
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
          this.ListePaiement();
        })
    },
    computed:{
      getFilterPaiement() {
    return this.Paiements.filter(Paiement => {
        const DatePaiement = moment(Paiement.DatePaiement).format('DD/MM/YYYY').toLowerCase().includes(this.Recherche.toLowerCase());
        const RefPaiement = Paiement.RefPaiement.toString() === this.Recherche;
        return DatePaiement || RefPaiement;
    });
}

    },
    methods: {
      formatDate(Date){
          return moment(Date).format('DD/MM/YYYY');
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
        this.activeMenuItem = 'Paiement';
        this.pageProtegee=true;
        this.$router.push('/Paiement');
      },
      ListePaiement:function(){
            axios.get("http://localhost:3000/listePaiement/"+this.Utilisateur.userId).then((response)=>{
              if(response.status == 200){
                this.Paiements=response.data;    
                this.loading= false;
                this.ChargementDonnee= true;
            }
            
        }).catch((err)=>{
          this.loading = false;
          this.NonTrouver = err.response.data.title;
          this.ChargementDonnee = false;
          this.messageNonTrouver = true;
          this.messageNonTrouverBase = false;

        })
        },
    }
}
</script>
<style scoped>
#RechercheNonTrouver{
  height: 400px;
}
#RechercheNonTrouver img{
  margin-top:65px;
}
.ligne3Col2{
  display:flex;
  justify-content:center;
}
#largeur{
    width:300px;
    text-align: center;
}
.message{
display:flex;
justify-content: center;
}
  .dropdown{
    text-align: end;
  }
  .ligne1Col2{
    height:45px;
  }
table{
    width:765px;
}

.Recherche{

display:flex;
align-items: center;
height:50px;
}
.ligne2Col2P{
  display:flex;
  justify-content: right;
  align-items: center;
  background:white;
  height:50px;

}

.ligne2Col2{
  display: flex;
  justify-content: center;
}
.ligne2Col2{
  
  display:flex;
  align-items: center;
  background:white;
  height:50px;
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
.ligne1Col2{ 
  display:flex;
  justify-content: right;
  padding: 5px;
}
.couleurContainer{
  background:rgb(147, 161, 173,0.3); 
  min-height:100vh;
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