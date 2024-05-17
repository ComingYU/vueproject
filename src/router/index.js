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
      {path: 'userprofile', name: '个人信息', component: ()=>import('../views/UserProfile.vue')},
      {path: 'file', name: '文件管理', component: ()=>import('../views/File.vue')},
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/Login.vue')
  },{
  path:'/register',
    name:'register',
    component:()=>import('../views/Register.vue')
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
