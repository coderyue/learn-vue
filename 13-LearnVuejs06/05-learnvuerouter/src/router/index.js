// 配置路由相关的信息
import VueRouter from "vue-router";
import Vue from 'vue'
// import Home from "../components/Home";
// import About from "../components/About";
// import User from "../components/User";

// 路由懒加载，   编译后每个路由都生成一个js文件， 而不是所有路由都在一个js文件中
const Home = () => import('../components/Home');
const News = () => import('../components/News');
const Message = () => import('../components/Message')
const About = () => import('../components/About');
const User = () => import('../components/User');
const Profile = () => import('../components/Profile')

// 1. 通过vue.use(插件)， 安装插件
Vue.use(VueRouter)

// 2. 创建router对象
const routes = [
  {
    // 设置默认打开的页面,, 这里path里  不填和填 '/' 是一样的
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        redirect: 'news'
      },
      {
        path: 'news',
        component: News
      },
      {
        path: 'message',
        component: Message
      }
    ]
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    },
    // 独享守卫
    // beforeEnter: (to, from, next) => {
    //   console.log('about beforeEnter');
    //   next()
    // }
  },
  {
    // 动态在url上添加参数
    path: '/user/:userId',
    component: User,
    meta: {
      title: '用户'
    }
  },
  {
    path: '/profile',
    component: Profile,
    // 用于路由上的标题
    meta: {
      title: '档案'
    }
  }
];

const router = new VueRouter({
  // 配置路由和组件之间的映射关系, 这里之前写的是routers，一直不出组件， 换成routes出来了
  routes,
  // cli2中让url中home前没有#,   有#是hash模式， 没有#是history模式
  // cli4中， 默认就是history模式
  mode: 'history',
  // 统一修改router-link标签的class属性
  linkActiveClass: 'active'
})

// 实现浏览器路由切换时， 浏览器上面标题也跟着变(导航守卫), 这两个守卫都是全局的
// 前置守卫(guard)
// router.beforeEach((to, from, next) => {
//   // 从from跳转到to
//   console.log(to);
//   document.title = to.matched[0].meta.title;
//   // 必须执行next，默认执行next， 但是自己写了，需要自己执行next，否则点击路由不会发生跳转
//   next()
// })

// 后置钩子(hook)
// router.afterEach((to, from) => {
//   // document.title = to.matched[0].meta.title
// })

// 网上搜的使用this.$router.push(this.path)方法跳转路由， 导致重复报错的问题，虽然不影响正常运行
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 3. 将router对象传入到vue实例
export default router
