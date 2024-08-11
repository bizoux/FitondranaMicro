<template>
  <div class="sidebar">
      <div class="logo">
        <center><img v-bind:src="Logo" alt="Logo"></center>
      </div>
      <ul class="menu">
        <li @click="selectMenuItem('')" :class="{ active: activeMenuItem === '' }" v-if="this.connexion">
          <font-awesome-icon icon="home" />
          <span>Connexion</span>
        </li>
        <li @click="selectMenuItem('PageInscription')" :class="{ active: activeMenuItem === 'PageInscription' }" v-if="this.connexion">
          <font-awesome-icon icon="user" />
          <span>S'inscrire</span>
        </li>
        <li @click="selectMenuItem('Accueil')" :class="{ active: activeMenuItem === 'Accueil' }" v-if="this.pageProtegee">
          <font-awesome-icon icon="home" />
          <span>Accueil</span>
        </li>
        <li @click="selectMenuItem('Declaration')" :class="{ active: activeMenuItem === 'Declaration' }" v-if="this.pageProtegee">
          <font-awesome-icon icon="user" />
          <span>Déclaration Fiscale</span>
        </li>
        <li @click="selectMenuItem('Paiement')" :class="{ active: activeMenuItem === 'Paiement' }" v-if="this.pageProtegee">
          <font-awesome-icon icon="credit-card" />
          <span>Paiement</span>
        </li>
        <li @click="selectMenuItem('Detail')" :class="{ active: activeMenuItem === 'Detail' }" v-if="this.pageProtegee">
          <font-awesome-icon icon="info-circle" />
          <span>Annexe</span>
        </li>
      </ul>
    
  </div>
</template>
<script>
export default {
  name:"App",
  data() {
    return {
      activeMenuItem: '',
      Logo:"src/image/logo48.png",
      connexion:true,
      pageProtegee:false
    };
  },
  methods: {
    selectMenuItem(item) {
      this.activeMenuItem = item;
      // Ajoutez ici la logique pour afficher la page correspondante
      this.$router.push({ path:'/'+ item});
    }
    }
    }
</script>
<style scoped>
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
  max-width: 100%;
  
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