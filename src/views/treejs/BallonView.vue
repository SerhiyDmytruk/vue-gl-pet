<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const canvasContainer = ref<HTMLDivElement | null>(null)

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
const camera = new THREE.PerspectiveCamera(75, 600 / 600, 0.2, 1000)
camera.position.set(2, 1, 4)

const controls = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
const pointLight = new THREE.PointLight(0xffffff, 25)

// Store reference to the bottle cap mesh
let balloonMesh: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
> | null = null

const balloonMeshArray = []

onMounted(() => {
  if (canvasContainer.value) {
    // Renderer setup

    renderer.setSize(600, 600)
    renderer.setClearColor(new THREE.Color(0.75, 0.85, 0.8), 1.0)
    canvasContainer.value.appendChild(renderer.domElement)

    // Lights
    scene.add(ambientLight)
    scene.add(camera)
    camera.add(pointLight)

    // OrbitControls
    controls.enableDamping = true
    controls.enableZoom = false // zoom control

    // Load OBJ Model
    new MTLLoader().load('/src/assets/ballon/Balloon.mtl', function (materials) {
      materials.preload()
      const loader = new OBJLoader()

      loader.setMaterials(materials).load(
        '/src/assets/ballon/Balloon.obj', // Updated path
        (obj) => {
          obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh

              balloonMesh = mesh

              for (let i = 0; i < 30; i++) {
                const balloonMeshClone = mesh.clone()
                // Випадкове розташування
                balloonMeshClone.position.set(
                  Math.random() * 10 - 5,
                  Math.random() * 10 - 5,
                  Math.random() * 10 - 5
                )

                balloonMeshArray.push(balloonMeshClone) // Зберігаємо у масив
                scene.add(balloonMeshClone) // Додаємо до сцени
              }
            }
          })
        },
        (xhr) => {
          // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.error('An error occurred while loading the model:', error)
        }
      )
    })

    // Animation Loop
    // eslint-disable-next-line no-inner-declarations
    function animate() {
      controls.update()
      renderer.render(scene, camera)
      balloonMeshArray.forEach((balloon, index) => {
        balloon.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02
      })

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
      <h1>Ballon Animation by ThreeJs</h1>
    </div>

    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>
