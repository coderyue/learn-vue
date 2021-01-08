import Vue from 'vue'
import VueRouter from "vue-router";
import Detail from "../views/detail/Detail";

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const detail = () => import('../views/detail/Detail')

// 注册组件
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    /*动态路由方式传参*/
    path: '/detail/:iid',
    component: Detail
  }
]

// 创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
