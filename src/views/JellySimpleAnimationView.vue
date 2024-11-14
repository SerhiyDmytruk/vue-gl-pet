<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Ball from '@/components/jelly-simple/ball.js'
import Mouse from '@/components/jelly-simple/mouse.js'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let pos: Mouse
const balls: Ball[] = []
const mouse = new Ball(0, 0, 30, 'green')

function initializeBalls() {
  for (let i = 0; i < 20; i++) {
    balls.push(
      new Ball(
        200 + 100 * Math.cos((i * 2 * Math.PI) / 20),
        200 + 100 * Math.sin((i * 2 * Math.PI) / 20)
      )
    )
  }
}

function ConnectDots1(dots: Ball[]) {
  if (!ctx) return
  ctx.beginPath()
  for (let i = 0, jlen = dots.length; i <= jlen; ++i) {
    const p0 = dots[i % jlen]
    const p1 = dots[(i + 1) % jlen]
    ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5)
  }
  ctx.closePath()
  ctx.stroke()
  // ctx.fill()
}

function Render() {
  if (!ctx) return
  ctx.clearRect(0, 0, 600, 600)
  mouse.setPos(pos.x, pos.y)
  mouse.draw(ctx)
  balls.forEach((ball) => {
    ball.think(pos)
    ball.draw(ctx)
  })
  ConnectDots1(balls)
  requestAnimationFrame(Render)
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    pos = new Mouse(canvas.value)
    initializeBalls()
    Render()
  }
})

onUnmounted(() => {
  ctx = null
})
</script>

<template>
  <canvas ref="canvas" id="drawOnMe" width="600" height="600"></canvas>

  <p>my work it is try to realise code in the vue and understand how it work</p>
  <a href="https://www.youtube.com/live/XqB_Ulfpd0w?feature=shared"> original link </a>
</template>

<style scoped>
@media (min-width: 1024px) {
  .main {
    min-height: 100vh;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  }
}

canvas {
  display: block;
  margin: 0 auto;
  border: 1px solid #333;
}
</style>
