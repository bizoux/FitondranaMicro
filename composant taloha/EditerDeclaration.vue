<template>
    <!-- NAVIGATION -->
    <div class="container-fluid couleurContainer">
    <div class="row ligne1">
      <div class="col-md-5">
    
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
                <b>Editer la déclaration</b>
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
        <form @submit.prevent="EditerDeclaration()">
    
          <div id="aligner">
            
            <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>NIF</b> <span style="color:red">*</span></label>
              <input type="text" class="form-control" name="NIF" v-model="ModifierDeclaration.NIF" disabled required><br><br>
            </div>
            
            
            <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Date de Transaction</b> <span style="color:red">*</span></label>
              <input type="date" class="form-control" name="DateTransaction" v-model="Datetransaction" required><br><br>
            </div>
    
            
            
            
            
            <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Date de déclaration</b> <span style="color:red">*</span></label>
              <input type="date" class="form-control" name="DateDeclaration" v-model="Datedeclaration" @input="calculerMoisSuivantDate" required><br><br>
            </div>
    
          </div>
    
          <div id="aligner">
            
            <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Base imposable</b> <span style="color:red">*</span></label>
              <input type="number" class="form-control" name="BaseImposable" v-model="BaseImposable" required><br><br>
            </div>
            
        <div class="form-group" style="width: 250px; height: 80px;">
          <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Identifiant du Type</b><span style="color:red">*</span></label>
          <select class="form-select" v-model="ModifierDeclaration.idType" @click="TypeSelectionner()" required>
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
              <input type="number" class="form-control" name="Taux" v-model="ModifierDeclaration.Taux" disabled><br><br>
            </div>
            
            
            <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Nature</b> <span style="color:red">*</span></label>
              <input type="text" class="form-control" name="Nature" placeholder="Ex:Prestation de service" v-model="ModifierDeclaration.Nature" required><br><br>
            </div>
    
            
            <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Détail</b> <span style="color:red">*</span></label>
              <input type="text" class="form-control" name="Detail" placeholder="Ex:Achat banane" v-model="ModifierDeclaration.Detail" required><br><br>
            </div>
    
          </div>  
      
          <div id="alignerFin">
    
            <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Activité</b> <span style="color:red">*</span></label>
              <input type="text" class="form-control" name="Activite" v-model="ModifierDeclaration.Activite" required>
            </div>
    
            <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Date du dernier paiement</b> <span style="color:red">*</span></label>
              <input type="date" class="form-control" v-model="DatefinPaiement" disabled>
            </div>
    
            <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Montant à payer</b> <span style="color:red">*</span></label>
              <input type="number" class="form-control" name="MontantDu" v-model="MontantDu" disabled required>
            </div>
          
          </div>
    
          <div id="alignerFin">
    
    <div class="form-group" style="width: 250px; height: 80px;">
      <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Période</b> <span style="color:red">*</span></label>
      <select name="Periode" class="form-select" v-model="ModifierDeclaration.Periode" required>
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
      <input type="number" class="form-control" v-model="ModifierDeclaration.Annee">
    </div>

    <div class="form-group" style="width: 250px; height: 80px;">
              <label style="color:rgb(14, 14, 14);font-size:14px;"><b>Nom commerciale</b> <span style="color:red">*</span></label>
              <input type="text" class="form-control" name="NomCom" placeholder="Ex:Epicerie Saveurs" v-model="ModifierDeclaration.NomCom" required><br><br>
    </div>
    
    </div>
          
            <div style="display: flex;justify-content: right;">
              <input type="button" class="btnAnnuler" @click="annuler()" value="Annuler">&nbsp;&nbsp;
              <input type="submit" class="btnAjout" value="Editer">
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
    import moment from 'moment';
    import axios from "axios";
    export default{
        name:"EditerDeclaration",
        data(){
            return{
            id:this.$route.params.idDeclaration,
            activeMenuItem: '',
            Logo:"src/image/logoDGI.png",
            pageProtegee:true,
            ModifierDeclaration:{
                NIF:"",
                DateDeclaration:"",
                DateTransaction:"",
                idType:"",
                NomCom:"",
                Taux:"5",
                Nature:"",
                Detail:"",
                Activite:"",
                Statut:"En cours",
                Periode:"",
                Annee:"",
                DateFinPaiement:""
            },
            Utilisateur:{
            NIF:'',
            Nom:'',
            Prenom:''
          },
          Datedeclaration:'',
          Datetransaction:'',
          DatefinPaiement:'',
          dateHeure:'',
          BaseImposable:'',
          MontantDu:'',
          dateSuivant: null,
          Type:''
    
        }
        },
        created(){
          if(localStorage.getItem('token') === null){
            console.log("annuler");
          }
          
        },
        mounted:function(){
            this.ListeType();
            this.DeclarationRecuperer();
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
            const Taux = this.ModifierDeclaration.Taux;
            this.BaseImposable = val;
            this.MontantDu = val*(Taux/100);
          },
        },
        methods:{
          TypeSelectionner:function(){
            axios.get("http://localhost:3000/TypeSelectionner/"+this.ModifierDeclaration.idType).then((response)=>{
            this.Type=response.data[0].NomType;    
        })
        },
      ListeType:function(){
            axios.get("http://localhost:3000/listeType").then((response)=>{
            this.listeIdType=response.data;    
          
        })
        },
            DeclarationRecuperer:function(){
                axios.get('http://localhost:3000/RecupererDeclaration/'+this.id).then((res)=>{
                this.ModifierDeclaration.NIF=res.data[0].NIF;
                this.ModifierDeclaration.DateDeclaration = res.data[0].DateDeclaration;
                this.ModifierDeclaration.DateTransaction = res.data[0].DateTransaction;
                this.ModifierDeclaration.NomCom = res.data[0].NomCom;
                this.ModifierDeclaration.Nature = res.data[0].Nature;
                this.ModifierDeclaration.Detail = res.data[0].Detail;
                this.ModifierDeclaration.Activite = res.data[0].Activite;
                this.ModifierDeclaration.idType = res.data[0].idType;
                this.ModifierDeclaration.Taux = res.data[0].Taux;
                this.ModifierDeclaration.Periode = res.data[0].Periode;
                this.ModifierDeclaration.Annee = res.data[0].Annee;
                this.ModifierDeclaration.DateFinPaiement = res.data[0].DateFinPaiement;
                this.ModifierDeclaration.dateHeure = this.dateHeure;
                this.BaseImposable = res.data[0].BaseImposable;
                this.MontantDu = res.data[0].MontantDu;
                this.DatefinPaiement = moment(this.ModifierDeclaration.DateFinPaiement).format('YYYY-MM-DD');
                this.Datedeclaration = moment(this.ModifierDeclaration.DateDeclaration).format('YYYY-MM-DD');
                this.Datetransaction = moment(this.ModifierDeclaration.DateTransaction).format('YYYY-MM-DD');
                this.TypeSelectionner();
                console.log(res.data);
                  })
            },

        // EDITER DECLARATION
        EditerDeclaration:function(){
            const idDeclaration = this.id;
            const NIF = this.ModifierDeclaration.NIF;
            const DateDeclaration = this.Datedeclaration;
            const DateTransaction = this.Datetransaction;
            const DateFinPaiement = this.DatefinPaiement;
            const NomCom = this.ModifierDeclaration.NomCom;
            const Nature = this.ModifierDeclaration.Nature;
            const Detail = this.ModifierDeclaration.Detail;
            const Activite = this.ModifierDeclaration.Activite;
            const idType = this.ModifierDeclaration.idType;
            const Taux = this.ModifierDeclaration.Taux;
            const Statut = this.ModifierDeclaration.Statut;
            const Periode = this.ModifierDeclaration.Periode;
            const Annee = this.ModifierDeclaration.Annee;
            const MontantDu = this.MontantDu;
            const BaseImposable = this.BaseImposable;
            const dateHeure = this.dateHeure;
                axios.put('http://localhost:3000/EditerDeclaration/'+idDeclaration, {NIF,DateDeclaration,DateTransaction,DateFinPaiement,BaseImposable,idType,NomCom,Taux,Nature,Detail,Activite,MontantDu,Statut,Periode,Annee,dateHeure}).then((res)=>{
                console.log(res.data);
                this.AfficheMessageEditer();
                this.$router.push('/Declaration');
  
                })
            },
          AfficheDateHeure:function(){
                axios.get("http://localhost:3000/AfficheDateHeure").then((response)=>{
                this.dateHeure=response.data[0].dateHeure;    
            })
            },
          calculerMoisSuivantDate() {
          if (this.Datedeclaration) {
            const selectionDate = new Date(this.Datedeclaration);
            const nextMonth = new Date(selectionDate);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            nextMonth.setDate(15);
            this.DatefinPaiement = nextMonth.toISOString().slice(0, 10);
          } else {
            this.DatefinPaiement = null;
          }
        },
        AfficheMessageEditer:function(){
      this.$swal({
        icon:'info',
        title:'Modification de idDeclaration='+this.id+' de '+this.Utilisateur.Nom+' '+this.Utilisateur.Prenom+'',
        text:'avec succès!',
        timer:3000,
        showConfirmButton:false
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