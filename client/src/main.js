import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';

import MusicPage from './components/MusicPage';
import MoviesPage from './components/MoviesPage';
import BooksPage from './components/BooksPage';
import PodcastsPage from './components/PodcastsPage';

import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {path: '/', component: App},
  {path: '/music', component: MusicPage},
  {path: '/movies', component: MoviesPage},
  {path: '/books', component: BooksPage},
  {path: '/podcasts', component: PodcastsPage}
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
	router,
  el: '#app',
  render: h=>h(App)
})