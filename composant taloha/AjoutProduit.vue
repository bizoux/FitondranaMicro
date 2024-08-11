<template>
    <h1>Nouveau</h1><br>
    <form @submit.prevent="AjoutProduit()">
        <label>Numero produit :</label>&nbsp;
        <input type="text" name="numproduit" v-model="Produit.numproduit"><br><br>
        
        <label>Design :</label>&nbsp;
        <input type="text" name="design" v-model="Produit.design"><br><br>

        <label>Prix unitaire :</label>&nbsp;
        <input type="text" name="pu" v-model="Produit.pu"><br><br>
        
        <label>Stock :</label>&nbsp;
        <input type="text" name="stock" v-model="Produit.stock"><br><br>

        <input type="submit" value="Se connecter">

    </form>    
</template>
<script>
import axios from "axios";
export default{
    name:"AjoutProduit",
    data(){
        return{
        Produit:{
            numproduit:"",
            design:"",
            pu:"",
            stock:""
        }
            
            
        
    }
    },
    methods:{
        AjoutProduit:function(){
        axios.post("http://localhost:3000/produit/create", this.Produit).then(response=>{
            console.log("avec succès");
        }).catch(error=>{
            console.log("erreur");
        })
    }
    }
}
</script>
<style>
</style>