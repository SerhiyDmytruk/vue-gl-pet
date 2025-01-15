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

const color1 = new THREE.MeshStandardMaterial({ color: 0x41b883 })
const color2 = new THREE.MeshStandardMaterial({ color: 0x34495e })

// Store reference to the mesh
let fiveMesh: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
> | null = null

let zeroMesh: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
> | null = null

const balloonMeshArray: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
>[] = []

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

    const loader = new OBJLoader()

    // Load OBJ Model
    new MTLLoader().load('/src/assets/ballon/Balloon.mtl', function (materials) {
      materials.preload()

      loader.setMaterials(materials).load(
        '/src/assets/ballon/Balloon.obj', // Updated path
        (obj) => {
          obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh

              if (mesh.name === 'Ballon Balloon') {
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
            }
          })
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.error('An error occurred while loading the model:', error)
        }
      )
    })

    const axesHelper = new THREE.AxesHelper(5) // Довжина осей 5 одиниць
    scene.add(axesHelper)

    // Завантажуємо другий об'єкт
    loader.load(
      '/src/assets/ballon-number/S7.obj',
      (obj) => {
        console.log('OBJ successfully loaded:', obj)

        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh

            if (mesh.name === '??z.5') {
              fiveMesh = mesh
              mesh.material = color1
              mesh.scale.set(0.01, 0.01, 0.01)
              mesh.position.set(3, 2, 2)
              scene.add(fiveMesh)
            }

            if (mesh.name === '??z.7') {
              zeroMesh = mesh
              mesh.material = color2
              mesh.scale.set(0.01, 0.01, 0.01)
              mesh.position.set(1, 2, 1)
              scene.add(zeroMesh)
            }
          } else {
            console.error('OBJ is undefined!')
          }
        })
      },
      undefined,
      (error) => {
        console.error('Error loading second OBJ:', error)
      }
    )

    // Animation Loop
    // eslint-disable-next-line no-inner-declarations
    function animate() {
      controls.update()
      renderer.render(scene, camera)

      const angle = Date.now() * 0.001

      balloonMeshArray.forEach((balloon, index) => {
        balloon.position.x += Math.cos(angle + index) * 0.02
        balloon.position.y += Math.sin(angle + index) * 0.02
      })

      if (fiveMesh) {
        fiveMesh.position.x += Math.sin(angle) * 0.02
      }

      if (zeroMesh) {
        zeroMesh.position.x += Math.sin(angle) * -0.02
      }

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
