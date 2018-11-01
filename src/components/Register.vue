

<template>
  <div>
    <div class="navbar-fixed">
       <Nav/>
    </div>

    <div class="container">
      <div class="row">
        <form novalidate>
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li class="red-text text-darken-1" v-for="error in errors">**{{ error }}</li>
            </ul>
          </p>

          <div class="col s8 offset-s2">
            <h3 class="text-center">Register</h3>
            <p>* Please fill all required fields</p>
          </div>
          <div class="input-field col s8 offset-s2">
            <i class="material-icons prefix">email</i>
            <input v-model="credentials.email" type="text" class="autocomplete" placeholder="Email">
          </div>
          <div class="input-field col s8 offset-s2">
            <i class="material-icons prefix">vpn_key</i>
            <input v-model="credentials.password" type="password" class="autocomplete" placeholder="Password">
          </div>
          <div class="input-field col s8 offset-s2">
            <i class="material-icons prefix">account_circle</i>
            <input v-model="credentials.username" type="text" class="autocomplete" placeholder="Your name">
          </div>        
          <div class="input-field col s8 offset-s2">
            <i class="material-icons prefix">location_city</i>
            <input v-model="credentials.city" type="text" class="autocomplete" placeholder="Location">
          </div>
          <div class="input-field col s8 offset-s2">
            <label>
              <input v-model="credentials.tradeByPost" type="checkbox" />
              <span>Willing to Trade Using Post?</span>
            </label>
          </div>
          <br>
          <div class="input-field col s8 offset-s2">
            <label>
              <input v-model="credentials.tradeInPerson" type="checkbox" />
              <span>Willing to Trade Face to Face?</span>
            </label>
          </div>
          <div class="row"></div>
          <br>
          <div class="input-field col s8 offset-s2">
            <input @click="submit" type="submit" value="Submit" class="brown lighten-2 waves-effect waves-light btn">  
          </div>
        </form>
      </div>
    </div>
<p>
  Count: {{ this.$store.state.count }}
  </p>
  </div>
</template>

<script>
  import Nav from './Nav';
  import firebase from "firebase";
  export default {
    components: {
      Nav
    },
    data() {
      return {
        errors: [],
        credentials: {
          email: null,
          username: null,
          password: null,
          city: '',
          tradeByPost: false,
          tradeInPerson: false
        }
      }
    },
    methods: {
      submit(e) {
        e.preventDefault()
        console.log('store counter:: ',this.$store.state.count)
        const username = this.credentials.username
        const email = this.credentials.email
        const password = this.credentials.password
        const city = this.credentials.city
        const tradeByPost = this.credentials.tradeByPost
        const tradeInPerson = this.credentials.tradeInPerson
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {

          var userRef = firebase.database().ref("users");
          console.log(userRef);
          userRef.push({ uid : user.user.uid,
             username,
             email,
             city,
             tradeByPost,
             tradeInPerson });
          // move to profile if successful?
          this.$router.replace('profile');
        }, (err) => {
          console.log(err)
          this.errors.push(err.message);
        })    
     
        
        let credentials = {
          email: this.credentials.email,
          password: this.credentials.password,
          username: this.credentials.username,
          city: this.credentials.city,
          tradeByPost: this.credentials.tradeByPost,
          tradeInPerson: this.credentials.tradeInPerson
        }
        //console.log(credentials)
      },
      checkForm: function (e) {
        console.log('checking form');
        if(this.credentials.email && this.credentials.password && this.credentials.username) return true;
        if (!this.credentials.email) this.errors.push("Email required.");
        if (!this.credentials.username) this.errors.push("User name required.");
        if (!this.credentials.password) {
          this.errors.push("Password required.");
        } else if (this.password.length < 6) {
          this.errors.push('Passwort mussen bin 6+ chars')
        }
        console.log(this.errors);
        e.preventDefault();
      }
    }
  }

</script>

<style scoped>


</style>
