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
        component: () => import('@/views/canvas/JellyObjView.vue')
      },
      {
        path: 'jelly-simple-svg',
        name: 'Jelly SVG Canvas',
        component: () => import('@/views/canvas/JellySVGView.vue')
      },
      {
        path: 'canvas-wave',
        name: 'Wave Canvas',
        component: () => import('@/views/canvas/Wave.vue')
      },
      {
        path: 'jelly-btn-svg',
        name: 'Jelly Btn',
        component: () => import('@/views/canvas/JellyBtnView.vue')
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
        component: () => import('@/views/webgl/TriangleView.vue')
      },
      {
        path: 'webgl-2-triangle',
        name: 'WebGl Triangle2',
        component: () => import('@/views/webgl/Triangle2View.vue')
      },
      {
        path: 'webgl-cube',
        name: 'WebGl Cube',
        component: () => import('@/views/webgl/CubeView.vue')
      },
      {
        path: 'webgl-cube-texture',
        name: 'WebGl Cube Texture',
        component: () => import('@/views/webgl/CubeTextureView.vue')
      },
      {
        path: 'webgl-pyramid-x-trans',
        name: 'WebGl Pyramid XTrans',
        component: () => import('@/views/webgl/PyramidXTransView.vue')
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
        component: () => import('@/views/treejs/TriangleView.vue')
      },
      {
        path: 'treejs-pyramid-trans',
        name: 'TreeJs Pyramid Transition',
        component: () => import('@/views/treejs/PyramidXTransView.vue')
      },
      {
        path: 'treejs-bottle-animate',
        name: 'TreeJs Bottle View Animate',
        component: () => import('@/views/treejs/BottleAnimateView.vue')
      },
      {
        path: 'treejs-ballon-animate',
        name: 'TreeJs ballon Animate',
        component: () => import('@/views/treejs/BallonView.vue')
      },
      {
        path: 'bear-animate',
        name: 'TreeJs Teddies Animate',
        component: () => import('@/views/treejs/TeddyAnimationView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
