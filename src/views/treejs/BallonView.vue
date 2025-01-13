<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const canvasContainer = ref<HTMLDivElement | null>(null)

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
const camera = new THREE.PerspectiveCamera(35, 600 / 600, 0.2, 1000)
// camera.position.set(-6, 4, 3)
camera.position.set(8, 1, 5)

const controls = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
const pointLight = new THREE.PointLight(0xffffff, 25)

// Store reference to the bottle cap mesh
let zeroMesh: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
> | null = null

onMounted(() => {
  if (canvasContainer.value) {
    // Renderer setup

    renderer.setSize(600, 600)
    renderer.setClearColor(new THREE.Color(0.75, 0.85, 0.8), 1.0)
    canvasContainer.value.appendChild(renderer.domElement)

    // Lights
    scene.add(ambientLight)
    scene.add(camera)

    // scene.rotation.set(Math.PI / 1, 0, 0)
    // scene.rotation.set(Math.PI / 3, Math.PI / 2, Math.PI / 2)

    camera.add(pointLight)

    // OrbitControls
    controls.enableDamping = true
    controls.enableZoom = false // zoom control

    // Load OBJ Model
    const loader = new OBJLoader()
    loader.load(
      '/src/assets/Zero.obj', // Updated path
      (obj) => {
        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh

            zeroMesh = mesh
          }
        })

        // obj.position.y = -1
        obj.scale.set(0.01, 0.01, 0.01)

        // Додаємо обертання (наприклад, навколо осі Y)
        // obj.rotation.y = Math.PI / 2 // Повертаємо на 90 градусів
        scene.add(obj)
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.error('An error occurred while loading the model:', error)
      }
    )

    window.addEventListener('wheel', onScroll)

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

// Handle Mouse Scroll
function onScroll(event: WheelEvent) {
  // console.log(event, zeroMesh, camera)
}

// Cleanup on component unmount
onUnmounted(() => {
  window.removeEventListener('wheel', onScroll)
  renderer.dispose()
})
</script>

<template>
  <div>
    <div>
      <h1>Ballon Animation by ThreeJs</h1>
    </div>

    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>
