import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import AnimationListView from '@/views/AnimationListView.vue'
import CanvasListView from '@/views/CanvasListView.vue'
import ThreeJsListView from '@/views/ThreeJsListView.vue'
import WebGlListView from '@/views/WebGlListView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/animation',
    name: 'AnimationListView',
    component: AnimationListView,
    children: [
      {
        path: 'jelly-simple-img',
        name: 'TextAnimationView',
        component: () => import('@/views/animation/TextAnimationView.vue')
      }
    ]
  },
  {
    path: '/canvas',
    name: 'CanvasListView',
    component: CanvasListView,
    children: [
      {
        path: 'jelly-simple-obj',
        name: 'JellyObjCanvasView',
        component: () => import('@/views/canvas/JellyObjCanvasView.vue')
      },
      {
        path: 'jelly-simple-svg',
        name: 'JellySVGCanvasView',
        component: () => import('@/views/canvas/JellySVGCanvasView.vue')
      },
      {
        path: 'canvas-wave',
        name: 'WaveCanvas',
        component: () => import('@/views/canvas/WaveCanvas.vue')
      }
    ]
  },
  {
    path: '/webgl',
    name: 'WebGlListView',
    component: WebGlListView,
    children: [
      {
        path: '/webgl-triangle',
        name: 'WebGlTriangleView',
        component: () => import('@/views/webgl/WebGlTriangleView.vue')
      },
      {
        path: '/webgl-2-triangle',
        name: 'WebGlTriangle2View',
        component: () => import('@/views/webgl/WebGlTriangle2View.vue')
      },
      {
        path: '/webgl-cube',
        name: 'WebGlCubeView',
        component: () => import('@/views/webgl/WebGlCubeView.vue')
      },
      {
        path: '/webgl-cube-texture',
        name: 'WebGlCubeTextureView',
        component: () => import('@/views/webgl/WebGlCubeTextureView.vue')
      },
      {
        path: '/webgl-pyramid-x-trans',
        name: 'WebGlPyramidXTransView',
        component: () => import('@/views/webgl/WebGlPyramidXTransView.vue')
      }
    ]
  },
  {
    path: '/threejs',
    name: 'ThreeJsListView',
    component: ThreeJsListView,
    children: [
      {
        path: '/threejs-triangle',
        name: 'ThreeTriangleView',
        component: () => import('@/views/treejs/ThreeTriangleView.vue')
      },
      {
        path: '/treejs-pyramid-x-trans',
        name: 'TreeJsPyramidXTransView',
        component: () => import('@/views/treejs/TreeJsPyramidXTransView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
