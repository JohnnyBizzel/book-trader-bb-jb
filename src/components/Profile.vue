<template>

<div>
    <Nav/>
    Profile
    <button @click="logout">Logout</button>
  <p>
    Welcome, {{ currentUsername }}
    <br/>
    Your email: {{ userEmail }}
    {{ count }}
  </p>
  <div class="row">
  <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://is1-ssl.mzstatic.com/image/thumb/Music22/v4/79/24/b7/7924b77e-1213-8397-32da-94d10f524a8d/mzm.smrcmzqm.jpg/200x0w.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
  <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://is4-ssl.mzstatic.com/image/thumb/Music/y2005/m09/d29/h10/mzi.glspqfwy.jpg/200x0w.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
  <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://i.pinimg.com/originals/85/43/9b/85439be9ef48b51023bd029ed182238e.jpg">
      </div>
      <div class="card-content">
        <p class="text-darken-2">Author: Kurt Vonnegut</p>
        <p class="text-darken-2">Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
  <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://s2982.pcdn.co/wp-content/uploads/2018/08/CrossHerHeart_Cover.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
  <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://lr-assets.storage.googleapis.com/main/covers/cwh/1537866012-the-mystery-of-three-quarters-audiobooks-200x200.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
  <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/15/The_dinner_party_book_cover.jpg/200px-The_dinner_party_book_cover.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
    <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/15/The_dinner_party_book_cover.jpg/200px-The_dinner_party_book_cover.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
    <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/15/The_dinner_party_book_cover.jpg/200px-The_dinner_party_book_cover.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
    <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/15/The_dinner_party_book_cover.jpg/200px-The_dinner_party_book_cover.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
    <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/15/The_dinner_party_book_cover.jpg/200px-The_dinner_party_book_cover.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
    <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/15/The_dinner_party_book_cover.jpg/200px-The_dinner_party_book_cover.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
    </div>
  </div>
    <div class="col s12 m4 l2">
    <div class="card">
      <div class="card-image">
        <img class="responsive-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/15/The_dinner_party_book_cover.jpg/200px-The_dinner_party_book_cover.jpg">
      </div>
      <div class="card-content">
        <p>Author: Kurt Vonnegut</p>
        <p>Owner: Brian Borin</p>
      </div>
      <div class="card-action">
        <a class="blue-text text-lighten-2" href="#">Request</a>
      </div>
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
        count: 0
      }
    },
    created() {
      
      const apiKey = process.env.VUE_APP_BOOK_READS_API;
      const api = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show/135479?format=xml&key=${apiKey}`
      axios.get(api).then((response) => {
        console.log(response.data)
      })


    },  
    mounted() {
      
      
      this.firebaseUser = firebase.auth().currentUser;
      this.userEmail = this.firebaseUser.email;
      this.currentUsername = this.$store.state.loggedInUser;
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
      logout() {
        this.$store.dispatch('logOut')
        // firebase.auth().signOut()
        .then(() => {
        this.$router.replace('login')
        })
      }
    }
  }
  
</script>

<style scoped>
</style>