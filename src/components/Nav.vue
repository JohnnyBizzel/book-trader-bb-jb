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
            <li class="welcome" v-if="auth">Welcome, {{ username }} </li>
            <li v-if="auth"><span @click="logout">Logout</span></li>
            <router-link v-if="!auth" to="/login" active-class="active" tag="li">Login</router-link>
            <router-link v-if="!auth" to="/register" active-class="active" tag="li">Register</router-link>
            <router-link v-if="auth"  to="/profile" active-class="active" tag="li">Profile</router-link>
            <router-link v-if="auth"  to="/trades" active-class="active" tag="li">Trades</router-link>
          </ul>
        </div>
      </div>
    </nav>  
  </div>
</template>
<script>
import firebase from 'firebase';
import { mapActions } from  'vuex';
  
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
    },
    logout() {
      this.$store.dispatch('logOut')
      // firebase.auth().signOut()
      .then(() => {
      this.$router.replace('login')
      })
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.showMobile,
        'slider-hide': !this.showMobile,
        'slider-show': this.showMobile
      }
    },
    auth () {
      const user = this.$store.getters.getLoggedInUser
      return user.jsonWebToken || false
    },
    username () {
      const user = this.$store.getters.getLoggedInUser
      return !user ? '' : user.loggedInUser
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
  li.welcome:hover {
    cursor: default;
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
