<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">Navbar</a>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page"><router-link :to="{name: 'login'}" v-if="!isLoggedIn">Login</router-link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link"><router-link :to="{name: 'register'}" v-if="!isLoggedIn">Register</router-link></a>
              </li>
            </ul>
          </div>

          <div class="float-end"><button v-if="isLoggedIn" @click="handleSignOut" type="button" class="btn btn-outline-secondary">Sign Out</button></div>
        </div>
      </nav>

    
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
