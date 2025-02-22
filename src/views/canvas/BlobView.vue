<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const canvas = ref<HTMLCanvasElement | null>(null)
let context: CanvasRenderingContext2D | null = null

const tl = gsap.timeline()
onMounted(() => {
  context = canvas.value.getContext('2d')
})
</script>

<template>
  <div>
    <div>
      <h1>Blob animation by Canvas</h1>
      <p>This code example is to try to implement the code in vue and understand how it works</p>
      <a href="https://www.blobmaker.app/">blob generator</a>
    </div>
    <div class="background">
      <canvas ref="canvas" id="drawOnMe" width="600" height="600"></canvas>

      <div class="blob-wrapper">
        <div class="blob">
          <svg         xmlns="http://www.w3.org/2000/svg"
                       x="0px"
                       y="0px"
                       width="600px"
                       height="600px"
                       viewBox="0 0 600 600"
                       enable-background="0 0 600 600"
                       xml:space="preserve"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color: rgb(254,0,242)"></stop>
                <stop offset="100%" style="stop-color: rgb(251,2,128)"></stop>
              </linearGradient>
            </defs>

            <path fill="url(#gradient)" transform="translate(100 100)">
              <animate attributeName="d"
                       dur="10s"
                       repeatCount="indefinite"
                       values="
M60.8,-47.4C75.7,-29.8,82.6,-4.7,77.7,18.1C72.8,40.9,56.1,61.3,35.1,70.4C14.2,79.5,-11,77.3,-32.9,67.1C-54.8,57,-73.6,39,-75.9,19.9C-78.2,0.7,-64.1,-19.6,-48.7,-37.3C-33.4,-54.9,-16.7,-70,3.1,-72.5C22.9,-75,45.9,-64.9,60.8,-47.4Z;
M55.6,-44.9C70.8,-25.3,80.9,-2.3,77.2,19.1C73.5,40.5,56,60.2,35.4,67.9C14.9,75.6,-8.7,71.3,-25.7,60.4C-42.7,49.5,-53.1,32,-57.1,13.4C-61,-5.2,-58.4,-24.9,-47.8,-43.4C-37.3,-61.9,-18.6,-79.2,0.8,-79.9C20.2,-80.5,40.4,-64.4,55.6,-44.9Z;
M60.8,-47.4C75.7,-29.8,82.6,-4.7,77.7,18.1C72.8,40.9,56.1,61.3,35.1,70.4C14.2,79.5,-11,77.3,-32.9,67.1C-54.8,57,-73.6,39,-75.9,19.9C-78.2,0.7,-64.1,-19.6,-48.7,-37.3C-33.4,-54.9,-16.7,-70,3.1,-72.5C22.9,-75,45.9,-64.9,60.8,-47.4Z;
M44.1,-41.7C53.4,-23.7,54.3,-5.5,52.8,16.5C51.3,38.4,47.3,64.2,33,72.8C18.6,81.4,-6.1,72.7,-21.6,59.6C-37.2,46.5,-43.5,28.9,-49.3,9.5C-55.1,-9.9,-60.3,-31.1,-52,-48.9C-43.7,-66.8,-21.9,-81.3,-2.2,-79.5C17.5,-77.8,34.9,-59.8,44.1,-41.7Z;
M58.9,-49.5C67.9,-35.6,61.1,-11.6,55.8,13.1C50.5,37.9,46.6,63.3,32.7,71.4C18.7,79.5,-5.4,70.3,-23.5,58C-41.6,45.8,-53.8,30.4,-55.8,14.7C-57.8,-1,-49.6,-17,-38.6,-31.4C-27.6,-45.8,-13.8,-58.5,5.6,-63C24.9,-67.4,49.8,-63.5,58.9,-49.5Z;
"
              ></animate>
            </path>
          </svg>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.background {
  //background: blue;
}

.blob-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: tomato;
}

.blob {
  position: absolute;
  width: 100%;
  height: 100%;
}

svg{ overflow : visible ; }
</style>
