<template>
    <div>
        <a><router-link :to="{name: 'login'}">Login</router-link></a>
    </div>
    <div>
        <a><router-link :to="{name: 'register'}">Register</router-link></a>
    </div>
    <div><button v-if="isLoggedIn" @click="handleSignOut">Sign Out</button></div>
</template>


<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

let auth;
export default {
    name: "TopBar",
    data() {
        return {
            isLoggedIn: null,
        }
    },
    mounted() {
        auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        })
    },
    methods: {
        handleSignOut() {
            signOut(auth).then(() => {
                this.$router.push({name: "home"})
            })
        }
    }
}
</script>
