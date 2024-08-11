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

<!-- LIGNE 2 -->
<br>

<div class="row ligne2">
        <div class="col-md-6 ligne2Col2">
            
        </div>

        <div class="col-md-3 ligne2Col2">
            <b><font-awesome-icon icon="credit-card" spin/>&nbsp;&nbsp;Ajout du paiement</b>
            
        </div>

        <div class="col-md-3 ligne2Col2">

        </div>

          <!-- FIN LIGNE 2 -->
</div>

        <!-- Contenu de la page Ajout paiement-->
    
<!-- LIGNE 3 -->

<div class="row ligne3">

  <div class="col-md-3 ligne3Col1">

  </div>

  <div class="col-md-9 formulaire">
    
    <div class="retour">
      <router-link to="/Paiement"><font-awesome-icon icon="circle-arrow-left" style="margin-top: 5px; font-size:25px;"/></router-link>
    </div>

    <!-- CONNEXION AU COMPTE BANCAIRE -->

    <form @submit.prevent="connexionCompte()" v-if="formulaireCompte">
      <h5 style="text-align:center; color: #222222;">Veuillez connecter à votre compte bancaire pour effectuer le paiement</h5><hr>
      <center> 


<div style="display:flex;justify-content: space-evenly;">
    <div></div>   

    <div>  
      <div class="form-group" style="width: 250px; height: 80px;">
          <label style="margin-right: 100px;">Numéro de compte <span style="color:red">*</span></label>
          <input type="text" class="form-control" v-model="Connexion.NumCompte" required><br><br>
      </div>

        
      <div class="form-group" style="width: 250px; height: 80px;">
          <label style="margin-right: 135px;">Mot de passe <span style="color:red">*</span></label>
          <input type="password" class="form-control" v-model="Connexion.MotDePasse" required><br><br>
      </div>
      <input type="submit" class="btnConnexion" value="Se connecter">
      <div style="margin-left:120px;">
        <span class="badge" style="color:black;">Vous n'avez pas de compte ?</span><router-link to="/CreerCompteBancaire" style="font-size: 15px;">Créer un compte</router-link>
      </div>
    </div>
    
    <div>
      <img v-bind:src="imageCompteBancaire" alt="imageRecherche" style="width:170px;">
    </div>

</div> 
    
    </center>

    </form>



    
    <form @submit.prevent="AjoutPaiement()" class="was-validated" v-if="formulaire">
      <h5 style="text-align:center; color: #222222;">Veuillez remplir tous les champs pour effectuer le paiement</h5><hr>

    <div id="aligner">
      
      <div class="form-group" style="width: 250px; height: 80px;">
          <label>NIF <span style="color:red">*</span></label>
          <input type="text" class="form-control" name="NIF" v-model="Utilisateur.userId" disabled required><br><br>
      </div>
      
    
      <div class="form-group" style="width: 250px; height: 80px;">
          <label>Identifiant du déclaration <span style="color:red">*</span></label>
          <select name="idDeclaration" v-model="Paiement.idDeclaration" class="form-select" @click="montant(),AfficheDateFinPaiement()" required>
            <option v-for="declaration in listeIdDeclaration" v-bind:key="declaration.idDeclaration">{{ declaration.idDeclaration }}</option>
        </select>
      
      </div>
      
    </div>
    <p style="margin-left: 500px;">Impot à payer : <b>{{ImpotDu}}</b></p>
    <input type="text" class="form-control" v-model="DateFinPaiement" disabled hidden>
        

    <div id="aligner">
      <div class="form-group" style="width: 250px; height: 80px;">
          <label>Date du paiement <span style="color:red">*</span></label>
          <input type="date" class="form-control" name="DatePaiement" v-model="Paiement.DatePaiement" required><br><br>
      </div>
        

      <div class="form-group" style="width: 250px; height: 80px;">
          <label>Montant <span style="color:red">*</span></label>
          <input type="number" class="form-control" name="Montant" v-model="Paiement.Montant" required>
      </div>
      <input type="datetime" class="form-control" v-model="dateHeure" hidden>
      <input type="text" class="form-control" v-model="NumCompteRecuperer" style="width: 500px;" hidden>      
    </div>
    <div id="solde">
      <button @click="afficheSolde(),soldeCompte()">Voir solde</button>
    </div>
    
    <div id="aligner"> 
      <div class="form-group" style="width: 250px; height: 80px;">
          <label>Mode du paiement <span style="color:red">*</span></label>
          <select name="ModePaiement" v-model="Paiement.ModePaiement" class="form-select" required>
            <option value="" disabled>Selectionner</option>
            <option value="Virement bancaire">Virement bancaire</option>
            <option value="Carte bancaire">Carte bancaire</option>
        </select>
      </div>
    </div>
        
        <center>
          <div id="banque" v-if="Paiement.ModePaiement === 'Virement bancaire'" class="form-group">
            <h6 style="text-align:center">Veuillez remplir les informations pour effectuer le virement bancaire</h6><hr>
            <input type="text" class="form-control" v-model="NumCompteRecuperer" style="width: 500px;" hidden>
            <div class="form-group">
              <label id="nomBanque">Numéro de compte <span style="color:red">*</span></label>
              <input type="text" class="form-control" name="ModePaiement" v-model="compteBancaire.NumCompte" style="width: 500px;" required>
            </div><br>
            
          
            <div class="form-group">
            <label id="nomBanque">Nom de la banque <span style="color:red">*</span></label>
            <select name="ModePaiement" class="form-select" v-model="compteBancaire.NomBanque" @click="recuperationNomBeneficiaire()" style="width: 500px;" required>
                <option value="BNI">BNI</option>
                <option value="BFV">BFV</option>
                <option value="BOA">BOA</option>
            </select>
          </div><br>

          <div class="form-group">
              <label id="Rib">Clé RIB <span style="color:red">*</span></label>
              <input type="text" class="form-control" name="ModePaiement" v-model="compteBancaire.CleRib" style="width: 500px;" required>
          </div><br>

          
            <div class="form-group">
              <label id="nomBanque">Nom du bénéficiaire <span style="color:red">*</span></label>
              <input type="text" class="form-control" name="ModePaiement" v-model="compteBancaire.NomTitulaire" style="width: 500px;" disabled required>
            </div>
            
        </div></center>

        <center><div id="banque" v-if="Paiement.ModePaiement === 'Carte bancaire'" class="form-group">
            <h6>Veuillez remplir les informations du carte bancaire</h6><hr>
            <input type="text" class="form-control" v-model="NumCompteRecuperer" style="width: 500px;" hidden>
          <div class="form-group">
            <label id="nomBanque" for="floatingInputValid">Numéro de compte <span style="color:red">*</span></label>&nbsp;
            <input type="text" name="ModePaiement" class="form-control" v-model="compteBancaire.NumCompte" style="width: 500px;" required><br>
          </div>  
          
          <div class="form-group">  
            <label id="nomBanque">Nom de la banque <span style="color:red">*</span></label>
            <select name="ModePaiement" class="form-select" v-model="compteBancaire.NomBanque" @click="recuperationNomBeneficiaire()" style="width: 500px;" required>
                <option value="BNI">BNI</option>
                <option value="BFV">BFV</option>
                <option value="BOA">BOA</option>
            </select>
          </div><br>

          <div class="form-group">
              <label id="Rib">Clé RIB <span style="color:red">*</span></label>
              <input type="text" class="form-control" name="ModePaiement" v-model="compteBancaire.CleRib" style="width: 500px;" required>
          </div><br>

          <div class="form-group">
            <label id="nomBanque">Nom du titulaire <span style="color:red">*</span></label>
            <input type="text" name="ModePaiement" class="form-control" v-model="compteBancaire.NomTitulaire" style="width: 500px;" required>
          </div>
            
        </div></center><br>
        
        <div class="btnFooter">
          <input type="button" class="btnAnnuler" @click="annuler()" value="Annuler">&nbsp;&nbsp;
          <input type="submit" class="btnAjout" value="Ajouter"><input type="text" class="form-control" v-model="solde" style="width: 100px;" hidden required><input type="text" class="form-control" v-model="EmailRecuperer" style="width: 100px;" hidden required>
        </div>


    </form>
  </div>

  <!-- FIN LIGNE 3   -->
  </div>    



<!-- FIN CONTAINER -->
</div>
</template>
<script>
import moment from 'moment';
import axios from "axios";
export default{
    name:"AjoutPaiement",
    data(){
        return{
          imageCompteBancaire:"src/image/compte bancaire.png",
          DateFinPaiement:"",
          Connexion:{
                NumCompte:'',
                MotDePasse:''
            },
        Paiement:{
            idDeclaration:"",
            DatePaiement:"",
            Montant:"",
            ModePaiement:""
        },
        compteBancaire:{
          NomBanque:'',
          NumCompte:'',
          NomTitulaire:'',
          CleRib:''
        },
        dateHeure:'',
        NumCompte:"",
        activeMenuItem: '',
        Logo:"src/image/logoDGI.png",
        pageProtegee:true,
        Utilisateur:{
          userId:'',
          Nom:'',
          Prenom:''
        },
        dateHeure:'',
        formulaire:false,
        formulaireCompte:true,
        NumCompteRecuperer:'',
        EmailRecuperer:'',
        solde:'',
        listeIdDeclaration:[],
        ImpotDu:'',
        envoyerEmail:[]   
    }
    },
    created(){
      if(localStorage.getItem('token') === null){
        console.log("annuler");
      }
      
    },
    mounted:function(){
        this.dateAujourdhui();
        this.AfficheDateHeure();
        this.activerMenu();
        const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/proteger", {
         headers: {
          'Authorization': 'Bearer '+ token
         } 
        }).then((response)=>{
          this.Utilisateur = response.data;
          this.ListeIdDeclaration();
        })
        
    },
    methods:{
      soldeCompte:function(){
        const Numcompte = this.NumCompteRecuperer;
        axios.get("http://localhost:3000/afficheSolde/"+Numcompte).then((response)=>{
        this.solde = response.data[0].solde;
            })
      },
      dateAujourdhui:function(){
        const aujourdhui = new Date();
        this.Paiement.DatePaiement = moment(aujourdhui).format('YYYY-MM-DD');
      },
      

      AfficheEmail:function(){
        const NumCompte = this.NumCompteRecuperer;
        axios.get("http://localhost:3000/afficheAdresseEmail/"+NumCompte).then((response)=>{
        this.EmailRecuperer = response.data[0].Email;
            })
      },


      annuler(){
        this.Paiement.idDeclaration = "";
        this.Paiement.Montant = "";
        this.Paiement.ModePaiement = "";
      },
      recuperationNomBeneficiaire:function(){
        const NumCompte = this.compteBancaire.NumCompte;
        const NomBanque = this.compteBancaire.NomBanque;
            axios.get("http://localhost:3000/NomBeneficiaire/"+NumCompte+"/"+NomBanque).then((res)=>{
              if(res.status == 200){
                this.compteBancaire.NomTitulaire = res.data[0].NomTitulaire;
                console.log(this.compteBancaire.NomTitulaire);
            }
    
            }).catch((err)=>{
            this.compteBancaire.NomTitulaire=err.response.data.NomTitulaire;
        })
        },
        
      deconnexion(){
            localStorage.clear();
            this.$router.push('/');
        },
        connexionCompte:function(){
        axios.post("http://localhost:3000/SeConnecterCompteBancaire", this.Connexion).then(response=>{
            this.NumCompteRecuperer = response.data.NumCompte;
            this.MessageSucces();
            this.formulaire=true;
            this.formulaireCompte=false;
            this.AfficheEmail();
        }).catch(error=>{
            this.MessageErreur();
        })
    },
    ListeIdDeclaration:function(){
            axios.get("http://localhost:3000/listeIdDeclaration/"+this.Utilisateur.userId).then((response)=>{
            this.listeIdDeclaration=response.data;    
            this.loading= false;
            this.ChargementDonnee= true;
        })
        },
    AjoutPaiement:function(){
          const NIF = this.Utilisateur.userId;
          const idDeclaration = this.Paiement.idDeclaration;
          const DatePaiement = this.Paiement.DatePaiement;
          const Montant = this.Paiement.Montant;
          const ModePaiement = this.Paiement.ModePaiement;
          const solde = this.solde;
          const Numcompte = this.NumCompteRecuperer;
          const NumcompteBancaire = this.compteBancaire.NumCompte;
          const CleRib = this.compteBancaire.CleRib;
          const DateFinPaiement = this.DateFinPaiement;
          const dateHeure = this.dateHeure;
          const EmailRecuperer = this.EmailRecuperer;
          
        axios.post("http://localhost:3000/contribuable/effectuerPaiement/"+solde, {NIF,idDeclaration,DatePaiement,Montant,ModePaiement,Numcompte,NumcompteBancaire,DateFinPaiement,dateHeure,CleRib}).then(response=>{
            if(response.data === "solde inferieur"){
              const Numcompte = this.NumCompteRecuperer;
        axios.get("http://localhost:3000/afficheSolde/"+Numcompte).then((response)=>{
        const solde = response.data[0].solde;  
          this.$swal({
        icon:'error',
        title:'Votre solde bancaire est insuffisant',
        text:'votre solde est de '+solde+'.',
        timer:3000,
        showConfirmButton:false

      }) 
            })
              console.log("echec car le solde est insuffisant");  
            }
            else if(response.data === "solde superieur"){
              this.MessageEffectuerPaiement();
              this.ListeIdDeclaration();
              this.ImpotDu = "";
              const idDeclaration = this.Paiement.idDeclaration;
            // ENVOYER EMAIL  
            axios.get("http://localhost:3000/sendmailer/"+Montant+"/"+EmailRecuperer+"/"+idDeclaration).then((response)=>{
            this.envoyerEmail=response.data;
            this.annuler();    
            
        })
            }
            else if(response.data === "solde egale"){
              this.MessageEffectuerPaiement();
              this.ListeIdDeclaration();
              this.ImpotDu = "";
              const idDeclaration = this.Paiement.idDeclaration;
            // ENVOYER EMAIL
            axios.get("http://localhost:3000/sendmailer/"+Montant+"/"+EmailRecuperer+"/"+idDeclaration).then((response)=>{
            this.envoyerEmail=response.data;
            this.annuler();    
            
        })
            }
            else if(response.data === "Retard paiement"){

              this.$swal({
              icon:'error',
              title:'Retard de paiement',
              text:'Echec',
              timer:3000,
              showConfirmButton:false

      }) 
            }
            
        }).catch(error=>{ 
          console.log("erreur");
        })
    },
    AfficheDateFinPaiement:function(){
      const idDeclaration = this.Paiement.idDeclaration;
      axios.get("http://localhost:3000/selectionIdDeclaration/"+idDeclaration).then((response)=>{
            this.DateFinPaiement=response.data[0].DateFinPaiement;    
        })
    },
    MessageErreur:function(){
      this.$swal({
        icon:'error',
        title:"Le client n'existe pas",
        text:'echec de connexion',
        timer:3000,
        showConfirmButton:false
      })
    },
    AfficheDateHeure:function(){
            axios.get("http://localhost:3000/AfficheDateHeure").then((response)=>{
            this.dateHeure=response.data[0].dateHeure;    
        })
        },
    MessageEffectuerPaiement:function(){
      let timerInterval;
  this.$swal({
  title: "Effectuation paiement!",
  html: "Le paiement s'effectue après <b></b> millisecondes.",
  timer: 5000,
  timerProgressBar: true,
  didOpen: () => {
    this.$swal.showLoading();
    const timer = this.$swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${this.$swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === this.$swal.DismissReason.timer) {
    this.$swal(
            {
              icon:'success',
              title:'Le paiement est effectué en attendant la confirmation',
              text:'avec succès',
              timer:2500,
              showConfirmButton:false
            }
          ),
    console.log("I was closed by the timer");
    
  }
});
    },
    MessageSucces:function(){
      this.$swal({
        icon:'success',
        title:"Connexion à votre compte bancaire",
        text:'avec succès',
        timer:2500,
        showConfirmButton:false
      })
    },
    montant:function(){
        const idDeclaration = this.Paiement.idDeclaration;
        axios.get("http://localhost:3000/afficheImpot/"+idDeclaration).then((response)=>{
        this.ImpotDu = response.data[0].MontantDu;  
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
        this.$router.push('/AjoutPaiement');
      },
      afficheSolde:function(){
        const Numcompte = this.NumCompteRecuperer;
        axios.get("http://localhost:3000/afficheSolde/"+Numcompte).then((response)=>{
        const solde = response.data[0].solde;  
          this.$swal({
        icon:'info',
        title:'Votre solde bancaire est de '+solde+' ar',
        text:'NumCompte: '+Numcompte+'.'

      }) 
            })
      },
      insertion:function(){
        const Numcompte = this.NumCompteRecuperer;
        const Montant = this.Paiement.Montant;
        axios.get("http://localhost:3000/insertion/"+Numcompte+"/"+Montant).then((response)=>{
          console.log("ok");
            })
      }
    
    }
}
</script>
<style scoped>
#solde{
  margin-left:618px;
  border:none;
}
  .dropdown{
    text-align: end;
  }
  .ligne1Col2{
    height:45px;
  }
#nomBanque{
  margin-right:350px;
}
#Rib{
  margin-right:425px;
}
.btnFooter{
  display: flex;
  justify-content: right;
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
    padding: 7px;
    width:100px;
}

.btnAjout:hover{
  background-color:rgba(36, 161, 250,0.8);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 7px;
    width:100px;
    transition:0.2s;
}
.btnConnexion{
  background-color:rgb(36, 161, 250);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 7px;
    width:120px;
}

.btnConnexion:hover{
  background-color:rgba(36, 161, 250,0.8);
    color: #fff;
    cursor:pointer;
    border:none;
    border-radius:4px;
    padding: 7px;
    width:120px;
    transition:0.2s;
}

#aligner{
  display: flex;
  justify-content: space-evenly;
}

.formulaire{
  margin-top: 10px;
  border-radius:10px;
  width:830px;
  background-image:url("src/image/fondformulaire.jpg");
  background-size:cover;
  background-repeat:no-repeat;
  
}
.retour{
  text-align:right;
}
.ligne2Col2{
  display:flex;
  align-items: center;
  justify-content: center;
  background:white;
  height:50px;
}
.couleurContainer{
  background:rgb(147, 161, 173,0.3);
  min-height:100vh;
}
.ligne1{
  background:#3a3f51e7;
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
h1{
    
    margin-left:20%;
    border-radius:10px;
}
#banque{
    
    background-color: aliceblue;
    padding: 20px;
    width:600px;
    border-radius:5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
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