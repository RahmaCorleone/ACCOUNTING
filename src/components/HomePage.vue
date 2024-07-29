<template>
    <div>
        <h1>Home page</h1>
      <MenuBar />
      <router-view></router-view>
    </div>
    
  </template>
  
  <script>
  import MenuBar from '../components/MenuBar.vue'
  
  export default {
    components: {
      MenuBar
    }
  }
  </script>
  