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
    books: [],
    myBooks: [],
    allBooks: []
  },
  getters: {
    getLoggedInUser: state => {
      const localStore = JSON.parse(localStorage.getItem('book-trader-bb-jb-token'));          
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
    getMyBooks: state => {
      state.myBooks
    },
    isAuth () {
      const localStore = JSON.parse(localStorage.getItem('book-trader-bb-jb-token'));
      if (localStore) {
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
    },
    saveBookInformation (state, book) { // add a new book to my books (save to Firebase)
      let newState = state.myBooks;
      newState.push(book);
      console.log(state.myBooks);
      state.myBooks = newState;      
    },
    setMyBooks (state, books) { // get all my books (coming from Firebase)
      state.myBooks = books
    },
    clearSearchResults (state) {
      state.books = []
    },
    clearMyBooks (state) {
      return state.myBooks = []
    }
  },
  actions: {
    register({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {

          var userRef = firebase.database().ref("users");
          // console.log(userRef);
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
      // console.log('Sign in attempt', payload.email)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {

        let currentUser = '';
        var usersRef = firebase.database().ref('users');
        var test = usersRef.orderByChild("email").equalTo(res.user.email);
             
          usersRef.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

              var key = childSnapshot.key;
              var childData = childSnapshot.val();
             
              if(childData.uid === res.user.uid) {             
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
              //console.log(result.GoodreadsResponse.book);
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
        
        parser.parseString(response.data,
          function(err, result) {
              if (err) console.log(err);
              if (result.GoodreadsResponse.search.results.work)
                commit('setBooks', result.GoodreadsResponse.search.results.work);        
          });
      })
    },
    saveBook({commit}, book) {
      const user_id = this.state.userId;

      let fbBookToAdd = {}, nodeName = {}; 
      nodeName[user_id] = {
            bookTitle: book.best_book.title,
            authorName: book.best_book.author.name,
            bookId: book.best_book.id._,
            photoURL: book.best_book.image_url,
          }
      
      fbBookToAdd = nodeName;
      console.log('adding book in store:' + fbBookToAdd);
      
      if (!user_id) return;
      var bookRef = firebase.database().ref('books');
      bookRef.push(fbBookToAdd).then((snap) => {
        console.log('saving book - promise')
        commit('saveBookInformation', fbBookToAdd);      
      });
      
    },
    deleteBook({commit, state}, bookId) {
      var booksRef = firebase.database().ref('books');
      //console.log(booksRef.child(['.key']));
      
//       console.log('Deleting:', bookId)
//       // Create a reference to the books collection

      
      booksRef.once('value')
      .then(function(snapshot) {
        var fbId = "";
        snapshot.forEach(function(childSnapshot) {
            // childSnapshot.remove();
          console.log(childSnapshot.key);
          var oneBook = childSnapshot.val();
          if (oneBook.hasOwnProperty(state.userId)) {
            // the user's book to delete
            if (oneBook[state.userId].bookId == bookId) { 
              fbId = childSnapshot.key;
              booksRef.child(fbId).remove().then(() => { 
                console.log(fbId, ' deleted')
                alert('Your book was deleted')
                // todo: update state
              })                                            
            }
          }
        })
      })
    },
    getMyBooks({commit}) {
      // get all my books available to trade
      var bookRef = firebase.database().ref('books');
      let tempArray = [];
      bookRef.once('value')
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          
          tempArray.push(childSnapshot.val())
          //console.log(tempArray)
        })
        commit('setMyBooks', tempArray)         
      })
      
    },
    getOtherUserBooks({commit}, userId) {
      // show all available books for trade minus my books
    },
    showTrades() {
      
    },
    clearSearch({commit}) {
      // clear search results from state
      commit('clearSearchResults')       
    },
    clearMyBooks({commit}) {
      // clear myBooks from state
      return commit('clearMyBooks')       
    }
  }
})
 
export default store;