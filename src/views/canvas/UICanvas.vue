<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
  }
})

onUnmounted(() => {
  ctx = null
})
</script>

<template>
  <div>
    <div>
      <h1>UI Canvas</h1>
      <p>This code example is to try to implement the code in vue and understand how it works</p>
      <a href="https://www.youtube.com/live/ykrCP-dL2Ys?feature=shared" target="_blank">
        original link
      </a>
    </div>

    <canvas ref="canvas" id="drawOnMe" width="600" height="600"></canvas>
  </div>
</template>
