<template>

    <div class="container-fluid couleurContainer">
    
        <!-- ROW 1 -->
    
    <div class="row ligne1" >
    
    
        <div class="col-md-5 StyleCol1">
        
        <!-- NAVIGATION -->
    
        <div id="app">
          <div class="sidebar">
            <div class="logo">
              <center><img alt="logo" src="../image/logoDGI.png"></center>
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
        <div class="col-md-3">
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
    
    <!-- FIN LIGNE 1 -->
    </div>

<!-- LIGNE 3 INSERER -->
<div class="row">
        
        <div class="col-md-7"></div>
        
      <div class="col-md-4">
        <div class="retour">
          <router-link to="/Paiement"><font-awesome-icon icon="circle-arrow-left" style="margin-top: 5px; font-size:25px;"/></router-link>
        </div>
      </div>

      <div class="col-md-1"></div>

</div>

<!-- LIGNE 3 -->
<div class="row">
      
      <div class="col-md-3 styleFiche"></div>
  
  <div class="col-md-8 ficheDeclaration" v-if="ChargementDonnee">
  <table>
    <thead>
      <tr>
        <td id="td1"><img alt="logo" src="/logoDGI.png" style="margin-left:100px;"/><br><br><b style="font-size: 15px;">Réference de paiement : </b>{{ id }}</td>
        <td><b style="font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;font-size: 25px; text-decoration: underline;">Récépissé de déclaration</b></td>
        <td></td>

      </tr>
      <tr>
        <td id="td1"><b style="font-size: 15px;">NIF : </b>{{ AfficheRecepisser.NIF }}</td>
        <td><b style="font-size: 15px;">Date de paiement : </b>{{formatDate}}<br><b style="font-size: 15px;"><br>Mode de paiement : </b>{{AfficheRecepisser.ModePaiement}}</td>
      </tr>

      
      <tr>
        <td id="td7"><b style="font-size: 15px;">Nom : </b>{{AfficheRecepisser.Nom}} &nbsp;&nbsp; {{AfficheRecepisser.Prenom}}</td>
      </tr> 
    </thead>
    <tbody>
      <tr>
        <td><b style="font-size: 15px;">Type :</b>{{AfficheRecepisser.NomType}}</td>
      </tr>
      
      <tr>
        <td><b style="font-size: 15px;">Nature : </b>{{AfficheRecepisser.Nature}}</td>
      </tr>

      <tr>
        <td><b style="font-size: 15px;">Activité : </b>{{AfficheRecepisser.Activite}}</td>
      </tr>

      <tr>
        <td id="BaseImposable"><b style="font-size: 15px;">Montant payé : </b></td>
        <td style="width:440px"  id="BaseImposable">{{AfficheRecepisser.Montant}}&nbsp;Ar</td>
      </tr>
      
    </tbody>
    
  </table>
  <br><center><div class="lettre">Arreté à la somme de **&nbsp;<strong>{{MontantLettre}} ariary</strong>&nbsp;**</div></center>  
</div>
  
  <div class="col-md-1 styleFiche"></div>
  </div>

  <!-- LIGNE 4 -->
  <br><div class="row">

<div class="col-md-4 stylePdf"></div>

<div class="col-md-4 stylePdf"></div>

<div class="col-md-4 stylePdf">
  <button @click="genererPdf()" class="btn btn-secondary">Générer en pdf</button>
</div>

</div>
    
    
    <!-- CHARGEMENT -->
        <div class="row">
    
            <div class="col-md-4 chargement">
    
            </div>
            
            
            <div class="col-md-4 chargementImage">
        <!-- Chargement de données -->
        <!-- <div class="spinner-border" v-if="this.loading" id="tailleLoader"></div> -->
        <br><br><img src="../image/loader-unscreen.gif" alt="imageChargement" v-if="this.loading">
            </div>
            
            <div class="col-md-4 chargement">
    
            </div>
    
    
        </div>

    <!-- FIN CONTAINER -->
    </div>        
    </template>
    <script>
import { NumberToLetter } from "convertir-nombre-lettre";    
import moment from 'moment';    
import jsPdf from "jspdf";
import axios from "axios";
    export default{
        name:"RecepisseDeclaration",
        data(){
            return{
                loading: true,
                activeMenuItem: '',
                pageProtegee:true,
                id:this.$route.params.RefPaiement,
                AfficheRecepisser:{
                RefPaiement:'',
                NIF:'',
                idDeclaration:'',
                DatePaiement:'',
                Montant:'',
                ModePaiement:'',
                Nom:'',
                Prenom:'',
                Nature:'',
                Activite:'',
                NomType:''
                
            },
            formatDate:'',
            Montant:'',
            MontantLettre:'',
            Utilisateur:{
          userId:'',
          Nom:'',
          Prenom:''
        },
            ChargementDonnee:false
            }
        },
        created(){
      if(localStorage.getItem('token') === null){
        console.log("annuler");
      }
      
    },
        
        methods:{

          genererPdf(){
            var doc= new jsPdf("p","pt","a3");
            doc.html(document.querySelector(".ficheDeclaration"),{
            callback: function(pdf){
            pdf.save("Recepissé de déclaration.pdf");
        },
      })
         },
         genererLettre(nb){
         return NumberToLetter(nb);
         },
         
            deconnexion(){
                localStorage.clear();
                this.$router.push('/');
            },
            recuperationPaiement:function(){
            axios.get("http://localhost:3000/AffichageRecepisser/"+this.id).then((response)=>{
                this.AfficheRecepisser.RefPaiement=response.data[0].RefPaiement;
                this.AfficheRecepisser.NIF=response.data[0].NIF;
                this.AfficheRecepisser.Nom=response.data[0].Nom;
                this.AfficheRecepisser.Prenom=response.data[0].Prenom;
                this.AfficheRecepisser.DatePaiement=response.data[0].DatePaiement;
                this.AfficheRecepisser.Montant=response.data[0].Montant;
                this.AfficheRecepisser.ModePaiement=response.data[0].ModePaiement;
                this.AfficheRecepisser.Nature=response.data[0].Nature;
                this.AfficheRecepisser.Activite=response.data[0].Activite;
                this.AfficheRecepisser.NomType=response.data[0].NomType;
                this.loading= false;
                this.ChargementDonnee=true;
                this.formatDate = moment(this.AfficheRecepisser.DatePaiement).format('DD/MM/YYYY');
                this.montantLettre();
            })
        },
        payer:function(){
            axios.get("http://localhost:3000/MontantAPayer/"+this.$route.params.idContribuable).then((response)=>{
              this.Montant=response.data[0].MontantApayer;                
              this.montantLettre();
            })
        },
        montantLettre:function(){
            axios.get("http://localhost:3000/conversion/"+this.AfficheRecepisser.Montant).then((response)=>{
              this.MontantLettre=response.data.lettre;
              console.log(this.MontantLettre);                
            })
        },
            selectMenuItem(item) {
            this.activeMenuItem = item;
            // Ajoutez ici la logique pour afficher la page correspondante
            this.$router.push({ path:'/'+ item});
          },
          activerMenu:function(){
            this.activeMenuItem = 'Paiement';
            this.pageProtegee=true;
          }
        },
         mounted:function(){
            this.activerMenu();
            this.recuperationPaiement();
            const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/proteger", {
         headers: {
          'Authorization': 'Bearer '+ token
         } 
        }).then((response)=>{
          this.Utilisateur = response.data;
        })
        },
        
    }
    </script>
    <style scoped>
.dropdown{
    text-align: end;
  }
  .ligne1Col2{
    height:45px;
  }

#BaseImposable{
  background:rgb(97, 97, 97);
  color:white;
}
#td7{
  
  width:300px;
  background:rgb(97, 97, 97);
  color:white;
}
#td1{ 
  width:245px;
  background:rgb(53, 53, 53);
  color:white;
}
    .retour{
  text-align:right;
}
    .stylePdf{
      display:flex;
      justify-content: space-evenly;

    }
    .ficheDeclaration{
      background:white;
      width:810px;
      padding:10px;
    }
    .ligne1Col2{
      display:flex;
      justify-content: right;
      padding: 5px;
    
    }
    .ligne1{
      background:#3a3f51e7;
    
    }
    #styleTitre{
        font-size:12px;
    }
    #largeur{
        width:300px;
        text-align: center;
    }
    .message{
    
        display:flex;
        justify-content: center;
        
    }
    table{
        width:750px;
        margin-left:50px;
    }
    table td{
        padding:20px;
    }
    .Recherche{
    
    
        display:flex;
        align-items: center;
        height:50px;
    }
    .StyleLigne{
        display:flex;
        align-items: center;
        background:white;
        height:50px;
    }
    .StyleLigne2{
        display:flex;
        align-items: center;
        background:white;
        height:50px;
    }
    .couleurContainer{
        background:rgb(147, 161, 173,0.3);
        min-height:100vh;
    }
    .deconnexion{
        
        padding:10px;
        background:white;
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
    h1{
        color:blue;
        border:2px solid black;
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