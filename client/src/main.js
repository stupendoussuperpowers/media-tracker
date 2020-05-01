import Vue from 'vue'
import App from './App.vue'

import LoginPage from './LoginPage.vue'

import MainPage from './MainPage.vue';

import VueRouter from 'vue-router';

import MusicPage from './components/MusicPage';
import MoviesPage from './components/MoviesPage';
import BooksPage from './components/BooksPage';
import PodcastsPage from './components/PodcastsPage';

import Login from './components/Login.vue'
import Register from './components/Register.vue'

import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

async function loggedIn(){
  return await fetch(`/api/auth/user`)
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
    if(data.status == 200){
      return true
    }
    return false
  })
}

const routes = [
  {
    path: '/auth', 
    component: LoginPage,
    children: [
      {
        path: 'login', 
        component: Login
      }, 
      {
        path: 'register', 
        component: Register
      }
    ]
  },
  {
    path: '/app',
    name: 'App',
    component: App,
    children: [
        {
          path: 'music', 
          component: MusicPage,
          beforeEnter: (to, from, next) => {
            if(loggedIn() == false) next({path:'/'})
          }
        },
        {
          path: 'movies', 
          name: "movies",
          component: MoviesPage, 
          beforeEnter: (to, from, next) => {
            if(loggedIn() == false) next({path:'/'})
          }
        },
        {
          path: 'books', 
          component: BooksPage, 
          beforeEnter: (to, from, next) => {
            if(loggedIn() == false) next({path:'/'})
          }
        },
        {
          path: 'podcasts', 
          component: PodcastsPage, 
          beforeEnter: (to, from, next) => {
            if(loggedIn() == false) next({path:'/'})
          }
        }
    ]
  }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})


new Vue({
	router,
  el: '#app',
  render: h=>h(MainPage)
})