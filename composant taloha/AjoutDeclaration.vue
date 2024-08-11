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
            <b><font-awesome-icon icon="file-alt" spin/>&nbsp;&nbsp;Ajout de la déclaration</b>
        </div>
</div>

<!-- LIGNE 3 -->
<div class="row ligne3Col3">

<div class="col-md-3">

</div>

<div class="col-md-9">

  <!-- Contenu de la page Ajout du déclaration-->
  <div class="retour">
    <router-link to="/Declaration"><font-awesome-icon icon="circle-arrow-left" style="margin-top: 5px; font-size:25px;"/></router-link>
  </div>
  
  <div class="formulaire">
    <form @submit.prevent="AjoutDeclaration()">

      <div id="aligner">
        
        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>NIF</b> <span style="color:red">*</span></label>
          <input type="text" class="form-control" name="NIF" v-model="Utilisateur.NIF" disabled required><br><br>
        </div>
        
        
        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Date de Transaction</b> <span style="color:red">*</span></label>
          <input type="date" class="form-control" name="DateTransaction" v-model="Declaration.DateTransaction" required><br><br>
        </div>

        
        
        
        
        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Date de déclaration</b> <span style="color:red">*</span></label>
          <input type="date" class="form-control" name="DateDeclaration" v-model="Declaration.DateDeclaration" @input="calculerMoisSuivantDate" required><br><br>
        </div>

      </div>

      <div id="aligner">
        
        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Base imposable</b> <span style="color:red">*</span></label>
          <input type="number" class="form-control" name="BaseImposable" v-model="BaseImposable" required><br><br>
        </div>
          
        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Identifiant du Type</b><span style="color:red">*</span></label>
          <select class="form-select" v-model="Declaration.idType" @click="TypeSelectionner()" required>
            <option v-for="Type in listeIdType" v-bind:key="Type.idType">{{ Type.idType }}</option>
          </select>
        </div>
        
        
        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Type</b> <span style="color:red">*</span></label>
          <input type="text" class="form-control" name="Type" v-model="Type" disabled><br><br>
        </div>
        
        
        



      </div>  
        
      
      

      <div id="aligner">

        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Taux</b> <span style="color:red">*</span></label>
          <input type="number" class="form-control" name="Taux" v-model="Declaration.Taux" disabled><br><br>
        </div>
        
        
        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Nature</b> <span style="color:red">*</span></label>
          <input type="text" class="form-control" name="Nature" placeholder="Ex:Prestation de service" v-model="Declaration.Nature" required><br><br>
        </div>

        
        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Détail</b> <span style="color:red">*</span></label>
          <input type="text" class="form-control" name="Detail" placeholder="Ex:Achat banane" v-model="Declaration.Detail" required><br><br>
        </div>

      </div>  
  
        <div id="alignerFin">

        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Activité</b> <span style="color:red">*</span></label>
          <input type="text" class="form-control" name="Activite" v-model="Declaration.Activite" required>
        </div>

        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Date du dernier paiement</b> <span style="color:red">*</span></label>
          <input type="date" class="form-control" v-model="dateSuivant" disabled>
        </div>

        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Montant à payer</b> <span style="color:red">*</span></label>
          <input type="number" class="form-control" name="MontantDu" v-model="MontantDu" disabled required>
        </div>
      
      </div>

      <div id="alignerFin">

<div class="form-group" style="width: 250px; height: 80px;">
  <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Période</b> <span style="color:red">*</span></label>
  <select name="Periode" class="form-select" v-model="Declaration.Periode" required>
                <option value="Janvier">Janvier</option>
                <option value="Fevrier">Fevrier</option>
                <option value="Mars">Mars</option>
                <option value="Avril">Avril</option>
                <option value="Mai">Mai</option>
                <option value="Juin">Juin</option>
                <option value="Juillet">Juillet</option>
                <option value="Septembre">Septembre</option>
                <option value="Octobre">Octobre</option>
                <option value="Novembre">Novembre</option>
                <option value="Decembre">Decembre</option>
  </select>
</div>

<div class="form-group" style="width: 250px; height: 80px;">
  <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Année</b><span style="color:red">*</span></label>
  <input type="number" class="form-control" v-model="Declaration.Annee">
</div>
<div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Nom commerciale</b> <span style="color:red">*</span></label>
          <input type="text" class="form-control" name="NomCom" placeholder="Ex:Epicerie Saveurs" v-model="Declaration.NomCom" required><br><br>
</div>


</div>      
        <div style="display: flex;justify-content: right;">
          <input type="button" class="btnAnnuler" @click="annuler()" value="Annuler">&nbsp;&nbsp;
          <input type="submit" class="btnAjout" value="Ajouter">
        </div>
<div class="form-group" style="width: 250px; height: 80px;">
  <input type="datetime" class="form-control" v-model="dateHeure" hidden>
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
    name:"AjoutDeclaration",
    data(){
        return{
        activeMenuItem: '',
        Logo:"src/image/logoDGI.png",
        pageProtegee:true,
        Declaration:{
            DateDeclaration:"",
            DateTransaction:"",
            Type:"",
            NomCom:"",
            Taux:"5",
            Nature:"",
            Detail:"",
            Activite:"",
            Statut:"En cours",
            Periode:"",
            Annee:"",
            idType:""
        },
        Utilisateur:{
        NIF:'',
        Nom:'',
        Prenom:''
      },
      dateHeure:'',
      BaseImposable:0,
      MontantDu:0,
      dateSuivant: null,
      listeIdType:[],
      Type:""


    }
    },
    created(){
      if(localStorage.getItem('token') === null){
        console.log("annuler");
      }
      
    },
    mounted:function(){
        this.ListeType();
        this.AfficheDateHeure();
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
    watch:{
      BaseImposable:function(val){
        const Taux = this.Declaration.Taux;
        this.BaseImposable = val;
        this.MontantDu = val*(Taux/100);
      },
    },
    methods:{
      TypeSelectionner:function(){
            axios.get("http://localhost:3000/TypeSelectionner/"+this.Declaration.idType).then((response)=>{
            this.Type=response.data[0].NomType;    
        })
        },
      ListeType:function(){
            axios.get("http://localhost:3000/listeType").then((response)=>{
            this.listeIdType=response.data;    
          
        })
        },
      AfficheDateHeure:function(){
            axios.get("http://localhost:3000/AfficheDateHeure").then((response)=>{
            this.dateHeure=response.data[0].dateHeure;    
        })
        },
      calculerMoisSuivantDate() {
      if (this.Declaration.DateDeclaration) {
        const selectionDate = new Date(this.Declaration.DateDeclaration);
        const nextMonth = new Date(selectionDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(15);
        this.dateSuivant = nextMonth.toISOString().slice(0, 10);
      } else {
        this.dateSuivant = null;
      }
    },
      MessageAjout:function(){
      this.$swal({
        icon:'success',
        title:'Ajout du nouveau declaration de'+' '+this.Utilisateur.Nom+' '+this.Utilisateur.Prenom,
        text:'avec succès!',
        timer:2500,
        showConfirmButton:false
      }),
      this.annuler();
      },
      annuler(){
        this.BaseImposable = 0;
        this.Declaration.DateDeclaration="",
        this.Declaration.DateTransaction="",
        this.dateSuivant="";
        this.Declaration.BaseImposable="",
        this.Declaration.NomCom="",
        this.Declaration.Nature="",
        this.Declaration.Detail="",
        this.Declaration.Activite=""
        this.Declaration.Annee=""
      },
      deconnexion(){
            localStorage.clear();
            this.$router.push('/');
        },
        AjoutDeclaration:function(){
          const NIF = this.Utilisateur.NIF;
          const DateDeclaration = this.Declaration.DateDeclaration;
          const DateTransaction = this.Declaration.DateTransaction;
          const NomCom = this.Declaration.NomCom;
          const Nature = this.Declaration.Nature;
          const Detail = this.Declaration.Detail;
          const Activite = this.Declaration.Activite;
          const idType = this.Declaration.idType;
          const Taux = this.Declaration.Taux;
          const Statut = this.Declaration.Statut;
          const Periode = this.Declaration.Periode;
          const Annee = this.Declaration.Annee;
          const MontantDu = this.MontantDu;
          const BaseImposable = this.BaseImposable;
          const DateFinPaiement = this.dateSuivant;
          const dateHeure = this.dateHeure;

        axios.post("http://localhost:3000/contribuable/AjoutDeclaration", {NIF,DateDeclaration,DateTransaction,BaseImposable,idType,NomCom,Taux,Nature,Detail,Activite,MontantDu,Statut,DateFinPaiement,Periode,Annee,dateHeure}).then(response=>{
            this.MessageAjout();
            console.log("avec succès");
        }).catch(error=>{
            console.log("erreur");
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
        this.$router.push('/AjoutDeclaration');
      }
    }
}
</script>
<style scoped>
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
    width:100px;
}

.btnAnnuler:hover{
  background-color:rgb(229, 83, 83,0.8);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 5px;
    width:100px;
    transition:0.2s;
}
.btnAjout{
  background-color:rgb(36, 161, 250);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 5px;
    width:100px;
}

.btnAjout:hover{
  background-color:rgba(36, 161, 250,0.8);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 5px;
    width:100px;
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
  justify-content: space-between;
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