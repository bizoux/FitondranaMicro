<template>

    <div class="container-fluid couleurContainer">
    
        <!-- ROW 1 -->
    
    <div class="row ligne1" >
    
    
        <div class="col-md-5 StyleCol1">
        
        <!-- NAVIGATION -->
    
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
    
    <br>
        
        <div class="row ligne2">
            <div class="col-md-4 ligne2Col2P">
                
            </div>
    
            <div class="col-md-6 ligne2Col2">
                <b>ANNEXE A LA DECLARATION D'IMPOT SYNTHETIQUE INTERMITTENT</b>
            </div>
    
            <div class="col-md-2 ligne2Col2">
                
            </div>
              <!-- FIN LIGNE 2 -->
    </div>
    
        
    <!-- LIGNE 3 -->
    
    <div class="row ligne3">    
        
        <div class="col-md-5 Recherche">
            
        </div>
    
        <div class="col-md-4 Recherche">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="search"/></span>
                <input type="text" placeholder="Rechercher mode de paiement ou date du paiement...." class="form-control" v-model="Recherche"/>
                
              </div>
            
        </div>
        
        <div class="col-md-3 Recherche">
            
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
    
        <div class="row ligne4">
            <div class="col-md-5 message">
    
            </div>
    
            <div class="col-md-4 message">
                <!-- Message de recherche -->
            <div class="alert alert-success" v-if="this.Recherche && getFilterAnnexe.length > 0" id="largeur">
                {{getFilterAnnexe.length}} resultat<span v-if="getFilterAnnexe.length>1">s</span> trouvé<span v-if="getFilterAnnexe.length>1">s</span>
            </div>
   
            </div>
    
            <div class="col-md-3 message">
    
            </div>
        </div>
        
        <div class="row">
    
            <div class="col-md-3 ligne3Col1">
    
            </div>
            <center><div id="RechercheNonTrouver" v-if="messageNonTrouver || getFilterAnnexe.length == 0" style="margin-top: 10px;margin-left: 230px;">
              <img v-bind:src="imageNonTrouver" alt="imageRecherche" style="width:140px;">
              <p v-if="messageNonTrouverBase">Aucune annexe trouvée</p> 
              <p>{{ NonTrouver }}</p>

             </div>
          </center>
    
        <div class="col-md-8 table-wrapper">  
        
          
        <table class="table table-light table-striped table-hover" v-if="ChargementDonnee && getFilterAnnexe.length>0">
            <thead>
                <tr>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif"></th>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Nom et Prénom</th>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">CIN</th>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Nature de transaction</th>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Détail de transaction</th>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Date de transaction</th>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Montant de transaction</th>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Mode de paiement</th>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">ISI correspondant</th>
                    <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Adresse</th>
                    
                </tr>
            </thead>
    
            <tbody>
                <tr v-for="(annexe,index) in getFilterAnnexe" v-bind:key="annexe.RefPaiement">
                    <td>{{ index+1 }}</td>
                    <td>{{ annexe.Nom }}&nbsp;{{ annexe.Prenom }}</td>
                    <td>{{ annexe.NumCIN }}</td>
                    <td>{{ annexe.Nature }}</td>
                    <td>{{ annexe.Detail }}</td>
                    <td>{{ formatDate(annexe.DateTransaction) }}</td>
                    <td>{{ annexe.BaseImposable }}</td>
                    <td>{{ annexe.ModePaiement }}</td>
                    <td>{{ annexe.MontantDu }}</td>
                    <td>{{ annexe.Adresse }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="col-md-1 ligne3Col1">
      
    </div>
    
    
    </div>
    
    
    <!-- FIN CONTAINER -->
    </div>        
    </template>
    <script>
    import moment from 'moment';
    import axios from "axios";
    export default{
        name:"Annexe",
        data(){
            return{
                annexes:[],
                Recherche:"",
                loading: true,
                messageNonTrouverBase: true,
                imageNonTrouver:"src/image/NonTrouver.png",
                imageChargement:"src/image/loader-unscreen.gif",
                activeMenuItem: '',
                Logo:"src/image/logoDGI.png",
                pageProtegee:true,
                ChargementDonnee:false,
                Utilisateur:{
              userId:'',
              Nom:'',
              Prenom:''
            },
            messageNonTrouver:false,
            NonTrouver:''
            }
        },
        created(){
          if(localStorage.getItem('token') === null){
            console.log("annuler");
          }
          
        },
        computed:{
   getFilterAnnexe(){
     return this.annexes.filter(annexe => {
       return moment(annexe.DateTransaction).format('DD/MM/YYYY').toLowerCase().includes(this.Recherche.toLowerCase()) || annexe.ModePaiement.toLowerCase().includes(this.Recherche.toLowerCase())

     })
   }
},
        methods:{
          formatDate(Date){
          return moment(Date).format('DD/MM/YYYY');
        },
            deconnexion(){
                localStorage.clear();
                this.$router.push('/');
            },
            ListeAnnexe:function(){
                axios.get("http://localhost:3000/listeAnnexe/"+this.Utilisateur.userId).then((response)=>{
                  if(response.status == 200){
                this.annexes=response.data;    
                this.loading= false;
                this.ChargementDonnee= true;
              }
            }).catch((err)=>{
                this.loading= false;
                this.NonTrouver=err.response.data.title;
                this.ChargementDonnee= false;
                this.messageNonTrouver = true;
                this.messageNonTrouverBase = false;

        })
            },
            selectMenuItem(item) {
            this.activeMenuItem = item;
            // Ajoutez ici la logique pour afficher la page correspondante
            this.$router.push({ path:'/'+ item});
          },
          activerMenu:function(){
            this.activeMenuItem = 'Annexe';
            this.pageProtegee=true;
            this.$router.push('/Annexe');
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
              this.ListeAnnexe();
            })
        },
        
    }
    </script>
    <style scoped>
#RechercheNonTrouver{
  height: 400px;
}
#RechercheNonTrouver img{
  margin-top:65px;
}
    .table-wrapper{
      max-height:450px;
      overflow-y: scroll;
      max-width:fit-content;
      margin-left:300px;
    }

      .dropdown{
        text-align: end;
      }
      .ligne1Col2{
        height:45px;
      }
    .ligne2Col2P{
      display:flex;
      justify-content: right;
      align-items: center;
      background:#fff;
      height:50px;
    
    }
    .Recherche{
    display:flex;
    align-items: center;
    height:50px;
    }
    .ligne2Col2{
      display: flex;
      justify-content: center;
    }
    .ligne2Col2{
    
      display:flex;
      align-items: center;
      background:#fff;
      height:50px;
    }
    .ligne1Col2{
      display:flex;
      justify-content: right;
      padding: 5px;
    
    }
    .ligne1{
      background:#3a3f51e7;
    
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
        width:820px;

        
    }
    table td, table th{
        padding:15px;
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