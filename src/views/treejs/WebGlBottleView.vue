<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const canvasContainer = ref<HTMLDivElement | null>(null)

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
const camera = new THREE.PerspectiveCamera(50, 600 / 600, 0.1, 1000)
camera.position.z = 2

onMounted(() => {
  if (canvasContainer.value) {
    const scene = new THREE.Scene()

    // Renderer setup

    renderer.setSize(600, 600)
    renderer.setClearColor(new THREE.Color(0.75, 0.85, 0.8), 1.0)
    canvasContainer.value.appendChild(renderer.domElement)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 600 / 600, 0.1, 1000)
    camera.position.set(0, 1, 5)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(ambientLight, pointLight)

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Load OBJ Model
    const loader = new OBJLoader()
    loader.load(
      '/src/assets/Dopper-model.obj', // Updated path
      (obj) => {
        console.log(obj)
        obj.position.y = -1
        obj.scale.set(0.01, 0.01, 0.01)
        scene.add(obj)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.error('An error occurred while loading the model:', error)
      }
    )

    // Animation Loop
    // eslint-disable-next-line no-inner-declarations
    function animate() {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
  }
})

// Cleanup on component unmount
onUnmounted(() => {
  renderer.dispose()
})
</script>

<template>
  <div>
    <div>
      <h1>Bottle by ThreeJs</h1>
    </div>

    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>
