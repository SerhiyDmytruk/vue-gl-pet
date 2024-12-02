<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// import jelaModule from '@/assets/jelly-simple-svg/jelaModule'
import { jelaModule } from '@/composables/jelly-simple-svg/jelaModule'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')

    let jela = new jelaModule({
      canvas: canvas.value,
      radius: 100,
      paths: [
        {
          path: '#f',
          offsetX: 0,
          offsetY: 0,
          points: 40,
          color: '#007700',
          float: 10
        },
        {
          path: '#CC',
          offsetX: 170,
          offsetY: 0,
          points: 40,
          color: '#770000',
          float: 10
        },
        {
          path: '#top-symbol',
          offsetX: 480,
          offsetY: 400,
          points: 40,
          color: '#00A1DF',
          float: 10
        },
        {
          path: '#bottom-symbol',
          offsetX: 480,
          offsetY: 400,
          points: 40,
          color: '#00A1DF',
          float: 10
        }
      ]
    })

    jela.play()
  }
})

onUnmounted(() => {
  ctx = null
})
</script>

<template>
  <div>
    <div>
      <h1>Jelly Object Animation</h1>
      <p>This code example is to try to implement the code in vue and understand how it works</p>
      <a href="https://www.youtube.com/live/XqB_Ulfpd0w?feature=shared" target="_blank">
        original link
      </a>
    </div>

    <canvas ref="canvas" id="drawOnMe" width="900" height="600"></canvas>

    <svg
      width="34px"
      height="73px"
      viewBox="0 0 34 73"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M7.42277228,14.2451389 L7.42277228,24.2488426 L0.117821782,24.2488426 L0.117821782,36.4831019 L7.42277228,36.4831019 L7.42277228,72.8479167 L22.419802,72.8479167 L22.419802,36.4831019 L32.4851485,36.4831019 C32.4851485,36.4831019 33.4277228,30.6194444 33.8821782,24.1981481 L22.470297,24.1981481 L22.470297,15.8335648 C22.470297,14.5831019 24.1029703,12.893287 25.7188119,12.893287 L33.8990099,12.893287 L33.8990099,0.152083333 L22.790099,0.152083333 C7.05247525,0.168981481 7.42277228,12.4201389 7.42277228,14.2451389 Z"
        id="f"
      ></path>
    </svg>

    <svg
      width="92px"
      height="113px"
      viewBox="0 0 92 113"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>Shape</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g>
        <path
          id="CC"
          d="M46.8919601,0 C70.3379401,0 84.953616,9.58138752 91.3479742,26.6330094 C92.8704404,31.0583112 91.7945643,33.3318608 87.2474651,34.854327 L70.9672262,40.6396987 C66.2577306,42.0200681 64.4307711,41.2486852 62.7459085,36.5391897 C60.0054693,29.6779418 55.4380706,26.6330094 46.9122596,26.6330094 C34.8746266,26.6330094 30.165131,31.8093946 30.165131,42.4666582 L30.165131,70.1755437 C30.165131,80.8328074 34.8746266,86.0091926 46.9122596,86.0091926 C55.4380706,86.0091926 60.3099625,82.6597669 62.7459085,76.1030123 C64.572868,71.3935167 66.3998275,70.3176406 70.9672262,72.0025032 L87.2474651,77.7878749 C91.8148639,79.3103412 92.8704404,81.6041903 91.3479742,86.0091926 C84.953616,103.060814 70.3379401,112.642202 46.8919601,112.642202 C16.8892255,112.642202 0,96.361963 0,70.0131473 L0,42.6290546 C0,16.3005385 16.909525,0 46.8919601,0 Z"
        ></path>
      </g>
    </svg>

    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="55px"
      height="45px"
      viewBox="0 0 55 45"
      enable-background="new 0 0 55 45"
      xml:space="preserve"
    >
      <path
        id="top-symbol"
        fill="#00A1DF"
        d="M39.084,14.636c-0.995,0.001-1.929-0.474-2.515-1.278c-2.411-3.29-5.964-5.212-9.748-5.212
	s-7.337,1.88-9.748,5.212c-1.055,1.354-3.008,1.595-4.361,0.541c-1.287-1.002-1.579-2.83-0.669-4.184
	c3.596-4.95,8.983-7.77,14.759-7.77c5.776,0,11.201,2.82,14.797,7.77c0.999,1.398,0.676,3.341-0.722,4.341
	C40.354,14.43,39.727,14.633,39.084,14.636z"
      />
      <path
        id="bottom-symbol"
        fill="#00A1DF"
        d="M26.802,44C16.46,44,8,34.848,8,23.627c-0.002-1.923,0.249-3.841,0.747-5.7
	c0.446-1.66,2.151-2.644,3.81-2.198c1.659,0.446,2.642,2.15,2.198,3.81l0,0c-0.356,1.33-0.537,2.699-0.536,4.075
	c0,7.802,5.641,14.152,12.602,14.152c6.96,0,12.597-6.336,12.597-14.14c0-1.375-0.179-2.745-0.536-4.074
	c-0.449-1.659,0.532-3.368,2.191-3.817c1.659-0.45,3.367,0.532,3.817,2.191c0.497,1.854,0.748,3.768,0.747,5.687
	C45.636,34.848,37.194,44,26.802,44z"
      />
    </svg>
  </div>
</template>
