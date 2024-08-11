<template>
  <div>
    <h1>Liste de films</h1>
    <ul>
      <li v-for="movie in movies" v-bind:key="movie.id">
        <h2>{{ movie.title }}</h2>
        <img :src="getImageUrl(movie.backdrop_path)" alt="image">
        <p>{{ movie.overview }}</p>
        <p><b>vote : </b>{{ movie.vote_count }}</p>
        <!-- Autres détails du film à afficher -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      movies: []
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = axios.get('http://localhost:3000/movies').then((response=>{
          this.movies = response.data;
        }));
        
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    getImageUrl(posterPath){
      if(posterPath){
        return 'https://image.tmdb.org/t/p/w500'+posterPath;      }
      else{
        return 'https://via.placeholder.com/500*750?text=Image+not+available';
      }
    }
  }
};
</script>
