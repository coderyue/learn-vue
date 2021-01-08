<template>
  <div>
    <h2>我是Profile组件</h2>
    <!-- 从url中获取参数-->
    <!--这个是路径后面直接跟上userId这种url获取参数方式 <h2>{{$route.params.userId}}</h2>-->
    <h2>{{$route.query}}</h2>
    <h2>{{$route.query.name}}</h2>
    <h2>{{$route.query.age}}</h2>
    <h2>{{$route.query.height}}</h2>
  </div>
</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped>

</style>
