<template>
  <div id="app">
    <h2>{{message}}</h2>
    <h2>{{counter}}</h2>
    <button @click="counter++">+</button>
    <button @click="counter--">-</button>
  </div>
</template>

<script>

import HelloWorld from "./components/HelloWorld";

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      counter: 0,
      message: '我是APP组件'
    }
  }

}
</script>

<style>
</style>
