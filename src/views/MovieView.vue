<template>

  <div class="container text-center">
    <div class="row justify-content-md-center m-2">
      <div class="col col-lg-2">
      </div>
      <div class="col-md-auto">
        <button :disabled="this.disabled==true" @click="addToFavorites" type="button" class="btn btn-outline-secondary btn-lg">Add to favorite</button>
      </div>
      <div class="col col-lg-2">
      </div>
    </div>

    <div class="row m-2 justify-content-md-center" v-if="this.message">
      <div class="col"></div>
      <div class="col-5 text-center">
        <div class="alert alert-success text-center" role="alert">
          {{ this.message}}
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>

  <div class="post-heading text-center">
    <div
      style="color: black; text-decoration: none; font-size: 3em"
      >{{ movie.Title }}</div
    >
    <hr class="w-50 mx-auto pb-4" />
  </div>
  <div class="container p-3">
    <div class="row d-flex justify-content-center mx-auto">
      <div class="col"></div>
      <div class="col-4">
        <img
          :src="movie.Poster"
          alt="movie poster"
          class="img-fluid text-center"
        />
      </div>

      <div class="col-6">
        <ul class="list-group list-group-flush fs-5">
          <li class="list-group-item">Director: {{ movie.Director }}</li>
          <li class="list-group-item">Premiere: {{ movie.Released }}</li>
          <li class="list-group-item">{{ movie.Plot }}</li>
          <li class="list-group-item">Actors: {{ movie.Actors }}</li>
          <li class="list-group-item">Genre {{ movie.Genre}}</li>
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
      return new Promise((resolve) => {
        fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&i=${this.$route.params.id}&plot=full`)
        .then((response) => response.json())
        .then((data) => {
          this.movie = data;
          console.log(this.movie)
          onAuthStateChanged(getAuth(), (user) => {
            const q = query(collection(db, "UsersFavoriteFilms"), and(where("userId", "==", user.uid), where("data.imdbID", "==", this.movie.imdbID)))
            getDocs(q).then((response) => {
              if (response.docs.length!=0) {
                this.message = "This film is already in your collection!"
                this.disabled = true
              } else {
                this.disabled = false;
              }
          })
          resolve()
        })
      })
    })
  },

  data() {
    return {
      movie: "",
      disabled: undefined,
      message: undefined
    };
  },
  methods: {
    addToFavorites() {
      return new Promise((resolve) => {
        onAuthStateChanged(getAuth(), (user) => {
          if (!this.disabled) {
            addDoc(collection(db, "UsersFavoriteFilms"), {
              data: this.movie,
              userId: user.uid,
            });
            this.disabled = true
            this.message = "The record has been added to your collection."
          }
          resolve();
        });
      });
    },
  },
};
</script>
