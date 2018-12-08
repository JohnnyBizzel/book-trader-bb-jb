<template>

<div>
    <Nav/>
      <div class="container">
        <div class="row">
        <p>{{ currentUsername }}, please add books that you wish to trade to the system. Other users will be able to request them for exchange.</p>
        <div class="input-field col s12">
          <input v-model="term" type="text" id="search_input" />
          <label for="search_input">Search for books by title, author or ISBN:</label>
          <a @click="searchBooks" class="waves-effect waves-light btn brown lighten-2">Search</a>
          </div>
        </div>  
      </div>
      <div class="container">
        <div class="flexbox-container">
          <div class="card" v-for="b in books">        
            <div class="card-image">
              <div class="image-container">
                <img class="fixed-height" v-bind:src="b.best_book.image_url">          
                <a class="add-book btn-floating halfway-fab waves-effect waves-light black lighten-2"><i @click="saveBook(b)" class="material-icons">add</i></a>
              </div>
              <p>{{ b.best_book.title }}</p>
              <p>{{ b.best_book.author.name }}</p>
              
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
                <li v-for="(mykey, i) in myBooks" class="fixed-height collection-item">
                  <img class="left" v-bind:src="mykey.photoURL">
                  <div class="collection-data">
<!--                     <span class="title"></span>  -->
                      <p><h6>Book Title: {{ mykey.bookTitle }}</h6> <br>
                        Book Id: {{ mykey.bookId }} <br>
                        Author name: {{ mykey.authorName }}
                      </p> 
                      <a href="#!"><i class="black-text lighten-2 material-icons">grade</i></a>            
                      <a href="#!"><i class="black-text lighten-2 material-icons" @click="deleteBook(mykey.bookId)">delete_forever</i></a>
                  </div>        
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
      
    },  
    mounted() {
      // we need these calls to load the data (eg componendDidMount):
      this.firebaseUser = firebase.auth().currentUser;
      this.userEmail = this.firebaseUser.email;
      this.currentUsername = this.$store.state.loggedInUser;
      this.$store.dispatch('getMyBooks')

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
        return this.$store.state.myBooks || []
        
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
  .collection-data {
    margin-left: 7.4rem;
  }
  img {
    position: absolute;
  }
  a {
    margin-top: 0.5rem;
  } 
  p {
    margin-left: 8px;
  }
  .image-container {
    position: relative;
  }
  .add-book {
    position: absolute;
    right: 15px;
    bottom: -7px;
  }
  .collection {
    border: 0;
  }
</style>