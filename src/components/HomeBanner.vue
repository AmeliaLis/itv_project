<template>
  <div class="container my-5">
    <div class="row p-4 align-items-center rounded-3 border shadow-lg">
      <div class="col-lg-7 p-3">
        <h1 class="display-4 fw-bold lh-1 text-body-emphasis">
          Find and add favorite movies to your library
        </h1>
        <p class="lead">
          Thanks to the IMDB API, you can quickly and conveniently find your
          favorite movie or series for your private library.
        </p>
        <div
          class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3"
        >
          <button
            v-if="!isLoggedIn"
            type="button"
            class="btn btn-outline-secondary btn-lg"
            style="background-color: #606c38"
          >
            <router-link
              :to="{ name: 'login' }"
              class="text-decoration-none text-white"
              >Sign in</router-link
            >
          </button>
          <button
            v-if="!isLoggedIn"
            type="button"
            class="btn btn-outline-secondary btn-lg px-4"
          >
            <router-link
              :to="{ name: 'register' }"
              class="text-decoration-none text-black"
              >Register</router-link
            >
          </button>
          <button
            v-if="isLoggedIn"
            type="button"
            class="btn btn-outline-secondary btn-lg px-4"
          >
            <router-link
              :to="{ name: 'feed' }"
              class="text-decoration-none text-black"
              >Search</router-link
            >
          </button>
        </div>
      </div>
      <div class="col-lg-5 p-0 overflow-hidden">
        <img
          class="rounded-lg-3 mx-lg-auto"
          src="@/assets/filmcollage.jpg"
          alt=""
          width="720"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
let auth;
export default {
  name: "HomeBanner",
  data() {
    return {
      isLoggedIn: null,
    };
  },
  mounted() {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
};
</script>
