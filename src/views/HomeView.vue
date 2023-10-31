<template>

    <home-banner></home-banner>

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
import HomeBanner from '@/components/HomeBanner.vue'
let auth;
    export default {
    name: "HomeView",
    components: {
      HomeBanner
    },
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
