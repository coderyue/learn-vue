<template>
  <tab-bar>
    <!--当传递的path是一个变量时， 则需要使用v-bind，这里就是传递字符串， 所以不用绑定-->
    <tab-bar-item path="/home" activeColor="blue">
<!--     对路径起别名之后， src前面加上~符号就会根据别名去找路径 -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="blue">
      <img slot="item-icon" src="../assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="../assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="blue">
      <img slot="item-icon" src="../assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="../assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="blue">
      <img slot="item-icon" src="../assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="../assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  // import TabBar from "./tabbar/TabBar";
  // import TabBarItem from "./tabbar/TabBarItem";
  // 在webpack中起别名之后， 路径就不需要使用../这种方式了， import这样引入组件，直接别名就行，src哪里前面需要加上~
  import TabBar from "components/tabbar/TabBar";
  import TabBarItem from "components/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
