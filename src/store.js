import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './router';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    userId: null,
    jsonWebToken: null,
    errors: [],
    loggedInUser: null,
    count: 1
  },
  getters: {
    getLoggedInUser: state => {
     return "Welcome, " + state.loggedInUser
    },
    jwt: state => state.jsonWebToken,
    //jwtData: (state, getters) => state.jsonWebToken ? JSON.parse(atob(getters.jwt.split('.')[1])) : null,
    // jwtSubject: (state, getters) => getters.jwtData ? getters.jwtData.sub : null,
    // jwtIssuer: (state, getters) => getters.jwtData ? getters.jwtData.iss : null
  },
  mutations: {     
    authenticateUser (state, userData) {
     state.userId = userData.uid;
     state.jsonWebToken = userData.token;
    },
    saveErrors (state, error) {
     state.errors.push(error.message);
    },
    setJWT(state, jwt) {
      // When this updates, the getters and anything bound to them updates as well.
      state.jsonWebToken = jwt;
    }
  },
  actions: {
    signIn ({commit}, payload) {
      console.log('Sign in attempt', payload.email)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log(res.user)
        console.log(res.user.refreshToken)
        console.log(res.user.uid)
        //nst uToken = user.getIdToken();
        // var u = firebase.auth().currentUser;
        // if (u) {
        //   // User is signed in.
        //   console.log(u)
        // } else {
        //   // No user is signed in.
        //   console.log('no u')
        // }
        // //console.log(uToken)
        // set logged in user
       commit('authenticateUser', {
         token: res.user.refreshToken,
         uid: res.user.uid
       })
        router.push('/profile');
        
      })
      .catch(err => { 
        console.log(err.message)
        commit('saveErrors', {
           message: err.message
         });
      }) 
    },
    logOut() {
      firebase.auth().signOut()
        // .then(() => {
        //   this.$router.replace('login')
      //})
    }
  }
   
})
 
export default store;