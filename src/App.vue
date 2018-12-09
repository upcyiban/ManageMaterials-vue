<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/index/header.vue'

export default {
  name: 'App',
  components: {
    Header: Header
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
