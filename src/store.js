import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './router';
import axios from 'axios';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    userId: null,
    jsonWebToken: null,
    errors: [],
    loggedInUser: null,
    count: 1,
    book: null,
    books: []
  },
  getters: {
    getLoggedInUser: state => {
      const localStore = JSON.parse(localStorage.getItem('book-trader-bb-jb-token'));    
      console.log(localStore);
      if (localStore) {
        state.jsonWebToken = localStore.token
        state.loggedInUser = localStore.loggedInUser
        state.userId = localStore.uid
      }        
      return state
    },
    getBook: state => {
      state.book
    },
    getBooks: state => {
      state.books
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
      localStorage.setItem('book-trader-bb-jb-token', JSON.stringify(userData)); 
    },
    unAuthenticateUser (state) {
      state.userId = null;
      state.jsonWebToken = null;
      state.loggedInUser = null;      
      localStorage.setItem('book-trader-bb-jb-token', null);
    },
    saveErrors (state, error) {
     state.errors.push(error.message);
    },
    setJWT(state, jwt) {
      // When this updates, the getters and anything bound to them updates as well.
      state.jsonWebToken = jwt;
    },
    setBook (state, book) {
      state.book = book;
    },
    setBooks (state, books) {
      state.books = books;
    }
  },
  actions: {
    register({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {

          var userRef = firebase.database().ref("users");
          console.log(userRef);
          userRef.push({ uid : res.user.uid,
             username: payload.username,
             email: payload.email,
             city: payload.city,
             tradeByPost: payload.tradeByPost,
             tradeInPerson: payload.tradeInPerson });
          // move to profile if successful?
         commit('authenticateUser', {
           token: res.user.refreshToken,
           uid: res.user.uid,
           loggedInUser: payload.username
        })
            router.push('/profile');
        }, (err) => {
          console.log(err)
          this.errors.push(err.message);
        })    
       
    },
    signIn ({commit}, payload) {
      console.log('Sign in attempt', payload.email)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {

        let currentUser = '';
        var usersRef = firebase.database().ref('users');
        var test = usersRef.orderByChild("email").equalTo(res.user.email);
              // console.log('find',test);

          usersRef.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

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
    logOut({commit}) {
      firebase.auth().signOut()
      commit('unAuthenticateUser')
      //localStorage.setItem('book-trader-bb-jb-token', null);
    },
    // API calls
    getBookById({commit}, bookId) {
      const xml2js = require('xml2js'); // XML to JSON
      const parser = xml2js.Parser({explicitArray: false});
      const apiKey = process.env.VUE_APP_BOOK_READS_API;
      const api = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show/${bookId}?format=xml&key=${apiKey}`
      axios.get(api).then((response) => {
        //console.log(response.data)
        parser.parseString(response.data,
          function(err, result) {
              if (err) console.log(err);
              console.log(result.GoodreadsResponse.book);
              // cb(null, result.GoodreadsResponse.book);
              // call the mutation to set the book object (in state)
              commit('setBook', result.GoodreadsResponse.book)
          });
      })
    },
    searchBooks({commit}, searchTerm) {
      // https://www.goodreads.com/search/index.xml  
      const xml2js = require('xml2js'); // XML to JSON
      const parser = xml2js.Parser({explicitArray: false});
      const apiKey = process.env.VUE_APP_BOOK_READS_API;
      const api = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?format=xml&key=${apiKey}&q=${searchTerm}`
      axios.get(api).then((response) => {
        //console.log(response.data)
        parser.parseString(response.data,
          function(err, result) {
              if (err) console.log(err);
              console.log(result.GoodreadsResponse.search.results.work);  
              if (result.GoodreadsResponse.search.results.work)
                commit('setBooks', result.GoodreadsResponse.search.results.work);
              // call the mutation to set the book object (in state)
              // commit('setBook', result.GoodreadsResponse.book)
          });
      })
    },
    saveBook({commit}, book) {
      // save a book to my books collection
    },
    getmyBooks({commit}) {
      // get all my books available to trade
    },
    getOtherUserBooks({commit}, userId) {
      // show all available books for trade minus my books
    },
    showTrades() {
    }
  }
})
 
export default store;