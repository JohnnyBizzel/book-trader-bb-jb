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
      state.loggedInUser = userData.loggedInUser;
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
      
        let currentUser = '';
        var usersRef = firebase.database().ref('users');
        var test = usersRef.orderByChild("email").equalTo(res.user.email);
              // console.log('find',test);

          usersRef.on("value", function(snapshot) {


             snapshot.forEach(function(childSnapshot) {
              // console.log(childSnapshot);
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
              console.log(childData.uid, res.user.uid)
              if(childData.uid === res.user.uid) {
                console.log(childData.username);
                currentUser = childData.username;
              }
            })
          })
        
        // set logged in user
       commit('authenticateUser', {
         token: res.user.refreshToken,
         uid: res.user.uid,
         loggedInUser: currentUser
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
        // .then(() => {
        //   this.$router.replace('login')
      //})
    }
  }
   
})
 
export default store;