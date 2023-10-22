<template>
    <div>
        <div>To jest strona z logowaniem</div>
        <h1>Sign in to an account</h1>
        <p v-if="this.validationErrors">{{ this.validationErrors }}</p>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p><button @click="loginOnSubmit">Submit</button></p>
        <p><button @click="signInWithGoogle">Sign in with Google</button></p>
    </div>
</template>


<script>
import { actionTypes } from "@/store/modules/authentication"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { mapState } from "vuex";

export default {
    name: "LoginView",
    data() {
    return {
        email: "",
        password: "",
        };
    },

    computed: {
        ...mapState({
            validationErrors: (state) => state.authentication.validationErrors
        })
    },

    methods: {
        loginOnSubmit(){
            this.$store.dispatch(actionTypes.login, {
                email: this.email,
                password: this.password
            })
            .then(() => {
                this.$router.push({ name: "feed" });
            })    
        },

        signInWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
                .then((result) => {
                    console.log(result.user);
                    this.$router.push({ name: "feed"});
                })
                .catch((error) => {
                    console.log(error.code)
                })
        }
    },
}

</script>