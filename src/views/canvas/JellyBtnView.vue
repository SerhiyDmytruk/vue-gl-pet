<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
  }
})
</script>

<template>
  <div>
    <div>
      <h1>Jelly Btn Animation</h1>
      <p>This code example is to try to implement the code in vue and understand how it works</p>
      <a href="https://codepen.io/Zaku/pen/JNxKKY" target="_blank"> original link </a>
    </div>

    <canvas ref="canvas" id="drawOnMe" width="900" height="600"></canvas>
  </div>
</template>
