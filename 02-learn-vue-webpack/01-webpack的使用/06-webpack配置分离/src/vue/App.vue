<template>
  <div>
    <h2 class="title">{{message}}</h2>
    <button @click="btnClick">按钮</button>
    <name>{{name}}</name>
    <Cpn></Cpn>
  </div>
</template>

<script>
  import Cpn from "./Cpn";

  export default {
    name: "App",
    data() {
      return {
        message: 'hello webpack',
        name: 'coderyue'
      }
    },
    components: {
      Cpn
    },
    methods: {
      btnClick() {

      }
    }
  }
</script>

<style scoped>
  .title {
    color: green;
  }
</style>