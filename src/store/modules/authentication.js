import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

//isSubmitting is only to disable/enable the button for register/login, I think it's unnecessary as I don't use it -> needs to be deleted
//also isLoggedIn is state is not needed, as google firebase provides a method to check if a user is logged in or not -> needs to be deleted
const state = {
    isSubmitting: false,
    isLoggedIn: null,
    isLoading: false,
    validationErrors: null,
};

export const mutationType = {
    registerStart: "[auth] Register start",
    registerSuccess: "[auth] Register success",
    registerFailure: "[auth] Register failure",
  
    loginStart: "[auth] Login start",
    loginSuccess: "[auth] Login Success",
    loginFailure: "[auth] Login Failure",
}

//this section of mutations provides a list of states that are going to change when the mutation action is run
const mutations = {
    [mutationType.registerStart](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [mutationType.registerSuccess](state) {
      state.isSubmitting = false;
      state.isLoggedIn = true;
    },
    [mutationType.registerFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
      state.isLoggedIn = false;
    },
    [mutationType.loginStart](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [mutationType.loginSuccess](state) {
      state.isSubmitting = false;
      state.isLoggedIn = true;
    },
    [mutationType.loginFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
}

export const actionTypes = {
    register: "[authentication] Register",
    login: "[authentication] Login",
    loginOrRegisterWithGoogle: "[authentication] Sign in with Google"
}


const actions = {

//this action provides a register action with users' email and password
  [actionTypes.register](context, credentials) {
    context.commit(mutationType.registerStart);
    return new Promise((resolve) => {
      createUserWithEmailAndPassword(getAuth(), credentials.email, credentials.password)
        .then((response) => {
          console.log("Successfully registered", response);
          context.commit(mutationType.registerSuccess)
          resolve()
        })
        .catch((error) => {
          context.commit(mutationType.registerFailure, error.code)
        });
      }
    )
  },

//this action provides a login action with users' email and password
  [actionTypes.login](context, credentials) {
    context.commit(mutationType.loginStart);
    return new Promise((resolve) => {
      signInWithEmailAndPassword(getAuth(), credentials.email, credentials.password)
        .then((response) => {
          console.log("Successfully logged in", response);
          context.commit(mutationType.loginSuccess)
          resolve()
        })
        .catch((error) => {
          context.commit(mutationType.loginFailure, error.code)
        });
      }
    )
  },

//this action provides a register and login action with google mail
  [actionTypes.loginOrRegisterWithGoogle](context) {
    context.commit(mutationType.loginStart)
    return new Promise((resolve) => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user)
        context.commit(mutationType.loginSuccess)
        resolve()
      })
      .catch((error) => {
        context.commit(mutationType.loginFailure, error.code)
      });
    })
  }
}


export const getterTypes = {
  validationErrors: "[auth] Get validation errors"
};

const getters = {
  [getterTypes.validationErrors]: (state) => {
    return state.validationErrors;
  },
}

export default {
    state,
    actions,
    mutations,
    getters
};