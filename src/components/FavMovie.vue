<template>
  <div class="card" style="width: 18rem; margin: 10px; max-height: 900px">
    <img
      v-bind:src="movie.Poster"
      style="max-height: 400px"
      class="card-img-top"
      alt="moviePoster"
    />
    <div class="card-body">
      <h5 class="card-title" style="height: 50px">{{ movie.Title }}</h5>
      <div class="overflow-auto" style="height: 150px">
        <p class="card-text">{{ movie.Plot }}</p>
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Premiere date: {{ movie.Released }}</li>
      <li class="list-group-item">Actors: {{ movie.Actors }}</li>
    </ul>
    <div class="card-body">
      <a class="card-link"
        ><router-link :to="'/movie/' + movie.imdbID"
          >Go to the movie page</router-link
        ></a
      >
      <button
        class="btn btn-outline-danger"
        style="margin-left: 15px"
        @click="removeFromFavorite"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import {
  collection,
  where,
  and,
  deleteDoc,
  query,
  getDocs,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db } from "@/main";

export default {
  name: "FavMovieComponent",
  props: {
    movieData: {
      typeof: Object,
      required: true,
    },
  },

  data() {
    return {
      movie: this.movieData.data().data,
    };
  },

  methods: {
    removeFromFavorite() {
      return new Promise((resolve) => {
        onAuthStateChanged(getAuth(), (user) => {
          const q = query(
            collection(db, "UsersFavoriteFilms"),
            and(
              where("userId", "==", user.uid),
              where("data.imdbID", "==", this.movie.imdbID)
            )
          );
          getDocs(q).then((response) => {
            const id = response.docs[0].id;
            deleteDoc(doc(db, "UsersFavoriteFilms", id)).then(() => {
              this.$router.go();
              resolve();
            });
          });
        });
      });
    },
  },
};
</script>
