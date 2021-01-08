<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="titles"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"
                 class="tab-control"/>
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
<!--      <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"/>-->
      <tab-control :titles="titles"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods" @itemImgLoad="itemImgLoad"/>

      <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
        <li>列表21</li>
        <li>列表22</li>
        <li>列表23</li>
        <li>列表24</li>
        <li>列表25</li>
        <li>列表26</li>
        <li>列表27</li>
        <li>列表28</li>
        <li>列表29</li>
        <li>列表30</li>
        <li>列表31</li>
        <li>列表32</li>
        <li>列表33</li>
        <li>列表34</li>
        <li>列表35</li>
        <li>列表36</li>
        <li>列表37</li>
        <li>列表38</li>
        <li>列表39</li>
        <li>列表40</li>
        <li>列表41</li>
        <li>列表42</li>
        <li>列表43</li>
        <li>列表44</li>
        <li>列表45</li>
        <li>列表46</li>
        <li>列表47</li>
        <li>列表48</li>
        <li>列表49</li>
        <li>列表50</li>
        <li>列表51</li>
        <li>列表52</li>
        <li>列表53</li>
        <li>列表54</li>
        <li>列表55</li>
        <li>列表56</li>
        <li>列表57</li>
        <li>列表58</li>
        <li>列表59</li>
        <li>列表60</li>
        <li>列表61</li>
        <li>列表62</li>
        <li>列表63</li>
        <li>列表64</li>
        <li>列表65</li>
        <li>列表66</li>
        <li>列表67</li>
        <li>列表68</li>
        <li>列表69</li>
        <li>列表70</li>
        <li>列表71</li>
        <li>列表72</li>
        <li>列表73</li>
        <li>列表74</li>
        <li>列表75</li>
        <li>列表76</li>
        <li>列表77</li>
        <li>列表78</li>
        <li>列表79</li>
        <li>列表80</li>
        <li>列表81</li>
        <li>列表82</li>
        <li>列表83</li>
        <li>列表84</li>
        <li>列表85</li>
        <li>列表86</li>
        <li>列表87</li>
        <li>列表88</li>
        <li>列表89</li>
        <li>列表90</li>
        <li>列表91</li>
        <li>列表92</li>
        <li>列表93</li>
        <li>列表94</li>
        <li>列表95</li>
        <li>列表96</li>
        <li>列表97</li>
        <li>列表98</li>
        <li>列表99</li>
        <li>列表100</li>
      </ul>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureView from "@/views/home/childComps/FeatureView";

  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import GoodsListItem from "@/components/content/goods/GoodsListItem";
  import Scroll from "@/components/common/scroll/Scroll";

  import {getHomeMultidata, getHomeGoods, getData} from "@/network/home";
  import BackTop from "@/components/content/backTop/BackTop";
  import {debounce} from "@/common/utils";

  export default {
    name: "Cart",
    components: {
      BackTop,
      TabControl,
      FeatureView,
      NavBar,
      HomeSwiper,
      RecommendView,
      GoodsList,
      GoodsListItem,
      Scroll
    },
    data() {
      return {
        banners: [],
        recommends: [],
        titles: ['流行', '新款', '精选'],
        goods: {
          'pop': {page: 0, list: []},
          'news': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        Qcc: {},
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMultidata();

      // 测试请求企查查数据
      const keyword = '北京东方国信科技股份有限公司'
      this.getQCCData(keyword)

      // 2. 获取商品数据
      // this.getHomeGoods('pop');
      // this.getHomeGoods('news');
      // this.getHomeGoods('sell');
    },
    mounted() {
      //1. 图片加载完成的时间监听
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      // 监听item中图片加载完成（监听最好在mouted中的做, 在created中做this.$bus可能没有值）
      // ，滚动条问题 better-scroll中有个属性计算出能滚动的长度， 由于图片没有加载完，（可以去看scroll中的那个高度属性）
      // 导致刚开始的时候可滚动长度较短，  调用scroll中的refresh方法可以重新计算可滚动长度
      this.$bus.$on('itemImgLoad', () => {
        // 试用防抖函数
        // this.$refs.scroll.refresh()
        refresh()
      })

      // 2. 获取tabControl的offsetTop
      // 所有组件都有一个属性，$el： 用于获取组件中的元素
      console.log(this.$refs.tabControl2.$el.offsetTop);

    },
    methods: {
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      // 每次图片加载完就执行， 那执行的太频繁了， 防抖函数就是减少频繁执行（防抖函数抽取到了utils）

      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'news'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        /*最后的三个参数分别是， x, y, 毫秒值， 多久滚动到最上面*/
        // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
        // 封装成一个方法
        this.$refs.scroll.scrollTo(0, 0)
        // this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        // console.log(position);
        // 1.判断backTop是否显示
        this.isShowBackTop = position.y < -1000

        // 2. 决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        // 下面这写的是什么玩意
        // if (position.y < -1000) {
        //   this.isShowBackTop = true
        // } else if (position.y > -1000) {
        //   this.isShowBackTop = false
        // }
      },
      loadMore() {
        // console.log('load more');
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.result = res.data.recommend.list
        }).catch(err => {
          // 链接失效，这里随便自己弄点数据
          this.banners = [{
            link: 'https://pages.tmall.com/wow/a/act/tmall/dailygroup/218/wupr?spm=a21bo.2017.201862-1.d201405060011.5af911d9jhkEr4&wh_pid=daily-200402',
            img: 'http://img.alicdn.com/imgextra/i3/22/O1CN01pUGeeO1C27LzpImez_!!22-0-luban.jpg',
            title: '十点抢券'
          },{
            link: 'https://click.mz.simba.taobao.com/ecpm?spm=a21bo.2017.201862-2.1&e=45lT3D%2BbVRkPO53EdXrfSxsQmLP5zomMDGaCFJP%2FsUWQuMFfKfYV3BBCbZiz2j0w187kRmLWcxRb21XY8p3njAYpA4Y98xrwtbR9sxq9q4hbP149m5qBPDmKjytsVhuCo0UsPOKceg1x%2B%2Fnv0uLqm9fuL2LdHntGR2THtJZPLUk3f%2Fi6RQWDQTgi%2BqhDwi0YCOKyC0TQBhmbLODyrGU4tUdvXPt5Hjc4T3pBiotZqjyAxz5ptuOVPGPGL0x%2FJOXmWO2uf7UBDV5%2FDjuilZbSDSC36mR4La4RzoTRKFS5n%2Fi%2BrxzyiRFM9luQyjK%2FM%2FIEcg5WUszgSGe7eNAGpbHaB2bB9k9UiyMtddC1zoF0NP3dvJa7A4QeCh7I2%2F7%2FB%2Fygaq81ji8pB%2FDvkTNCufhlK3oabZtB0p%2BR0ObBALblCv9oHwPD7H3RGjPH3U%2BJ%2FBhAKBWKoqtDMS5OgEqqOLLPb7RQPGLQUXWJmi39%2FQUA2dJOPJOM1l%2FKqJMoG3zCx%2B%2B2NkOzY7Sbd4r2AH93yYpKvis%2BDB1SThuij3zehl9xNrw4P%2BOzvDOZSA%3D%3D&u=https%3A%2F%2Fre.taobao.com%2Faction_ecpm_home&k=569',
            img: 'https://aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg',
            title: '好物特卖'
          },{
            link: 'https://click.mz.simba.taobao.com/ecpm?spm=a21bo.2017.201862-2.1&e=45lT3D%2BbVRkPO53EdXrfSxsQmLP5zomMDGaCFJP%2FsUWQuMFfKfYV3BBCbZiz2j0w187kRmLWcxRb21XY8p3njAYpA4Y98xrwtbR9sxq9q4hbP149m5qBPDmKjytsVhuCo0UsPOKceg1x%2B%2Fnv0uLqm9fuL2LdHntGR2THtJZPLUk3f%2Fi6RQWDQTgi%2BqhDwi0YCOKyC0TQBhmbLODyrGU4tUdvXPt5Hjc4T3pBiotZqjyAxz5ptuOVPGPGL0x%2FJOXmWO2uf7UBDV5%2FDjuilZbSDSC36mR4La4RzoTRKFS5n%2Fi%2BrxzyiRFM9luQyjK%2FM%2FIEcg5WUszgSGe7eNAGpbHaB2bB9k9UiyMtddC1zoF0NP3dvJa7A4QeCh7I2%2F7%2FB%2Fygaq81ji8pB%2FDvkTNCufhlK3oabZtB0p%2BR0ObBALblCv9oHwPD7H3RGjPH3U%2BJ%2FBhAKBWKoqtDMS5OgEqqOLLPb7RQPGLQUXWJmi39%2FQUA2dJOPJOM1l%2FKqJMoG3zCx%2B%2B2NkOzY7Sbd4r2AH93yYpKvis%2BDB1SThuij3zehl9xNrw4P%2BOzvDOZSA%3D%3D&u=https%3A%2F%2Fre.taobao.com%2Faction_ecpm_home&k=569',
            img: 'https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg',
            title: '内购福利'
          },{
            link: 'https://click.mz.simba.taobao.com/ecpm?spm=a21bo.2017.201862-2.1&e=45lT3D%2BbVRkPO53EdXrfSxsQmLP5zomMDGaCFJP%2FsUWQuMFfKfYV3BBCbZiz2j0w187kRmLWcxRb21XY8p3njAYpA4Y98xrwtbR9sxq9q4hbP149m5qBPDmKjytsVhuCo0UsPOKceg1x%2B%2Fnv0uLqm9fuL2LdHntGR2THtJZPLUk3f%2Fi6RQWDQTgi%2BqhDwi0YCOKyC0TQBhmbLODyrGU4tUdvXPt5Hjc4T3pBiotZqjyAxz5ptuOVPGPGL0x%2FJOXmWO2uf7UBDV5%2FDjuilZbSDSC36mR4La4RzoTRKFS5n%2Fi%2BrxzyiRFM9luQyjK%2FM%2FIEcg5WUszgSGe7eNAGpbHaB2bB9k9UiyMtddC1zoF0NP3dvJa7A4QeCh7I2%2F7%2FB%2Fygaq81ji8pB%2FDvkTNCufhlK3oabZtB0p%2BR0ObBALblCv9oHwPD7H3RGjPH3U%2BJ%2FBhAKBWKoqtDMS5OgEqqOLLPb7RQPGLQUXWJmi39%2FQUA2dJOPJOM1l%2FKqJMoG3zCx%2B%2B2NkOzY7Sbd4r2AH93yYpKvis%2BDB1SThuij3zehl9xNrw4P%2BOzvDOZSA%3D%3D&u=https%3A%2F%2Fre.taobao.com%2Faction_ecpm_home&k=569',
            img: 'https://gw.alicdn.com/imgextra/i1/1725301/O1CN01CpGVuv1p1uBXAcbYi_!!1725301-0-lubanu.jpg',
            title: '初秋上新'
          }]
          this.recommends = this.banners
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page ++;
          this.$refs.scroll.finishPullUp()
        })
      },
      getQCCData(keyword) {
        getData(keyword).then(res => {
          this.Qcc = res
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /*100个视口*/
    height: 100vh;

    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /*不起效果了， 先删除掉*/
  /*.tab-control {*/
  /*  !*原生滚动条*!*/
  /*  !*position: sticky;*!*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/

  .content {
    /*height: 300px;*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
  /*.content {*/
  /*  !*height: 300px;*!*/
  /*  height: calc(100% - 93px);*/
  /*  !*隐藏这个高度后面的数据*!*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
