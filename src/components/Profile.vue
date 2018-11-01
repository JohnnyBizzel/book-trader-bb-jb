<template>

<div>
    <Nav/>
    Profile
    <button @click="logout">Logout</button>
  <p>
    Welcome, {{ currentUsername }}
    <br/>
    Your email: {{ userEmail }}
  </p>
</div>
</template>

<script>
  import Nav from './Nav';
  import firebase from 'firebase';
  
  export default {
    name: 'profile-view',
    components: {
      Nav      
    },
    data() {
      return {        
        firebaseUser: null,
        userEmail: null,
        currentUsername: ''
      }
    },
    created() {

    },  
    mounted() {
      this.firebaseUser = firebase.auth().currentUser;
      this.userEmail = this.firebaseUser.email;
      this.currentUsername = this.$store.state.loggedInUser;

      if (this.firebaseUser != null) {
        this.firebaseUser.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
      
      var currentUser = this.firebaseUser;
      var usersRef = firebase.database().ref('users');

      usersRef.on("value", function(snapshot, currentUser) {
        console.log(currentUser);
         snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
           //console.log("Mounted", childData.uid, currentUser.uid)

           // if(childData.uid === currentUser.uid) {
           //   console.log(childData.username);
           //    // this.currentUsername = childData.username;
           // }
        })
      })
      
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