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

const bearMeshArray: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
>[] = []

onMounted(() => {
  if (canvasContainer.value) {
    // Renderer setup

    renderer.setSize(600, 600)
    renderer.setClearColor(new THREE.Color(51, 0.51, 0.51), 1.0)
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
    controls.enableZoom = false
    // controls.autoRotate = true

    // Load OBJ Model
    new MTLLoader().load('/src/assets/bear/bear.mtl', function (materials) {
      materials.preload()

      const loader = new OBJLoader()
      loader.setMaterials(materials).load(
        '/src/assets/bear/bear.obj',
        (obj) => {
          obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh

              for (let i = 0; i < 60; i++) {
                const bearMeshClone = mesh.clone()
                // Випадкове розташування
                bearMeshClone.position.set(
                  Math.random() * 10 - 1,
                  Math.random() * 10 - 1,
                  Math.random() * 10 - 1
                )

                bearMeshClone.rotation.y = 1
                bearMeshClone.scale.set(0.1, 0.1, 0.1)

                bearMeshArray.push(bearMeshClone) // Зберігаємо у масив
                scene.add(bearMeshClone) // Додаємо до сцени
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

      bearMeshArray.forEach((bear) => {
        bear.position.y += 0.01; // Регулюй швидкість
        if (bear.position.y > 6) {
          // Перезапуск об'єкта знизу
          bear.position.y = Math.random() * 2 - 4; // Початкова позиція знизу
          bear.position.x = Math.random() * 4 - 2; // Випадкова позиція x
          bear.position.z = Math.random() * 4 - 2; // Випадкова позиція z
        }

        // console.log(Math.random())
        bear.rotation.x += Math.random() * 0.01;
        bear.rotation.y += Math.random() * 0.01;
      });

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
      <h1>Teddies Animation by ThreeJs</h1>
    </div>

    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>
