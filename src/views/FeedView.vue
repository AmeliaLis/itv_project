<template>
    <div class="text-secondary px-2 py-2 text-center shadow" style="background-color: #fefae0">
        <div class="py-5">
          <h1 class="display-5 fw-bold text-black">Search for favorite movie or serie</h1>
          <div class="col-lg-6 mx-auto">
            <p class="fs-5 mb-4">Quickly add and remove favorite (or not your favorite) movie from personal library. Check out the details of every film or serie!</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button type="button" class="btn btn-outline-secondary btn-lg px-4 me-sm-3 text-white" style="background-color: #606c38"><router-link :to="{name: 'feed'}" class="text-decoration-none text-white">Search</router-link></button>
            </div>
          </div>
        </div>
      </div>
    


    <div>
        <form @submit.prevent="SearchMovies()">
            <input type="text" placeholder="Find your favorite film!" v-model="search" />
            <input type="submit" value="Search" />
        </form>

        <div>
            <div v-for="movie in movies" :key="movie.imdbID">
                <router-link :to="'/movie/' + movie.imdbID">
                    <div>
                        <img :src="movie.Poster" alt="Movie Poster" />
                        <div>{{ movie.Type }}</div>
                    </div>
                <div>
                    <p>{{ movie.Year }}</p>
                    <h3>{{ movie.Title }}</h3>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import env from '@/env.js'
import { ref } from 'vue';

export default {
    name: "FeedView",
    setup() {
        const search = ref("");
        const movies = ref([]);

        const SearchMovies = () => {
            if (search.value != "") {
                fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`)
                    .then(response => response.json())
                    .then(data => {
                        movies.value = data.Search;
                        search.value = "";
                });
            }
        }
        
        return {
            search,
            movies,
            SearchMovies
        }
    }
}
</script>