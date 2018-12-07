<template>

<div>
    <Nav/>
      <header class="container">
        <h4>
       Books available for trade:   
        </h4>
      </header>
      
      <div class="flexbox-container">
          <div class="card brown lighten-5" v-for="b in allBooks">        
            <div class="card-image">
              <img class="fixed-height" v-bind:src="b.photoURL">
              <span v-if="!b.alreadyRequested">
              <a class="btn-floating halfway-fab waves-effect waves-light green">
                <i @click="reqBook(b)" class="material-icons">send</i>
              </a>
              </span>
              <span v-if="b.alreadyRequested">
                <a class="btn-floating disabled halfway-fab waves-effect waves-light green">
                  <i class="material-icons">check</i>
                </a>
              </span>
              
            </div>
            <div class="card-content">
              <p class="activator grey-text text-darken-4">
              <span class="size120pct">{{ b.bookTitle }}</span>
                <br/>
                <a href="#" v-if="!b.alreadyRequested" class="blue-text text-lighten-2 cursor-pointer right padding-bottom" @click="reqBook(b)">Request book</a>   
              </p>
            </div>
            <div class="card-action brown lighten-2 activator">
              <a class="white-text" href="#">More Details</a>
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
  .card-action {
    position: absolute !important;
    width: 100%;
    bottom: 0;
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
  .grey-text.text-darken-4 {
    text-align: center;
    margin-bottom: 3em;
  }
  h5 {
    font-weight: 300;
  }
  .size120pct {
    font-size: 120%;
  }
  .padding-bottom {
    padding-bottom: 10px;
  }
</style>