<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const canvasContainer = ref<HTMLDivElement | null>(null)

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
const camera = new THREE.PerspectiveCamera(25, 600 / 600, 0.5, 1000)
camera.position.set(8, 1, 5)

// Store reference to the bottle cap mesh
let capMesh: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
> | null = null

let bottleMesh: THREE.Mesh<
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 2)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 25)
    camera.add(pointLight)
    scene.add(camera)

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableZoom = false // zoom control

    // Load OBJ Model
    new MTLLoader().load('/src/assets/Dopper-model.mtl', function (materials) {
      materials.preload()
      const loader = new OBJLoader()
      loader.setMaterials(materials).load(
        '/src/assets/Dopper-model.obj', // Updated path
        (obj) => {
          obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh

              // Identify and store the cap mesh
              if (mesh.name === `Cap\\Solid` || mesh.name.includes('cap')) {
                capMesh = mesh
              }

              // Identify and store the cap mesh
              if (mesh.name === `Bottle\\Solid` || mesh.name.includes('cap')) {
                bottleMesh = mesh
              }
            }
          })

          obj.position.y = -1
          obj.scale.set(0.01, 0.01, 0.01)
          scene.add(obj)
        },
        (xhr) => {
          // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.error('An error occurred while loading the model:', error)
        }
      )
    })

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

let baseLevel: number = 0

function meshObjChange(
  meshElement: THREE.Mesh<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.Material | THREE.Material[],
    THREE.Object3DEventMap
  >,
  deltaY: number,
  move: string
) {
  if (meshElement) {
    // Use scroll delta to rotate the cap
    move == '+' ? (meshElement.rotation.y += deltaY / 4) : (meshElement.rotation.y -= deltaY) // Rotate 45 degrees
    move == '+' ? (meshElement.position.y += deltaY) : (meshElement.position.y -= deltaY) // Move up

    renderer.render(scene, camera) // Force update
  }
}

// Handle Mouse Scroll
function onScroll(event: WheelEvent) {
  let deltaY = event.deltaY / 10

  baseLevel += deltaY

  if (baseLevel < 0) {
    baseLevel = 0

    return false
  }

  meshObjChange(capMesh, deltaY, '+')
  meshObjChange(bottleMesh, deltaY, '-')
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
      <h1>Scroll-Controlled Bottle Cap Animation <br />by ThreeJs</h1>
    </div>

    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>
