<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // document方法获取元素是拿到第一个， 项目大的时候就不知道啊， 这个获取的是哪一个wrapper了
      // document.querySelector('.wrapper')
      // 下面这种方法是vue中获取子组件的方法， 也可以用在标签上， 来拿标签
      // 1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2. 监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // 上啦加载更多
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      // 这里time给了个默认值
      scrollTo(x, y, time = 300) {
        // 这里是判断前面是不是是null， 不是null， 再判断后面的， 是null则直接为false，就不会执行后面的操作，js对布尔值的灵活性(c也可以)
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
