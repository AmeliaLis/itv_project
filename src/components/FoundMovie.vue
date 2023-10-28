<template>
    <div class="card" style="width: 18rem; max-height: 900px">
        <img v-bind:src=movie.Poster style="max-height: 400px" class="card-img-top" alt="moviePoster">
        <div class="card-body">
          <h5 class="card-title">{{movie.Title}}</h5>
          <div class="overflow-auto" style="max-height: 200px">
            <p class="card-text">{{movie.Plot}}</p>
          </div>
          
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{movie.Year}}</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
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
            movie: this.movieData.data().data
        }
    }
}
</script>