<template>
  <div class="card" style="width: 18rem; margin: 10px; max-height: 900px">
    <img v-bind:src=this.movie.Poster style="max-height: 400px" class="card-img-top" alt="moviePoster">
    <div class="card-body">
      <h5 class="card-title">{{this.movie.Title}}</h5>
      
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Year: {{this.movie.Year}}</li>
      <li class="list-group-item">Actors: {{this.movie.Type}}</li>
    </ul>
    <div class="card-body">
      <a class="card-link"><router-link :to="'/movie/' + this.movie.imdbID">Go to the movie page</router-link></a>
    </div>
  </div>
</template>

<script>
export default {
    name: "FoundMovieComponent",
    props: {
        movieData: {
            typeof: Object,
            required: true
        }
    },

    data() {
        return {
            movie: this.movieData
        }
    }
}
</script>