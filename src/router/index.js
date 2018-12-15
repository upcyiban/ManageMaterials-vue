import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import User from '@/components/User.vue'
import Order from '@/components/Order.vue'
import Manager from '@/components/Manager.vue'
import Detail from '@/components/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/manager',
      name: 'manager',
      component: Manager
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
  ]
})
