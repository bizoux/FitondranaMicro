<template>
    <h1>Page d'authentification</h1><br>
    <form @submit.prevent="SeConnecter()">
        <h6>Veuillez s'authentifié</h6>
        <label>NIF :</label>&nbsp;
        <input type="text" name="NIF" v-model="Contribuable.Nif"><br><br>
        
        <label>Mot de passe :</label>&nbsp;
        <input type="text" name="MotDePasse" v-model="Contribuable.MotDePasse"><br><br>
        <input type="submit" value="Se connecter">

    </form>    
</template>
<script>
import axios from "axios";
export default{
    name:"Authentification",
    data(){
        return{
        Contribuable:{
            Nif:"",
            MotDePasse:""
        }    
        
    }
    },
    methods:{
        SeConnecter:function(){
        axios.post("http://localhost:3000/user", this.Contribuable).then(response=>{
            console.log("avec succès");
        }).catch(error=>{
            console.log("erreurrr");
        })
    }
    }
}
</script>
<style>
</style>