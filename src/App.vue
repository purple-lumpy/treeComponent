<template>
  <div id="app">
    <TreeSelector />
<!--    <div style="height: 200px;">-->
<!--      <Test />-->
<!--    </div>-->

<!--    <TreeFolder />-->
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
  import TreeSelector from './components/TreeSelector'
// import HelloWorld from './components/HelloWorld.vue'
// import Test from './components/test'
// import TreeFolder from './components/TreeFolder'

export default {
  name: 'app',
  components: {
    TreeSelector
    // HelloWorld,
    // Test,
    // TreeFolder
  }
}
</script>

<style>
</style>
