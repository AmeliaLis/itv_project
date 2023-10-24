<template>
    <div> this is profile page with favorite films</div>
    {{ favoriteMovies }}
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/main"
import { onMounted } from "vue";
import { ref } from "vue";

const favoriteMovies = ref([])

onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, "UsersFavoriteFilms"));
    let favMovies = []
    console.log(querySnapshot)
    console.log("jestem w srodku mounted")
    querySnapshot.forEach((doc) => {
        console.log(doc)
        console.log("for each block")
  // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const favMovie = {
            id: doc.id,
            movie: doc.data().movie,
            email: doc.data().email
        }
        favMovies.push(favMovie)
    })
    favoriteMovies.value = favMovies;
    }
)
</script>