<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')

    let options = reactive({
      tension: 0.4,
      width: 200,
      height: 50,
      margin: 50,
      padding: 17,
      hoverFactor: -0.1,
      gap: 5,
      debug: false,
      forceFactor: 0.2,
      color1: '#36DFE7',
      color2: '#8F17E1',
      color3: '#E509E6',
      textColor: '#FFFFFF',
      layers: [
        {
          points: [],
          viscosity: 0.5,
          mouseForce: 100,
          forceLimit: 2
        },
        {
          points: [],
          viscosity: 0.8,
          mouseForce: 150,
          forceLimit: 3
        }
      ],
      text: '▶',
      canvas: canvas.value,
      wrapperElement: document.body,
      noise: 0
    })

    let touches: { x: number; y: number; z: number; force: number }[] = []

    const mousemove = (e: MouseEvent) => {
      touches = [
        {
          x: e.offsetX,
          y: e.offsetY,
          z: 0,
          force: 1
        }
      ]
    }

    const mouseout = (e: MouseEvent) => {
      touches = []
    }

    const distance = (p1: object, p2: object) => {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
    }

    const update = () => {
      for (let layerIndex = 0; layerIndex < options.layers.length; layerIndex++) {
        const layer = options.layers[layerIndex]
        const points = layer.points
        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          const point = points[pointIndex]
          const dx = point.ox - point.x + (Math.random() - 0.5) * options.noise
          const dy = point.oy - point.y + (Math.random() - 0.5) * options.noise
          const d = Math.sqrt(dx * dx + dy * dy)
          const f = d * options.forceFactor
          point.vx += f * (dx / d || 0)
          point.vy += f * (dy / d || 0)

          for (let touchIndex = 0; touchIndex < touches.length; touchIndex++) {
            const touch = touches[touchIndex]
            let mouseForce = layer.mouseForce
            if (
              touch.x > options.margin &&
              touch.x < options.margin + options.width &&
              touch.y > options.margin &&
              touch.y < options.margin + options.height
            ) {
              mouseForce *= -options.hoverFactor
            }
            const mx = point.x - touch.x
            const my = point.y - touch.y
            const md = Math.sqrt(mx * mx + my * my)
            const mf = Math.max(
              -layer.forceLimit,
              Math.min(layer.forceLimit, (mouseForce * touch.force) / md)
            )
            point.vx += mf * (mx / md || 0)
            point.vy += mf * (my / md || 0)
          }
          point.vx *= layer.viscosity
          point.vy *= layer.viscosity
          point.x += point.vx
          point.y += point.vy
        }

        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          const prev = points[(pointIndex + points.length - 1) % points.length]
          const point = points[pointIndex]
          const next = points[(pointIndex + points.length + 1) % points.length]
          const dPrev = distance(point, prev)
          const dNext = distance(point, next)

          const line = {
            x: next.x - prev.x,
            y: next.y - prev.y
          }
          const dLine = Math.sqrt(line.x * line.x + line.y * line.y)

          point.cPrev = {
            x: point.x - (line.x / dLine) * dPrev * options.tension,
            y: point.y - (line.y / dLine) * dPrev * options.tension
          }
          point.cNext = {
            x: point.x + (line.x / dLine) * dNext * options.tension,
            y: point.y + (line.y / dLine) * dNext * options.tension
          }
        }
      }
    }

    const animate = () => {
      update()
      draw()
      window.requestAnimationFrame(animate.bind(this))
    }

    const draw = () => {
      ctx.clearRect(0, 0, options.canvas.width, options.canvas.height)
      for (let layerIndex = 0; layerIndex < options.layers.length; layerIndex++) {
        const layer = options.layers[layerIndex]
        if (layerIndex === 1) {
          if (touches.length > 0) {
            const gx = touches[0].x
            const gy = touches[0].y
            layer.color = ctx.createRadialGradient(gx, gy, options.height * 2, gx, gy, 0)
            layer.color.addColorStop(0, options.color2)
            layer.color.addColorStop(1, options.color3)
          } else {
            layer.color = options.color2
          }
        } else {
          layer.color = options.color1
        }
        const points = layer.points
        ctx.fillStyle = layer.color

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
          ctx.bezierCurveTo(
            points[(pointIndex + 0) % points.length].cNext.x,
            points[(pointIndex + 0) % points.length].cNext.y,
            points[(pointIndex + 1) % points.length].cPrev.x,
            points[(pointIndex + 1) % points.length].cPrev.y,
            points[(pointIndex + 1) % points.length].x,
            points[(pointIndex + 1) % points.length].y
          )
        }
        ctx.fill()
      }
      ctx.fillStyle = options.textColor
      ctx.font = '100 ' + (options.height - options.padding * 2) + 'px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(
        options.text,
        options.canvas.width / 2,
        options.canvas.height / 2,
        options.width - options.padding * 2
      )
      if (options.debug) {
        drawDebug()
      }
    }

    const drawDebug = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fillRect(0, 0, options.canvas.width, options.canvas.height)
      for (let layerIndex = 0; layerIndex < options.layers.length; layerIndex++) {
        const layer = options.layers[layerIndex]
        const points = layer.points
        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          if (layerIndex === 0) {
            ctx.fillStyle = options.color1
          } else {
            ctx.fillStyle = options.color2
          }
          const point = points[pointIndex]
          ctx?.fillRect(point.x, point.y, 1, 1)
          ctx.fillStyle = '#000'
          ctx?.fillRect(point.cPrev.x, point.cPrev.y, 1, 1)
          ctx?.fillRect(point.cNext.x, point.cNext.y, 1, 1)
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.33)'
          ctx.strokeWidth = 0.5
          ctx?.beginPath()
          ctx?.moveTo(point.cPrev.x, point.cPrev.y)
          ctx?.lineTo(point.cNext.x, point.cNext.y)
          ctx?.stroke()
        }
      }
    }

    const createPoint = (x: number, y: number) => {
      return {
        x: x,
        y: y,
        ox: x,
        oy: y,
        vx: 0,
        vy: 0
      }
    }

    const initOrigins = () => {
      options.canvas.width = options.width + options.margin * 2
      options.canvas.height = options.height + options.margin * 2
      for (let layerIndex = 0; layerIndex < options.layers.length; layerIndex++) {
        const layer = options.layers[layerIndex]
        const points = []
        for (
          let x = ~~(options.height / 2);
          x < options.width - ~~(options.height / 2);
          x += options.gap
        ) {
          points.push(createPoint(x + options.margin, options.margin))
        }
        for (let alpha = ~~(options.height * 1.25); alpha >= 0; alpha -= options.gap) {
          const angle = (Math.PI / ~~(options.height * 1.25)) * alpha
          points.push(
            createPoint(
              (Math.sin(angle) * options.height) / 2 +
                options.margin +
                options.width -
                options.height / 2,
              (Math.cos(angle) * options.height) / 2 + options.margin + options.height / 2
            )
          )
        }
        for (
          let x = options.width - ~~(options.height / 2) - 1;
          x >= ~~(options.height / 2);
          x -= options.gap
        ) {
          points.push(createPoint(x + options.margin, options.margin + options.height))
        }
        for (let alpha = 0; alpha <= ~~(options.height * 1.25); alpha += options.gap) {
          const angle = (Math.PI / ~~(options.height * 1.25)) * alpha
          points.push(
            createPoint(
              options.height -
                (Math.sin(angle) * options.height) / 2 +
                options.margin -
                options.height / 2,
              (Math.cos(angle) * options.height) / 2 + options.margin + options.height / 2
            )
          )
        }
        layer.points = points
      }
    }

    canvas.value.addEventListener('mousemove', mousemove)
    canvas.value.addEventListener('mouseout', mouseout)
    initOrigins()
    animate()
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
