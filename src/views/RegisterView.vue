<template>
  <div
    class="container-fluid justify-content-center text-center px-4 py-2 my-4"
  >
    <p v-if="this.validationErrors">{{ this.validationErrors }}</p>

    <div>
      <div class="fs-1 my-2">Create an account</div>
      <div class="row">
        <div class="col"></div>
        <div class="col-8">
          <form>
            <div class="row mb-3">
              <label
                for="inputEmail3"
                class="text-start col-sm-3 col-form-label"
                >Email:</label
              >
              <div class="col-sm-8">
                <input
                  type="email"
                  placeholder="your-login@domain.com"
                  v-model="email"
                  class="form-control"
                  id="inputEmail3"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label
                for="inputPassword3"
                class="text-start col-sm-3 col-form-label"
                >Password:</label
              >
              <div class="col-sm-8">
                <input
                  type="password"
                  placeholder="must contain 8 letters"
                  v-model="password"
                  class="form-control"
                  id="inputPassword3"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="col"></div>
      </div>
    </div>

    <p>
      <button
        class="btn btn-lg btn-outline-secondary text-white"
        style="background-color: #606c38"
        @click="registerOnSubmit"
      >
        Submit
      </button>
    </p>
    <p>
      <button
        class="btn btn-lg btn-outline-secondary text-white"
        style="background-color: #606c38"
        @click="signInWithGoogle"
      >
        Sign in with Google
      </button>
    </p>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/authentication";
import { mapState } from "vuex";

export default {
  name: "RegisterView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      validationErrors: (state) => state.authentication.validationErrors,
    }),
  },
  methods: {
    registerOnSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "feed" });
        });
    },

    signInWithGoogle() {
      this.$store.dispatch(actionTypes.loginOrRegisterWithGoogle).then(() => {
        this.$router.push({ name: "feed" });
      });
    },
  },
};
</script>
