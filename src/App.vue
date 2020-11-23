<template>
  <Header :title="title" :admin="admin" :navs="navs"/>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  data (){
    return {
      title: "POS",
      admin: true,
      navs: [{
        id: 0,
        link: 'https://v3.vuejs.org/guide/introduction.html#composing-with-components',
        title: 'Vue'
      },
      {
        id: 1,
        link: 'twitter.com',
        title: 'Twitter'
      }]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
