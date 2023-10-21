import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"


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
    login: "[authentication] Login"
}


const actions = {
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
          console.log(error)
          context.commit(mutationType.registerFailure, error.code)
        });
      }
    )
  },

  [actionTypes.login](context, credentials) {
    context.commit(mutationType.loginStart);
    return new Promise((resolve) => {
      signInWithEmailAndPassword(getAuth(), credentials.email, credentials.password)
        .then((response) => {
          console.log("Successfully logged in", response);
          context.commit(mutationType.loginStart)
          resolve()
        })
        .catch((error) => {
          context.commit(mutationType.loginFailure, error.code)
        });
      }
    )
  }
}

export default {
    state,
    actions,
    mutations,
};