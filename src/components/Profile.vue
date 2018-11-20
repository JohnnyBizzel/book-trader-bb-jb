<template>

<div>
    <Nav/>
    Profile
<!--     <button @click="logout">Logout</button> -->
  <div class="container">
    <button @click="getOneBook">Get 1 book (api test)</button>
    {{ currentUsername }}, please add books that you wish to trade to the system. Other users will be able to request them for exchange.
    <br/>
    <div class="input-field col s12">
      <input v-model="term" type="text" id="search_input" />
      <label for="search_input">Search for books by title, author or ISBN:</label>
      <a @click="searchBooks" class="waves-effect waves-light btn brown lighten-2">Search</a>
    </div>  
  </div>
   <div class="flexbox-container">
      <div class="card" v-for="b in books">        
        <div class="card-image">
          <img class="fixed-height" v-bind:src="b.best_book.image_url">
          <p>{{ b.best_book.title }}</p>
          <p>{{ b.best_book.author.name }}</p>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
        </div>
        <div class="card-action">
          <a class="blue-text text-lighten-2" href="/add/">Add book</a>
        </div>
      </div>
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
        count: 0,
        someBook: null,
        someBookImageLink: '',
        term: ''
      }
    },
    created() {
      
    },  
    mounted() {
        
      
      
      
      
      
      this.firebaseUser = firebase.auth().currentUser;
      this.userEmail = this.firebaseUser.email;
      this.currentUsername = this.$store.state.loggedInUser;
      //this.someBook = this.$store.state.book;
      //console.log('Image URL', this.someBook.image_url);
      //if (this.someBook) this.someBookImageLink = this.someBook.image_url
      this.count = this.count +1;
      
      if (this.firebaseUser != null) {
        this.firebaseUser.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
    },
    methods: {
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
      }
    },
    computed: {
      oneBook() {
        return this.$store.state.book || ''
      },
      books() {
        return this.$store.state.books || []
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
    
    height: 13em;
  }
</style>