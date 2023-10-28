<template>
    <div> this is profile page with favorite films</div>
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
            favMovies: undefined
        }
    },

    components: {
        FavMovie
    },

    //to fix
    mounted() {
        return new Promise((resolve) => {
            onAuthStateChanged(getAuth(), (user) => {
                console.log(user.uid)
                const q = query(collection(db, "UsersFavoriteFilms"), where("userId", "==", user.uid))
                getDocs(q).then((result) => {
                    this.favMovies = result.docs
                })
                resolve()
            })
        })
            
        }
}
</script>