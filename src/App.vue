<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/jelly-simple-obj">Jelly Canvas Obj</RouterLink>
        <RouterLink to="/jelly-simple-img">Text Animation</RouterLink>
        <RouterLink to="/webgl-triangle">WebGl #1 (pure) - Triangle</RouterLink>
        <RouterLink to="/threejs-triangle">ThreeJs #1 - Triangle</RouterLink>
        <RouterLink to="/webgl-2-triangle">WebGl #2 - Triangle</RouterLink>
        <RouterLink to="/webgl-cube">WebGl #1 - Cube</RouterLink>
        <RouterLink to="/webgl-cube-texture">WebGl #1 - Textured Cube</RouterLink>
        <RouterLink to="/webgl-pyramid-x-trans">WebGl #1 - Pyramid 'x-transiiton'</RouterLink>
        <RouterLink to="/jelly-simple-svg">Jelly Canvas SVG</RouterLink>
        <RouterLink to="/treejs-pyramid-x-trans">TreeJs - Pyramid 'x-transiiton'</RouterLink>
        <RouterLink to="/canvas-wave">Canvas Wave</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
