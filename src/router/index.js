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
    component: () => import(/* webpackChunkName: "about" */ '../views/categories/Categories.vue')
  },
  {
    path: '/categories/new',
    name: 'categories-new',
    component: () => import(/* webpackChunkName: "about" */ '../views/categories/CategoriesNew.vue')
  },
  {
    path: '/discounts',
    name: 'discounts',
    component: () => import(/* webpackChunkName: "about" */ '../views/discounts/Discounts.vue')
  },
  {
    path: '/discounts/new',
    name: 'discounts-new',
    component: () => import(/* webpackChunkName: "about" */ '../views/discounts/DiscountsNew.vue')
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import(/* webpackChunkName: "about" */ '../views/employees/Employees.vue')
  },
  {
    path: '/employees/new',
    name: 'employees-new',
    component: () => import(/* webpackChunkName: "about" */ '../views/employees/EmployeesNew.vue')
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import(/* webpackChunkName: "about" */ '../views/roles/Roles.vue')
  },
  {
    path: '/roles/new',
    name: 'roles-new',
    component: () => import(/* webpackChunkName: "about" */ '../views/roles/RolesNew.vue')
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import(/* webpackChunkName: "about" */ '../views/customers/Customers.vue')
  },
  {
    path: '/customers/new',
    name: 'customers-new',
    component: () => import(/* webpackChunkName: "about" */ '../views/customers/CustomersNew.vue')
  },
  {
    path: '/pos',
    name: 'pos',
    component: () => import(/* webpackChunkName: "about" */ '../views/pos/POS.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
