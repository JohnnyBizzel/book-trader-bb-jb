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
      const localStore = JSON.parse(localStorage.getItem('book-trader-bb-jb-token'));
      console.log('current local storage :: ',localStore);
      if (localStore.token) {
        state.jsonWebToken = localStore.token
        state.loggedInUser = localStore.loggedInUser
        state.userId = localStore.uid
      }        
     return state
    },
    isAuth () {
      const localStore = JSON.parse(localStorage.getItem('book-trader-bb-jb-token'));
      if (localStore) {
        console.log("CURR USR ID ", localStore.loggedInUser)
        return JSON.parse(localStorage.getItem('book-trader-bb-jb-token')).token !== null;
      } else {
        return false;
      }
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
      state.loggedInUser = userData.loggedInUser;
      console.log(JSON.stringify(userData));
      localStorage.setItem('book-trader-bb-jb-token', JSON.stringify(userData)); 
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
//         console.log(res.user)
//         console.log(res.user.refreshToken)
        
//         console.log(res.user.uid)
      
        let currentUser = '';
        var usersRef = firebase.database().ref('users');
        var test = usersRef.orderByChild("email").equalTo(res.user.email);
              // console.log('find',test);

          usersRef.on("value", function(snapshot) {


             snapshot.forEach(function(childSnapshot) {
              // console.log(childSnapshot);
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
             // console.log(childData.uid, res.user.uid)
              if(childData.uid === res.user.uid) {
                //console.log(childData.username);
                currentUser = childData.username;
              }
            })
            
        // set logged in user
            commit('authenticateUser', {
               token: res.user.refreshToken,
               uid: res.user.uid,
               loggedInUser: currentUser
            })
            router.push('/profile');

          })
        
 
      })
      .catch(err => { 
        console.log(err.message)
        commit('saveErrors', {
           message: err.message
         });
      }) 
    },
//     checkUserDatabase() {
//       firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//           console.log('NAV auth stage changed <--------');
//           this.title = 'Welcome';
//           var usersRef = firebase.database().ref('users');
//           var test = usersRef.orderByChild("email").equalTo(user.email);
//               // console.log('find',test);
//           usersRef.on("value", function(snapshot) {
//              snapshot.forEach(function(childSnapshot) {
//               // console.log(childSnapshot);
//               var key = childSnapshot.key;
//               var childData = childSnapshot.val();
//               console.log(childData.uid, user.uid)
//               if(childData.uid === user.uid) {
//                 console.log(childData.username);
//               // this.currentUsername = childData.username;
//               }
//             })
//           })
//         } else {
//         // No user is signed in.
//           console.log('not auth');
//         }
//       });
//     },
    logOut() {
      firebase.auth().signOut()
      localStorage.setItem('book-trader-bb-jb-token', null);
      // this.state.userId = null;
      // this.jsonWebToken = null;
      // this.loggedInUser = null;
    }
  }
   
})
 
export default store;