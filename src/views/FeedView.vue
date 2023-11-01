<template>
  <div
    class="text-secondary px-2 py-2 text-center shadow"
    style="background-color: #fefae0"
  >
    <div class="py-4">
      <h1 class="display-5 fw-bold text-black">
        Search for favorite movie or serie
      </h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">
          Quickly add and remove favorite (or not your favorite) movie from
          personal library. Check out the details of every film or serie!
        </p>
      </div>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <div class="col-6 mx-auto">
          <form @submit.prevent="SearchMovies()">
            <input
              class="form-control"
              type="text"
              placeholder="Find your favorite film!"
              v-model="search"
            />
            <button
              @click="SearchMovies"
              type="button"
              class="btn btn-outline-secondary btn-lg px-4 my-2 text-white"
              style="background-color: #606c38"
            >
              <router-link
                :to="{ name: 'feed' }"
                class="text-decoration-none text-white"
                value="Search"
                >Search</router-link
              >
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid d-flex flex-wrap justify-content-center">
    <div class="container-fluid d-flex flex-wrap justify-content-center">
      <div v-for="movie in foundMovies" :key="movie.imdbID">
        <FoundMovie :movieData="movie"></FoundMovie>
        <router-link :to="'/movie/' + movie.imdbID"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import env from "@/env.js";
import FoundMovie from "@/components/FoundMovie.vue";

export default {
  name: "FeedView",

  data() {
    return {
      foundMovies: undefined,
      search: "",
    };
  },

  components: {
    FoundMovie,
  },

  methods: {
    SearchMovies() {
      if (this.search != "") {
        fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=${this.search}`)
          .then((response) => response.json())
          .then((data) => {
            this.foundMovies = data.Search;
            this.search = "";
          });
      }
    },
  },
};
</script>
