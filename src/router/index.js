import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Auth
  },
  {
    path: '/login',
    name: 'Login',
    component: Auth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var authPageName = ['Login', 'Register', 'Test']
  if (!authPageName.includes(to.name) && !store.state.list.user) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
export default router
