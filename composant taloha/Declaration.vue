<template>

<div class="container-fluid couleurContainer">

    <!-- ROW 1 -->

<div class="row ligne1" >


    <div class="col-md-5 StyleCol1">
    
    <!-- NAVIGATION -->

    <div id="app">
      <div class="sidebar d-none d-md-block">
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
            <button class="btn btn-primary d-md-none" @click="toggleSidebar">
              Menu
            </button>
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
        <div class="col-md-5 ligne2Col2P">
            <b>Liste des déclarations</b>
        </div>

        <div class="col-md-4 ligne2Col2">
            <router-link to="/AjoutDeclaration">Nouveau déclaration</router-link>
        </div>

        <div class="col-md-3 ligne2Col2">

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
            <input type="text" placeholder="Rechercher idDeclaration ou date du decl...." class="form-control" v-model="Recherche"/>
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
        <div class="alert alert-success" v-if="this.Recherche && getFilterDeclaration.length > 0" id="largeur">
            {{getFilterDeclaration.length}} resultat<span v-if="getFilterDeclaration.length>1">s</span> trouvé<span v-if="getFilterDeclaration.length>1">s</span>
        </div>

   
        </div>

        <div class="col-md-3 message">

        </div>
    </div>
    
    <div class="row">

        <div class="col-md-3 ligne3Col1">

        </div>

        <div class="col-md-8 ligne3Col2">  
    
          <div id="RechercheNonTrouver" v-if="messageNonTrouver || getFilterDeclaration.length == 0">
    
            <img v-bind:src="imageNonTrouver" alt="imageRecherche" style="width:140px;">
            <p v-if="messageNonTrouverBase">Aucune déclaration trouvée</p>  
            <p>{{ NonTrouver }}</p>
  
          </div>
    <table class="table table-light table-striped table-hover" v-if="ChargementDonnee && getFilterDeclaration.length>0">
        <thead>
            <tr>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">IdDeclaration</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">NIF</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">DateDeclaration</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Type</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">BaseImposable</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Statut</th>
                <th style="color:white;background-color: #3a3f51e7;opacity:95%;font-size: 13px;font-family:Verdana, Geneva, Tahoma, sans-serif">Actions</th>
                
            </tr>
        </thead>

        <tbody>
            <tr v-for="declaration in getFilterDeclaration" v-bind:key="declaration.idDeclaration">
                <td>{{ declaration.idDeclaration }}</td>
                <td>{{ declaration.NIF }}</td>
                <td>{{ formatDate(declaration.DateDeclaration) }}</td>
                <td>
                  
                  {{ declaration.NomType }}
              
                </td>
                <td>{{ declaration.BaseImposable }}</td>
                <td v-if='declaration.statut == "En attente"'><span class="badge rounded-pill bg-warning">{{ declaration.statut }}</span></td>
                <td v-if='declaration.statut == "Paye"'><span class="badge rounded-pill bg-success">{{ declaration.statut }}</span></td>
                <td v-if='declaration.statut == "En cours"'>
                  <span class="badge rounded-pill bg-info">{{ declaration.statut }}</span>
                </td>
                <td>
                    <router-link :to="{name:'AfficheDeclaration', params:{idContribuable: declaration.idDeclaration}}"><button class="btn btn-success">Voir</button></router-link>
                    <hr><router-link v-if='declaration.statut == "En cours"' :to="{name:'EditerDeclaration', params:{idDeclaration: declaration.idDeclaration}}"><button class="btn btn-success"><font-awesome-icon icon="edit"/></button></router-link>
                    <button v-if='declaration.statut == "En cours"' class="btn btn-danger" v-on:click="ConfirmationSuppr(declaration.idDeclaration)"><font-awesome-icon icon="trash"/></button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<div class="col-md-2 ligne3Col1">

</div>


</div>


<!-- FIN CONTAINER -->
</div>        
</template>
<script>
import moment from 'moment';
import axios from "axios";
export default{
    name:"Declaration",
    data(){
        return{
            declarations:[],
            Type:[],
            imageNonTrouver:"src/image/NonTrouver.png",
            Recherche:"",
            loading: true,
            messageNonTrouverBase: true,
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
    methods:{

        formatDate(Date){
          return moment(Date).format('DD/MM/YYYY');
        },
        toggleSidebar() {
      // Vous pouvez ajouter ici la logique pour afficher/masquer la barre latérale
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('d-none');
    },
        deconnexion(){
            localStorage.clear();
            this.$router.push('/');
        },
        ListeDeclaration:function(){
            axios.get("http://localhost:3000/listeDeclaration/"+this.Utilisateur.userId).then((response)=>{
              if(response.status == 200){
            this.declarations=response.data;    
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
        SuppressionDeclaration(idDeclaration){
      axios.delete("http://localhost:3000/SuppressionDeclaration/"+idDeclaration).then(function(){
        return window.location.reload();
      });
    },
    ConfirmationSuppr(idDeclaration){
      this.$swal({
        title:'Etes vous sûre de vouloir supprimer la déclaration de '+this.Utilisateur.Nom+' '+this.Utilisateur.Prenom,
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Oui',
        cancelButtonText:'Non'
      }).then((result)=> {
        if(result.isConfirmed){
          this.$swal(
            {
              icon:'success',
              title:'La déclaration de '+this.Utilisateur.Nom+' '+this.Utilisateur.Prenom+' est supprimé.',
              text:'avec succès',
              timer:2500,
              showConfirmButton:false
            }
          ),
          this.SuppressionDeclaration(idDeclaration);
        }
        else
        {
          
          this.$swal({
            icon:'error',
        title:'Annulation de La déclaration de '+this.Utilisateur.Nom+' '+this.Utilisateur.Prenom,
        text:"echec",
        timer:2500,
        showConfirmButton:false
      }
          )
        }
      })
    },
        selectMenuItem(item) {
        this.activeMenuItem = item;
        // Ajoutez ici la logique pour afficher la page correspondante
        this.$router.push({ path:'/'+ item});
      },
      activerMenu:function(){
        this.activeMenuItem = 'Declaration';
        this.pageProtegee=true;
        this.$router.push('/Declaration');
      }
    },
    computed:{
      getFilterDeclaration() {
    return this.declarations.filter(declaration => {
        const DateDeclaration = moment(declaration.DateDeclaration).format('DD/MM/YYYY').toLowerCase().includes(this.Recherche.toLowerCase());
        const idDeclaration = declaration.idDeclaration.toString() === this.Recherche;
        return DateDeclaration || idDeclaration;
        
    });
    
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
          this.ListeDeclaration();
        })
        
    },
    
}
</script>
<style scoped>
.ligne3Col2{
  display:flex;
  justify-content:center;

}
#RechercheNonTrouver{
  height: 400px;
}
#RechercheNonTrouver img{
  margin-top:65px;
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
  background:white;
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
  background:white;
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