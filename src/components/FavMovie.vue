<template>
    <div class="card" style="width: 18rem; margin: 10px; max-height: 900px">
        <img v-bind:src=movie.Poster style="max-height: 400px" class="card-img-top" alt="moviePoster">
        <div class="card-body">
          <h5 class="card-title">{{movie.Title}}</h5>
          <div class="overflow-auto" style="height: 200px">
            <p class="card-text">{{movie.Plot}}</p>
          </div>
          
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Premiere date: {{movie.Released}}</li>
          <li class="list-group-item">Actors: {{movie.Actors}}</li>
          <li class="list-group-item">Director: {{movie.Director}}</li>
        </ul>
        <div class="card-body">
          <a class="card-link"><router-link :to="'/movie/' + movie.imdbID">Go to the movie page</router-link></a>
        </div>
      </div>
</template>

<script>
export default {
    name: "FavMovieComponent",
    props: {
        movieData: {
            typeof: Object,
            required: true
        }
    },

    data() {
        return {
            movie: this.movieData.data().data
        }
    }
}
</script>