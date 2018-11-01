<template>
  <div class="navbar-fixed">
    <nav class="brown lighten-2">
      <div class="container">
        <div class="nav-wrapper">
          <router-link to="/" class="brand-logo">B00k Trader</router-link>
          <div>
              <ul id="slider" v-bind:class="classObject">
                  <router-link to="/login" tag="li">Login</router-link>
                  <router-link to="/register" tag="li">Register</router-link>
                  <router-link to="/profile" tag="li">Profile</router-link>
              </ul>
              <a href="#" data-target="slide-out" class="sidenav-trigger" @click="showhide"><i class="material-icons">menu</i></a>
          </div>          
          <ul class="right hide-on-med-and-down">
            <li>User: {{ title }} </li>
            <router-link to="/login" active-class="active" tag="li">Login</router-link>
            <router-link to="/register" active-class="active" tag="li">Register</router-link>
            <router-link to="/profile" active-class="active" tag="li">Profile</router-link>            
          </ul>
        </div>
      </div>
    </nav>  
  </div>
</template>
<script>
import firebase from 'firebase';
  
export default {
  name: "navigation-view",    
  data() {
    return {
      title: "x",
      items: {},
      statusMessage: "",
      showMobile: false,
      active: true,
      sliderHide: true,
      sliderShow: false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        
        this.title = 'Welcome';
        
        var usersRef = firebase.database().ref('users');


        var test = usersRef.orderByChild("email").equalTo(user.email);
            // console.log('find',test);


        usersRef.on("value", function(snapshot) {


           snapshot.forEach(function(childSnapshot) {
            // console.log(childSnapshot);
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
             //console.log(childData.uid, user.uid)

             if(childData.uid === user.uid) {
               //console.log(childData.username);
                // this.currentUsername = childData.username;
             }
          })
        })
      } else {
      // No user is signed in.
        console.log('not auth');
      }
    });
  },  
  mounted() {
      // var elems = document.querySelectorAll('.sidenav');
      // console.log(elems);
      // var instances = M.Sidenav.init(elems);
  
  },
  methods : {
    showhide: function(e) {
      console.log(e.target)
      this.showMobile = !this.showMobile;
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.showMobile,
        'slider-hide': !this.showMobile,
        'slider-show': this.showMobile
      }
    }
  }
}
</script>
<style scoped>
  li { margin: 2px 15px;
    padding: 0 15px; }
  li:hover {
    cursor: pointer;
  }
  .slider-hide {
    position: absolute;
    left: -1500px;
    top: 0;
  }
  .slider-show {
    position: absolute;  
    left: 5px;
    top: 0;
  }
  .sidenav li {
    color: black;
    cursor: pointer;
  }
  .hide {
    display: none;
  }
</style>
