import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/Main";
import Register from "@/components/Register";
import Profile from "@/components/Profile";
import Login from "@/components/Login";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: "",
      name: "Main",
      component: Main
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("profile");
  else next();
});

export default router;
