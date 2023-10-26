<template>
    <div> this is profile page with favorite films</div>
    {{ data[0]}}

</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/main"
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
    name: "ProfileFavoriteView",
    data() {
        return {
            data: [],
        }
    },
    mounted() {
        
            onAuthStateChanged(getAuth(), (user) => {
                console.log(user.uid)
                const q = query(collection(db, "UsersFavoriteFilms"), where("userId", "==", user.uid))
                getDocs(q).then((result) => {
                    result.forEach((doc) => this.data.push(doc.data()));
                })
            })
        }
}
</script>