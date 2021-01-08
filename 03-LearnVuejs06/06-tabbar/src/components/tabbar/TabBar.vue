<template>
  <div id="tab-bar"> <!--一个图片， 一个下面的文字-->
    <slot></slot>
  </div>
</template>

<script>

  import TabBarItem from "./TabBarItem";
  export default {
    name: "TabBar",
    components: {
      TabBarItem
    }
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    /*吧tab-bar弄到下面来*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /*过渡的阴影*/
    box-shadow: 0 -2px 1px rgba(100, 100, 100, .2);
  }
</style>
