import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/items',
    name: 'items',
    component: () => import(/* webpackChunkName: "about" */ '../views/items/Items.vue')
  },
  {
    path: '/items/new',
    name: 'items-new',
    component: () => import(/* webpackChunkName: "about" */ '../views/items/ItemsNew.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "about" */ '../views/items/Items.vue')
  },
  {
    path: '/modifiers',
    name: 'modifiers',
    component: () => import(/* webpackChunkName: "about" */ '../views/items/Items.vue')
  },
  {
    path: '/discounts',
    name: 'discounts',
    component: () => import(/* webpackChunkName: "about" */ '../views/items/Items.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
