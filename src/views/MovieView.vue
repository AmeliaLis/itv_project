<template>
    <div>
      <h2>{{ movie.Title }}</h2>
      <p>{{ movie.Year }}</p>
      <img :src="movie.Poster" alt="Movie Poster" />
      <p>{{ movie.Plot }}</p>
      <p>{{ movie.Actors }}</p>
    </div>
    <div>
      <button @click="addToFavorites">
        Click here to add to your favorites movies
      </button>
    </div>
  </template>
  
  <script>
  import env from "@/env";
  import { onAuthStateChanged, getAuth } from "firebase/auth";
  import { addDoc, collection } from "firebase/firestore";
  import { db } from "@/main";
  
  export default {
    name: "MovieView",
    mounted() {
      fetch(
        `http://www.omdbapi.com/?apikey=${env.apikey}&i=${this.$route.params.id}&plot=full`
      )
        .then((response) => response.json())
        .then((data) => {
          this.movie = data;
          console.log(this.movie);
        });
    },
    data() {
      return {
        movie: "",
      };
    },
    methods: {
      addToFavorites() {
        return new Promise((resolve) => {
          onAuthStateChanged(getAuth(), (user) => {
            addDoc(collection(db, "UsersFavoriteFilms"), {
              data: this.movie,
              userId: user.uid,
            });
            resolve();
          });
        });
      },
    },
  };
  </script>