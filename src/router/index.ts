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
      component: () => import('../views/canvas/JellyObjCanvasView.vue')
    },
    {
      path: '/jelly-simple-img',
      name: 'jelly-simple-img',
      component: () => import('../views/TextAnimationView.vue')
    },
    {
      path: '/webgl-triangle',
      name: 'webgl-triangle',
      component: () => import('../views/webgl/WebGlTriangleView.vue')
    },
    {
      path: '/threejs-triangle',
      name: 'threejs-triangle',
      component: () => import('../views/treejs/ThreeTriangleView.vue')
    },
    {
      path: '/webgl-2-triangle',
      name: 'webgl-2-triangle',
      component: () => import('../views/webgl/WebGlTriangle2View.vue')
    },
    {
      path: '/webgl-cube',
      name: 'webgl-cube',
      component: () => import('../views/webgl/WebGlCubeView.vue')
    },
    {
      path: '/webgl-cube-texture',
      name: 'webgl-cube-texture',
      component: () => import('../views/webgl/WebGlCubeTextureView.vue')
    },
    {
      path: '/webgl-pyramid-x-trans',
      name: 'webgl-pyramid',
      component: () => import('../views/webgl/WebGlPyramidXTransView.vue')
    },
    {
      path: '/jelly-simple-svg',
      name: 'jelly-simple-svg',
      component: () => import('../views/canvas/JellySVGCanvasView.vue')
    },
    {
      path: '/treejs-pyramid-x-trans',
      name: 'treejs-pyramid',
      component: () => import('../views/treejs/TreeJsPyramidXTransView.vue')
    },
    {
      path: '/canvas-wave',
      name: 'canvas-wave',
      component: () => import('../views/canvas/WaveCanvas.vue')
    }
  ]
})

export default router
