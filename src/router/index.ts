import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import RouterListView from '@/views/RouterListView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/animation',
    name: 'Animation List',
    component: RouterListView,
    children: [
      {
        path: 'jelly-simple-img',
        name: 'Text Animation',
        component: () => import('@/views/animation/TextAnimationView.vue')
      }
    ]
  },
  {
    path: '/canvas',
    name: 'Canvas List',
    component: RouterListView,
    children: [
      {
        path: 'jelly-simple-obj',
        name: 'Jelly Obj Canvas',
        component: () => import('@/views/canvas/JellyObjCanvasView.vue')
      },
      {
        path: 'jelly-simple-svg',
        name: 'Jelly SVG Canvas',
        component: () => import('@/views/canvas/JellySVGCanvasView.vue')
      },
      {
        path: 'canvas-wave',
        name: 'Wave Canvas',
        component: () => import('@/views/canvas/WaveCanvas.vue')
      }
    ]
  },
  {
    path: '/webgl',
    name: 'WebGl List',
    component: RouterListView,
    children: [
      {
        path: 'webgl-triangle',
        name: 'WebGl Triangle',
        component: () => import('@/views/webgl/WebGlTriangleView.vue')
      },
      {
        path: 'webgl-2-triangle',
        name: 'WebGl Triangle2',
        component: () => import('@/views/webgl/WebGlTriangle2View.vue')
      },
      {
        path: 'webgl-cube',
        name: 'WebGl Cube',
        component: () => import('@/views/webgl/WebGlCubeView.vue')
      },
      {
        path: 'webgl-cube-texture',
        name: 'WebGl Cube Texture',
        component: () => import('@/views/webgl/WebGlCubeTextureView.vue')
      },
      {
        path: 'webgl-pyramid-x-trans',
        name: 'WebGl Pyramid XTrans',
        component: () => import('@/views/webgl/WebGlPyramidXTransView.vue')
      }
    ]
  },
  {
    path: '/threejs',
    name: 'ThreeJsList',
    component: RouterListView,
    children: [
      {
        path: 'threejs-triangle',
        name: 'Three Triangle',
        component: () => import('@/views/treejs/ThreeTriangleView.vue')
      },
      {
        path: 'treejs-pyramid-trans',
        name: 'TreeJs Pyramid Transition',
        component: () => import('@/views/treejs/TreeJsPyramidXTransView.vue')
      },
      {
        path: 'treejs-bottle',
        name: 'TreeJs Bottle View',
        component: () => import('@/views/treejs/WebGlBottleView.vue')
      },
      {
        path: 'treejs-bottle-animate',
        name: 'TreeJs Bottle View Animate',
        component: () => import('@/views/treejs/WebGlBottleAnimateView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
