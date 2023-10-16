<template>
  <div>
    <AppTopBar/>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  
</template>



<script>
import HelloWorld from './components/HelloWorld.vue'
import AppTopBar from './components/TopBar.vue';


export default {
  name: 'App',
  components: {
    HelloWorld,
    AppTopBar
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
  margin: 2px 2px 2px 2px;
}
</style>
