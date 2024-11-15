import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jelly-simple-obj',
      name: 'jelly-simple-obj',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/JellyObjWebGlView.vue')
    },
    {
      path: '/jelly-simple-img',
      name: 'jelly-simple-img',
      component: () => import('../views/TextAnimationView.vue')
    }
  ]
})

export default router
