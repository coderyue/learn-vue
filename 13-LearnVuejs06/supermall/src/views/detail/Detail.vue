<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swaiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwaiper from "./childComps/DetailSwaiper";

  import {getDetail, Goods, Shop} from "../../network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwaiper
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      }
    },
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid

      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        // 1.获取顶部轮播图图片数据
        this.topImages = data.itemInfo.topImages;
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.services)
        // 3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo)



      })
    }
  }
</script>

<style scoped>

</style>
