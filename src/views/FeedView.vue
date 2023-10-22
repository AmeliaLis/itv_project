<template>
    <div>
        To jest strona z feedem która mnie przekierowuje gdy się zarejestruje i jestem zalogowana
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