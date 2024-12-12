<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>

    <RouterLink :to="{ name: 'TextAnimationView' }">Text Animation</RouterLink>

    <RouterLink :to="{ name: 'JellyObjCanvasView' }">JellyObjCanvasView</RouterLink>
    <RouterLink :to="{ name: 'JellySVGCanvasView' }">JellySVGCanvasView</RouterLink>
    <RouterLink :to="{ name: 'WaveCanvas' }">WaveCanvas</RouterLink>

    <RouterLink :to="{ name: 'WebGlTriangleView' }">WebGlTriangleView</RouterLink>
    <RouterLink :to="{ name: 'WebGlTriangle2View' }">WebGlTriangle2View</RouterLink>
    <RouterLink :to="{ name: 'WebGlCubeView' }">WebGlCubeView</RouterLink>
    <RouterLink :to="{ name: 'WebGlCubeTextureView' }">WebGlCubeTextureView</RouterLink>
    <RouterLink :to="{ name: 'WebGlPyramidXTransView' }">WebGlPyramidXTransView</RouterLink>

    <RouterLink :to="{ name: 'ThreeTriangleView' }">ThreeTriangleView</RouterLink>
    <RouterLink :to="{ name: 'TreeJsPyramidXTransView' }">TreeJsPyramidXTransView</RouterLink>
  </nav>
</template>
