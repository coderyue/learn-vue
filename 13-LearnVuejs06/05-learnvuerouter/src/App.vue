<template>
  <div id="app">
    <!--默认router-link标签被渲染成a标签， tag属性可以让它渲染成其他标签-->
    <!--默认使用的history.pushState方法， 浏览器可以返回，    添加replace就使用的是replace.replaceState方法-->

    <!--通过页面点击可以知道， 点击的那个router-link会有一个router-link-active的class属性
        可以不让这个这么长， 这里设置active-class即可

        如果这个router-link很多， 都需要改这个属性，那么可以在router文件夹下的index.js中统一修改， 添加一个linkActiveClass
    -->
<!--    <router-link to="/home" tag="button" replace active-class="active">首页</router-link>-->
<!--    <router-link to="/about" tag="button" replace>关于</router-link>-->

<!--    <router-link to="/home" tag="button" replace>首页</router-link>-->
<!--    <router-link to="/about" tag="button" replace>关于</router-link>-->

    <!--使用方法实现跳转，不用router-link-->
<!--    <button @click="homeClick">首页</button>-->
<!--    <button @click="aboutClick">关于</button>-->

    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
<!--    <router-link :to="'/user/' + userId">用户</router-link>-->
<!--&lt;!&ndash;    <router-link to="/profile">档案</router-link>&ndash;&gt;-->
<!--    <router-link :to="{path: '/profile', query: {name: 'coderyue', age: 18, height: 1.87}}">档案</router-link>-->

    <!--监听事件传递参数-->
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>

    <!--让组件不离开一次就销毁一次， 那样会不断的创建组件，
      把router-view放在这个标签里， 会保留组件，然后就可以记录组件在离开前的状态-->
    <!--keepa-alive 有两个属性，include和exclude， 填组件名称，可以控制组件要不要保留状态，多个用逗号分割-->
    <keep-alive exclude="Profile,User">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userId: 'lisi'
    }
  },
  methods: {
    homeClick() {
      // 默认的pushState的方法
      // this.$router.push('/home')
      this.$router.replace('/home')
    },
    aboutClick() {
      // 默认的pushState的方法
      // this.$router.push('/about')
      // 默认的replace方法
      this.$router.replace('/about')
    },
    userClick() {
      this.$router.push('/user/' + this.userId)
    },
    profileClick() {
      this.$router.push({
        path: '/profile',
        query: {
          name: 'coderyue',
          age: 18,
          height: 1.87
        }
      })
    }
  }
}
</script>

<style>
  /*.router-link-active {*/
  /*  color: red;*/
  /*}*/

  .active {
    color: red;
  }

</style>
