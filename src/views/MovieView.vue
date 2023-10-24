<template>
    <div>
        <h2>{{movie.Title}}</h2>
        <p>{{ movie.Year }}</p>
        <img :src="movie.Poster" alt="Movie Poster" />
        <p>{{ movie.Plot }}</p>
        <p>{{ movie.Actors }}</p>
    </div>
    <div>
        <button>Click here to add to your favorites movies</button>
    </div>
</template>


<script>
import env from "@/env"
import { ref, onBeforeMount } from 'vue';
import { useRoute } from "vue-router";

export default {
    name: "MovieView",
    setup() {
        const movie = ref({});
        const route = useRoute();

        onBeforeMount(() => {
            fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`)
                .then(response => response.json())
                .then(data => {
                    movie.value = data;
                    console.log(movie.value)
                });
        });
        return {
            movie
        }
    }
}

</script>