<template>

<div>
    <Nav/>
      <header class="container">
        <h4>
       Books available for trade:   
        </h4>
      </header>
      
      <div class="flexbox-container">
          <div class="card" v-for="b in allBooks">        
            <div class="card-image">
              <img class="fixed-height" v-bind:src="b.photoURL">
<!--               <span class="card-title black-text">{ b.bookTitle }</span>               -->
              <span v-if="!b.alreadyRequested">
              <a class="btn-floating halfway-fab waves-effect waves-light green">
                <i @click="reqBook(b)" class="material-icons">send</i>
              </a>
              </span>
              <span v-if="b.alreadyRequested">
                <a class="btn-floating disabled halfway-fab waves-effect waves-light green">
                  <i class="material-icons">send</i>
                </a>
              </span>
              
            </div>
            <div class="card-content">
              <p><span v-if="!b.alreadyRequested" class="blue-text text-lighten-2 cursor-pointer left" @click="reqBook(b)">Request book</span></p>
              <h6 class="activator grey-text text-darken-4">{{ b.bookTitle }}<i class="material-icons right">more_vert</i></h6>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">{{ b.bookTitle }}<i class="material-icons right">close</i></span>
              <p>by {{ b.authorName }}</p>
              <p>Owner: {{ b.ownerId }}</p>
              <a v-bind:href="'https://www.goodreads.com/book/show/' + b.bookId" target="_blank">More details on Good Reads</a>
            </div>            
        </div> 
      </div>  
      
      <div class="container">
        <h5>My Trades:</h5>

      </div>
  </div>
  
</template>

<script>
  import Nav from './Nav';
  //import firebase from 'firebase';
  //import axios from 'axios';
      
  export default {
    name: 'trades-view',
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
        booksArray: []
      }
    },
    created() {  
      this.$store.dispatch('showTradeReqsFromUser')
        .then(this.$store.dispatch('getOtherUserBooks'))
      // TODO get list of trades
      
    },  
    mounted() {

      this.currentUsername = this.$store.state.loggedInUser;
      

    },
    methods: {
      reqBook(book) {
        console.log('sbk', book);
        this.$store.dispatch('makeTradeRequest', book)
      }
    },
    computed: {
      allBooks() {
        return this.$store.state.allBooksForTrade
        
      }
    }
  }  
  
</script>

<style scoped>
  span.cursor-pointer:hover {
    cursor: pointer;
  }
 .card { 
    width: 13em;
  }
  span.card-title {
    color: black;
  }
  .flexbox-container {
  display: flex; flex-wrap: wrap; justify-content: space-around;
  } 
  .fixed-height {    
    min-height: 180px;
  }
  .gray-border {
    border: 1px solid silver;
  } i {
    cursor: pointer;
  }
</style>