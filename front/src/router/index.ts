import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import CreateOrJoin from "@/components/CreateOrJoin.vue";
import Entry from "@/views/Entry.vue";

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'homeCreate',
    component: Entry,
  },
  {
    path: '/game',
    name: 'game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/createOrJoin',
    name: "createOrJoin",
    component: CreateOrJoin,
    props: {
      onOwnPage: true
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
