<template>
  <v-app>
    <Nav></Nav>
    <v-main class="bg-gray"><router-view /> </v-main>
  </v-app>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import AppBar from "./components/AppBar";
import Navigation from "./components/Navigation";
import Nav from "./components/Nav";
export default {
  components: {
    AppBar,
    Navigation,
    Nav,
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style scoped>
.bg-gray{
  background-color: rgb(238, 236, 236);
}
</style>
