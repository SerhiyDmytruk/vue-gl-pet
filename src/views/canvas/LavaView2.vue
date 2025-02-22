<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const canvas = ref(null)
let ctx
let points = []
let center = { x: 150, y: 380 }
const baseRadius = 40,
  size = 55
const numPoints = 30

const tl = gsap.timeline()

// Update the control points for movement
function updatePoints() {
  points.forEach((p) => {
    p.x = center.x + Math.cos(p.angle) * p.radius
    p.y = center.y + Math.sin(p.angle) * p.radius
  })
}

// Function to draw the animated blob
function drawBlob() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)

  for (let i = 1; i < points.length; i++) {
    let prev = points[i - 1]
    let curr = points[i]

    let cpX = (prev.x + curr.x) / 2
    let cpY = (prev.y + curr.y) / 2

    ctx.quadraticCurveTo(prev.x, prev.y, cpX, cpY)
  }

  ctx.closePath()
  ctx.fillStyle = 'blue'
  ctx.fill()
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  canvas.value.width = 600
  canvas.value.height = 400

  // Generate random control points
  for (let i = 0; i < numPoints; i++) {
    let angle = (i / numPoints) * Math.PI * 3
    let radius = baseRadius + Math.random() * size
    points.push({
      angle,
      radius,
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    })
  }

  // Animate shape morphing of Blob
  tl.to(points, {
    radius: (i) => baseRadius + Math.random() * size,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    onUpdate: drawBlob
  }).progress(0)

  // Animate Blob
  tl.to(center, {
    x: 'random(50, 250)',
    y: 'random(50, 250)',
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    onUpdate: () => {
      updatePoints()
      drawBlob()
    }
  }).progress(0)

  drawBlob() // Draws the first frame immediately
})
</script>

<template>
  <div>
    <div>
      <h1>Lava2 animation by Canvas</h1>
      <p>This code example is to try to implement the code in vue and understand how it works</p>
    </div>
    <div class="background">
      <canvas ref="canvas" id="drawOnMe"></canvas>
    </div>
  </div>
</template>
