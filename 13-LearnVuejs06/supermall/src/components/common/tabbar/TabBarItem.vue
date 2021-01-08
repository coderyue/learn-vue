<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--插槽最终会被替换掉，所有最有一个插槽再slot标签设置class，最后没有class没了， 因此，都在外面套一层div比较保险-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
<!--    <div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: false
      }
    },
    computed: {
      isActive() {
        // 这样写不好， 当有其他参数时，这里都是false
        // return this.path === this.$route.path
        // return !this.$route.path.indexOf(this.path)
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  /*把颜色弄成自定义的*/
  /*.active {*/
  /*  color: red;*/
  /*}*/
</style>
