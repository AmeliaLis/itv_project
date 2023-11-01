<template>
    <div class="text-secondary px-2 py-2 text-center shadow" style="background-color: #fefae0">
        <div class="py-5">
          <h1 class="display-5 fw-bold text-black">Check your favorite movies</h1>
          <div class="col-lg-6 mx-auto">
            <p class="fs-5 mb-4">Quickly add and remove favorite (or not your favorite) movie from personal library. Check out the details of every film or serie!</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button type="button" class="btn btn-outline-secondary btn-lg px-4 text-white" style="background-color: #606c38"><router-link :to="{name: 'feed'}" class="text-decoration-none text-white">Go to Feed page and search for more!</router-link></button>
            </div>
          </div>
        </div>
      </div>

    <div v-if="moviesCount<1"  class="flex row m-5">
        <div class="col"></div>
        <div class="alert alert-dark col-6" role="alert">
            There are no movies to display. Please add records.
        </div>
        <div class="col"></div>
    </div>


    <div class="container-fluid d-flex flex-wrap justify-content-center">
        <div class="container-fluid d-flex flex-wrap justify-content-center">
            <div v-for="(movie, index) in favMovies" :key="index">
                <FavMovie :movieData="movie"></FavMovie>
            </div>
        </div>
    </div>

</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/main"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FavMovie from "@/components/FavMovie.vue";


export default {
    name: "ProfileFavoriteView",
    data() {
        return {
            favMovies: undefined,
            moviesCount: 0
        }
    },

    components: {
        FavMovie
    },

    mounted() {
        return new Promise((resolve) => {
            onAuthStateChanged(getAuth(), (user) => {
                const q = query(collection(db, "UsersFavoriteFilms"), where("userId", "==", user.uid))
                getDocs(q).then((result) => {
                    this.favMovies = result.docs
                    this.moviesCount = result.docs.length
                })
                resolve()
            })
        })
    }
}
</script>