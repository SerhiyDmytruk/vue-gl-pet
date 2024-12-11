<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvas = ref<HTMLCanvasElement | null>(null)
let context: CanvasRenderingContext2D | null = null

function createWave(context: any, options: Object) {
  options = options || {}

  console.log(options)

  // API
  let wave = {
    // Properties
    amplitude: options.amplitude || 200,
    context: context,
    curviness: options.curviness || 0.75,
    duration: options.duration || 2,
    fillStyle: options.fillStyle || 'rgba(33,150,243,1)',
    frequency: options.frequency || 4,
    height: options.height || 600,
    points: [],
    segments: options.segments || 100,
    tweens: [],
    waveHeight: options.waveHeight || 300,
    width: options.width || 500,
    x: options.x || 0,
    y: options.y || 0,

    // Methods
    init: init,
    resize: resize,
    draw: draw,
    kill: kill
  }

  init()

  function kill() {
    let tweens = wave.tweens
    let len = tweens.length

    for (let i = 0; i < len; i++) {
      tweens[i].kill()
    }

    tweens.length = 0
    wave.points.length = 0
  }

  function init() {
    kill()

    let segments = wave.segments
    let interval = wave.width / segments

    for (let i = 0; i <= segments; i++) {
      let norm = i / segments
      let point = {
        x: wave.x + i * interval,
        y: 1
      }

      let tween = gsap
        .to(point, {
          duration: wave.duration,
          y: -1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
        .progress(norm * wave.frequency)

      wave.tweens.push(tween)
      wave.points.push(point)
    }
  }

  function draw() {
    let points = wave.points
    let len = points.length

    let startY = wave.waveHeight
    let height = wave.amplitude / 2

    context.beginPath()
    context.moveTo(points[0].x, startY + points[0].y * height)

    for (let i = 1; i < len; i++) {
      let point = points[i]

      context.lineTo(point.x, startY + point.y * height)
    }

    context.lineTo(wave.x + wave.width, wave.y + wave.height)
    context.lineTo(wave.x, wave.y + wave.height)
    context.closePath()
    context.fillStyle = wave.fillStyle
    context.fill()
  }

  function resize(width, height) {
    wave.width = width
    wave.height = height

    let points = wave.points
    let len = points.length
    let interval = wave.width / wave.segments

    for (let i = 0; i < len; i++) {
      let point = points[i]
      point.x = wave.x + i * interval
    }
  }

  return wave
}
onMounted(() => {
  if (canvas.value) {
    context = canvas.value.getContext('2d')

    let resolution = window.devicePixelRatio || 1

    let waves = []

    let vw = window.innerWidth
    let vh = window.innerHeight

    let wave1 = createWave(context, {
      amplitude: 10, //velikost vlneni
      duration: 4,
      fillStyle: 'rgba(81,182,254,0.5)',
      frequency: 2.5,
      width: 500,
      height: vh,
      segments: 100,
      waveHeight: vh * 0.25
    })

    let wave2 = createWave(context, {
      amplitude: 10, //velikost vlneni
      duration: 4,
      fillStyle: 'rgba(81,182,254,0.5)',
      frequency: 1.5,
      width: 500,
      height: vh,
      segments: 100,
      waveHeight: vh * 0.25
    })

    let wave3 = createWave(context, {
      amplitude: 10, //velikost vlneni
      duration: 4,
      fillStyle: 'rgba(81,182,254,0.5)',
      frequency: 0.5,
      width: 500,
      height: vh,
      segments: 100,
      waveHeight: vh * 0.35
    })

    waves.push(wave1, wave2, wave3)

    gsap.to(waves, {
      duration: 10,
      waveHeight: vh / 2,
      ease: 'sine.inOut',
      repeat: -1,
      repeatDelay: 1,
      yoyo: true
    })

    gsap.to(wave1, {
      duration: 2,
      amplitude: 10,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })

    gsap.to(wave2, {
      duration: 3,
      amplitude: 25,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })

    gsap.to(wave3, {
      duration: 4,
      amplitude: 45,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })

    gsap.ticker.add(update)

    function update() {
      let len = waves.length

      context.clearRect(0, 0, vw, vh)
      context.globalCompositeOperation = 'soft-light'

      for (let i = 0; i < len; i++) {
        waves[i].draw()
      }
    }

    // scrolltriger

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.background',
        pin: '.background', // pin the trigger element while active
        start: 'top top', // when the top of the trigger hits the top of the viewport
        end: '+=500', // end after scrolling 500px beyond the start
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        markers: true
      }
    })

    tl.to(canvas, {
      //yPercent: -100,
      ease: 'none'
    })
  }
})

onUnmounted(() => {
  context = null
})
</script>

<template>
  <div class="background">
    <div>
      <h1>Wave animation Canvas</h1>
      <p>This code example is to try to implement the code in vue and understand how it works</p>
      <a
        href="https://gsap.com/community/forums/topic/35817-water-on-landing-page-moving-up-and-down-on-scroll/"
        target="_blank"
      >
        original link
      </a>
    </div>

    <section style="height: 10vh"></section>

    <canvas ref="canvas" id="drawOnMe" width="600" height="600"></canvas>
    <section style="height: 20vh"></section>
  </div>
</template>
