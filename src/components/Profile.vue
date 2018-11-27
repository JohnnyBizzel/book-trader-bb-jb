<template>

<div>
    <Nav/>
      <div class="container">
        <p>{{ currentUsername }}, please add books that you wish to trade to the system. Other users will be able to request them for exchange.</p>
        <div class="input-field col s12">
          <input v-model="term" type="text" id="search_input" />
          <label for="search_input">Search for books by title, author or ISBN:</label>
          <a @click="searchBooks" class="waves-effect waves-light btn brown lighten-2">Search</a>
        </div>  
      </div>
      <div class="container">
        <div class="flexbox-container">
          <div class="card" v-for="b in books">        
            <div class="card-image">
              <img class="fixed-height" v-bind:src="b.best_book.image_url">
              <p>{{ b.best_book.title }}</p>
              <p>{{ b.best_book.author.name }}</p>
              <a class="btn-floating halfway-fab waves-effect waves-light red"><i @click="saveBook(b)" class="material-icons">add</i></a>
            </div>
            <div class="card-action">
              <span class="blue-text text-lighten-2" @click="saveBook(b)">Add book</span>
            </div>
          </div>
        </div>  
      </div>
      <div class="container">
        <h5>My Books:</h5>
        <ul class="collection">
          <li v-for="(mykey, i) in myBooks" class="fixed-height gray-border">
            <img class="left" v-bind:src="mykey.photoURL">
            <span class="title">{{ mykey.bookTitle }}</span> 
              <p>Book Id: {{ mykey.bookId }} <br>
                {{ mykey.authorName }}
              </p> 
              <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>            
            <a href="#!" class="secondary-content"><i class="material-icons" @click="deleteBook(mykey.bookId)">delete_forever</i></a>            
          </li>          
        </ul>    
      </div>
  </div>
  
</template>

<script>
  import Nav from './Nav';
  import firebase from 'firebase';
  import axios from 'axios';
      
  export default {
    name: 'profile-view',
    components: {
      Nav      
    },
    data() {
      return {        
        firebaseUser: null,
        userEmail: null,
        currentUsername: '',
        someBook: null,
        someBookImageLink: '',
        term: '',
        myBooksArray: []
      }
    },
    created() {
      this.$store.dispatch('getMyBooks')
    },  
    mounted() {

      this.firebaseUser = firebase.auth().currentUser;
      this.userEmail = this.firebaseUser.email;
      this.currentUsername = this.$store.state.loggedInUser;
      
      // if (this.firebaseUser != null) {
      //   this.firebaseUser.providerData.forEach(function (profile) {
      //     console.log("Sign-in provider: " + profile.providerId);
      //     console.log("  Provider-specific UID: " + profile.uid);
      //     console.log("  Name: " + profile.displayName);
      //     console.log("  Email: " + profile.email);
      //     console.log("  Photo URL: " + profile.photoURL);
      //   });
      // }
      
    },
    methods: {
      saveBook(payload) {  // save one book to current User's owned books        
        this.$store.dispatch('saveBook', payload);
        this.$store.dispatch('clearSearch');        
      },
      getOneBook() {
        this.$store.dispatch('getBookById', 38355410)        
      },
      searchBooks() {
        if (this.term) {
          this.$store.dispatch('searchBooks', this.term) 
        } else {
          // validation
          alert('No search term provided');
        }
      },
      deleteBook(id) {
        this.$store.dispatch('deleteBook', id);      
      }
    },
    computed: {
      oneBook() {
        return this.$store.state.book || ''
      },
      books() {
        return this.$store.state.books || []
      },
      myBooks() {
        console.log('computed prop')
        
        let myBookList = [];
//        this.$store.state.myBooks.forEach((b) => { 
        this.$store.getters.getLoggedInUser.myBooks.forEach((b) => { 
          
          if (b.hasOwnProperty(this.$store.state.userId)) {
            console.log('state MyBooks detail ',b[this.$store.state.userId].bookTitle);
            myBookList.push(b[this.$store.state.userId]);
          }
        })        
        //var merged = [].concat.apply([], myBookList);
        return myBookList || []  
        // return this.$store.getters.getLoggedInUser.myBooks;
      }
      
    }
  }
  
</script>

<style scoped>
 .card { 
    width: 12em;
  }
  .flexbox-container {
  display: flex; flex-wrap: wrap; justify-content: space-around;
  } 
  .fixed-height {    
    min-height: 180px;
  }
  .gray-border {
    border: 1px solid silver;
  }
</style>