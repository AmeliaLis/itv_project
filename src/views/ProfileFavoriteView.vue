<template>
    <div> this is profile page with favorite films</div>
    {{ userId}}
    <div :v-for="movie in movieData">
        <div> {{movie.userId}}</div>
    </div>

</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/main"
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
    name: "ProfileFavoriteView",
    data() {
        return {
            movieData: [],
            userId: undefined
        }
    },

    //to fix
    mounted() {
        return new Promise((resolve) => {
            onAuthStateChanged(getAuth(), (user) => {
                console.log(user.uid)
                const q = query(collection(db, "UsersFavoriteFilms"), where("userId", "==", user.uid))
                getDocs(q).then((result) => {
                    result.forEach((doc) => {
                        this.movieData.push(doc.data())
                        this.userId = doc.data().userId
                        console.log(this.movie)
                    });
                })
                resolve()
            })
        })
            
        }
}
</script>