<template>
<div>
    <Nav/>
    <div class="container">
      <div class="row">

        <form novalidate="true" @submit.prevent="signIn" >
          <div class="col s8 offset-s2">
            <h3 class="text-center">Login</h3>
            <p>* Please fill all required fields</p>
          </div>
          <div class="col s8 offset-s2" v-if="$store.state.errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li class="red-text text-darken-1" v-for="error in $store.state.errors">**{{ error }}</li>
            </ul>
          </div>
          <div class="input-field col s8 offset-s2">
            <i class="material-icons prefix">email</i>
            <input v-model="email" type="text" class="autocomplete" placeholder="Email">
          </div>
          <div class="input-field col s8 offset-s2">
            <i class="material-icons prefix">vpn_key</i>
            <input v-model="password" type="password" class="autocomplete" placeholder="Password">
          </div>
          <div class="row"></div>
          <div class="input-field col s8 offset-s2">
            <input type="submit" value="Login" class="waves-effect waves-light btn brown lighten-2">  
          </div>
        </form>        
      </div>
    </div>
  </div>
  </template>

  <script>
    import Nav from './Nav';
    // import firebase from 'firebase';
    import { mapActions } from  'vuex';
    
    export default {
      components: {
        Nav
      },
      name: 'login',
      data() {        
        return {
          errors: [],
          email: '',
          password: ''
        }
      },
      methods: {
        ...mapActions(['signIn']),
        signIn() {
          this.$store.dispatch('signIn', { email: this.email, password: this.password });
          //  await (this.$router.replace('/profile');
        }
           
      } 
    }
  </script>

<style scoped>
  input {
    margin-top: -1rem;
  }
</style>