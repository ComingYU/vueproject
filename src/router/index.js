import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import HomeView from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: ()=>import('../views/Manage.vue'),
    redirect: '/home',
    children:[
      {path: 'home', name: '首页', component: ()=>import('../views/Home.vue')},
      {path: 'user', name: '用户管理', component: ()=>import('../views/User.vue')},
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  localStorage.setItem("currentPathName",to.name)//设置当前路由
  store.commit('setPath')//触发store的更新
  next()
})

export default router
