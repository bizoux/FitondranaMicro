<template>
    <Center><div>
      <h2>Login</h2>
      <form @submit.prevent="SeConnecter()">
        <input type="text" v-model="username" placeholder="Nom d'utilisateur" required>
        <input type="password" v-model="password" placeholder="Mot de passe" required>
        <button type="submit">Connexion</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div></Center>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        message: ''
      };
    },
    methods: {
      SeConnecter() {
        // Envoyez les données de connexion à l'API backend
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: this.username, password: this.password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.token) {

              // Stockez le token dans le stockage local (ou les cookies) pour l'authentification ultérieure
              localStorage.setItem('token', data.token);
              this.message = 'Connexion réussie';
              // Redirigez l'utilisateur vers une page protégée (par exemple, le tableau de bord)
            //   this.$router.push('/Detail');
            } else {
              this.message = 'Échec de la connexion';
            }
          })
          .catch((error) => {
            console.error('Erreur:', error);
            this.message = 'Erreur de connexion';
          });
      },
    },
  };
  </script>
  