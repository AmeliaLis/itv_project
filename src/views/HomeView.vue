<template>
    <div class="container my-5">
      <div class="row p-4 align-items-center rounded-3 border shadow-lg">
        <div class="col-lg-7 p-3">
          <h1 class="display-4 fw-bold lh-1 text-body-emphasis">Find and add favorite movies to your library</h1>
          <p class="lead">Thanks to the IMDB API, you can quickly and conveniently find your favorite movie or series for your private library.</p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <button v-if="this.isLoggedIn" type="button" class="btn btn-outline-secondary btn-lg" style="background-color: #606c38"><router-link :to="{name: 'login'}" class="text-decoration-none text-white">Sign in</router-link></button>
            <button v-if="this.isLoggedIn" type="button" class="btn btn-outline-secondary btn-lg px-4"><router-link :to="{name: 'register'}"></router-link>Register</button>
            <button v-if="!this.isLoggedIn" type="button" class="btn btn-outline-secondary btn-lg px-4"><router-link :to="{name: 'feed'}" class="text-decoration-none text-black">Search</router-link></button>
          </div>
        </div>
        <div class="col-lg-5 p-0 overflow-hidden">
            <img class="rounded-lg-3 mx-lg-auto " src="@/assets/filmcollage.jpg" alt="" width="720">
        </div>
      </div>
    </div>

    <div class="container px-4 py-2" id="hanging-icons">
      <h2 class="border-bottom">About me and Favovie project</h2>
      <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
        
        <div class="col d-flex align-items-start">
          <div>
            <h3 class="fs-2 text-body-emphasis">About me</h3>
            <p>I am a Applied Informatics Student, willing to learn programming. Here is my Linkedin.</p>
            <a href="https://www.linkedin.com/in/amelia-lis/" class="btn btn-outline-secondary">
              Go to my Linkedin profile
            </a>
          </div>
        </div>
        
        <div class="col d-flex align-items-start">
          <div>
            <h3 class="fs-2 text-body-emphasis">Project info</h3>
            <p>Favovie web page was created as part of the "Introduction to vue.js" course at the University of Economics in Cracow. 
            </p>
            <p>
              Technologies that were used to create this project:
              vue.js, javascript, bootstrap, Google firebase, api and html.
            </p>
            <a href="https://github.com/AmeliaLis" class="btn btn-outline-secondary">
              Check my other projects on Github
            </a>
          </div>
        </div>
        
        <div class="col d-flex align-items-start">
          <div>
            <h3 class="fs-2 text-body-emphasis">API</h3>
            <p>Thanks to this API, I could easily find and show necessary details of films that I needed.</p>
            <a href="http://www.omdbapi.com" class="btn btn-outline-secondary">
              Check out this OMDb API
            </a>
          </div>
        </div>
      </div>
    </div>

</template>


<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
let auth;
    export default {
    name: "HomeView",
    data() {
      return {
        src: '@/assets/filmcollage.jpg',
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
}
</script>
