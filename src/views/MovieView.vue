<template>
    <div>
      <button :disabled="this.message" @click="addToFavorites">
        Click here to add to your favorites movies
      </button>
    </div>

    <div class="alert" v-if="this.message">
      <div>{{this.message}}</div>
    </div>

    <div class="post-heading text-center">
      <a href='{{movie.url}}' target="_blank" style="color: black; text-decoration: none; font-size: 3em">{{movie.Title}}</a>
          <hr class="w-50 mx-auto pb-4">
    </div>
    <div class="container p-3">
        <div class="row d-flex justify-content-center mx-auto">
            <div class="col"></div>
            <div class="col-4">
                <img :src="movie.Poster" alt="movie poster" class="img-fluid text-center">
            </div>

            <div class="col-6">
              <ul class="list-group list-group-flush fs-5">
                  <li class="list-group-item">Director: {{ movie.Director }}</li>
                  <li class="list-group-item">Premiere: {{movie.Released}} </li>
                  <li class="list-group-item">{{ movie.Plot }}</li>
                  <li class="list-group-item">Actors: {{ movie.Actors }}</li>
                  <li class="list-group-item"></li>
              </ul>
            </div>

            <div class="col"></div>
        </div>
    </div>
  </template>
  
  <script>
  import env from "@/env";
  import { onAuthStateChanged, getAuth } from "firebase/auth";
  import { addDoc, collection, where, query, getDocs, and } from "firebase/firestore";
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
        message: undefined
      };
    },
    methods: {
      addToFavorites() {
        return new Promise((resolve) => {
          onAuthStateChanged(getAuth(), (user) => {
            console.log(this.movie.imdbID)
            const q = query(collection(db, "UsersFavoriteFilms"), and(where("userId", "==", user.uid), where("data.imdbID", "==", this.movie.imdbID)))
            console.log(q)


            getDocs(q).then((response) => {
              console.log(response.docs.length)
              if (response.docs.length==0) {
                this.message = "Film has been added to your profile"
                addDoc(collection(db, "UsersFavoriteFilms"), {
                  data: this.movie,
                  userId: user.uid,
                });
              } else {
                console.log("already added")
                this.message = "Already added";
              }
            })

            
            resolve();
          });
        });
      },
    },
  };
  </script>