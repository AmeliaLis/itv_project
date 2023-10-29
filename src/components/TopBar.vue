<template>
    <nav class="navbar navbar-expand-lg" style="background-color: #ccd5ae">
        <div class="container-fluid">
          <div class="navbar-brand fw-bold fs-1 display-2 fst-italic text-black"><router-link :to="{name: 'home'}" class="text-decoration-none text-reset">Favovie</router-link></div>

          <div class="collapse navbar-collapse float-end text-black fs-4" id="navbarNavDropdown">
            <ul class="navbar-nav text-black">
              <li class="nav-item text-black"  v-if="!isLoggedIn">
                <div class="nav-link" aria-current="page"><router-link :to="{name: 'login'}" class="text-decoration-none text-black">Login</router-link></div>
              </li>
              <li class="nav-item"  v-if="!isLoggedIn">
                <div class="nav-link"><router-link :to="{name: 'register'}" class="text-decoration-none text-black">Register</router-link></div>
              </li>
              <li class="nav-item"  v-if="isLoggedIn">
                <div class="nav-link"><router-link :to="{name: 'userProfile'}" class="text-decoration-none text-black">Profile</router-link></div>
              </li>
              <li class="nav-item" v-if="isLoggedIn">
                <div class="nav-link"><router-link :to="{name: 'feed'}" class="text-decoration-none text-black">Feed</router-link></div>
              </li>
            </ul>
          </div>

          <div class="float-end">
            <div class="float-end text-black">
              <button v-if="isLoggedIn" @click="handleSignOut" type="button" class="btn btn-outline-secondary text-reset" style="margin: 0 10px 0 0; background-color: #faedcd">Sign Out</button>
              <button class="navbar-toggler black btn btn-outline-secondary" style="background-color: #faedcd;  border-color:black" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
          
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
