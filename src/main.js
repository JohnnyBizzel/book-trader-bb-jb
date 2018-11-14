// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Nav from "@/components/Nav";
import router from "./router";
import VueResource from "vue-resource";
import firebase from "firebase";
import store from './store.js';
import Vuetify from 'vuetify';
//import DotEnv from 'dotenv';
// import axios from 'axios';
// import VueAxios from 'vue-axios';
 
Vue.use(Vuetify)

Vue.use(VueResource);

// Vue.use(VueAxios, axios);
//DotEnv.load();

Vue.config.productionTip = false;

const firebaseApi = process.env.VUE_APP_FBAPI;
const bookReadsApi = process.env.VUE_APP_BOOK_READS_API;

//Vue.use({ bookReadsApiKey : bookReadsApi });
let app;
var config = {
  apiKey: firebaseApi,
  authDomain: "book-trader-96e8a.firebaseapp.com",
  databaseURL: "https://book-trader-96e8a.firebaseio.com",
  projectId: "book-trader-96e8a",
  storageBucket: "book-trader-96e8a.appspot.com",
  messagingSenderId: "86494859544"
};

firebase.initializeApp(config);

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      components: { App, Nav },
      template: "<App/>"
    });
  }
});
