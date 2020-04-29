<template>
  <div id="app">
    <div id = "side-nav">
      <SideBar />
    </div>
    <div id = "main-page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
// import MoviesPage from './components/MoviesPage.vue';
// import BooksPage from './components/BooksPage.vue';
// import PodcastsPage from './components/PodcastsPage.vue';

export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style>

html{
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}

#side-nav{
  flex-grow: 0.25;
}

#main-page{
  flex-grow: 0.75;
}

</style>
