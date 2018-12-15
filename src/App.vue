<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/index/header.vue'
import Footer from './components/index/footer.vue'

export default {
  name: 'App',
  components: {
    Header: Header,
    Footer: Footer
  },
  created() {

  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  user-select:none;
}

</style>
