<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import * as THREE from 'three'

const canvasContainer = ref<HTMLDivElement | null>(null)

let typeAxis = reactive({ axisX: true })

function handleClick(e: MouseEvent) {
  if (!canvasContainer.value) return

  typeAxis.axisX = !typeAxis.axisX
}

const renderer = new THREE.WebGLRenderer({ alpha: true })
const geometry = new THREE.BufferGeometry()
const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide })

onMounted(() => {
  if (canvasContainer.value) {
    const scene = new THREE.Scene()
    THREE.ColorManagement.enabled = false

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, 600 / 600, 0.1, 1000)
    camera.position.z = 2

    // Renderer setup with transparency disabled
    renderer.setSize(600, 600)
    renderer.setClearColor(new THREE.Color(0.75, 0.85, 0.8), 1.0)
    canvasContainer.value.appendChild(renderer.domElement)

    // Triangle geometry with color data

    // Extract positions and colors from the interleaved array
    // prettier-ignore
    const positions = new Float32Array([
      // Base square (two triangles)
      -0.5, 0.0, -0.5,   // Bottom-left
      0.5, 0.0, -0.5,   // Bottom-right
      -0.5, 0.0,  0.5,   // Top-left
      0.5, 0.0,  0.5,   // Top-right
      // Pyramid tip
      0.0, 1.0,  0.0    // Tip
    ]);

    // prettier-ignore
    const indices = new Uint16Array([
    // Base square
    0, 1, 2,
    2, 1, 3,

    // Faces
    0, 2, 4, // Left
    2, 3, 4, // Front
    3, 1, 4, // Right
    1, 0, 4, // Back
  ])

    // prettier-ignore
    const colors = new Float32Array([
    1.0, 0.0, 0.0, // Bottom-left (Red)
    0.0, 1.0, 0.0, // Bottom-right (Green)
    0.0, 0.0, 1.0, // Top-left (Blue)
    1.0, 1.0, 0.0, // Top-right (Yellow)
    1.0, 0.0, 1.0  // Tip (Magenta)
    ]);

    // Separate positions and colors
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // First 3 are XYZ
    geometry.setIndex(new THREE.BufferAttribute(indices, 1)) // First 3 are XYZ
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3)) // Last 3 are RGB

    // Material with vertex colors enabled
    const pyramid = new THREE.Mesh(geometry, material)

    scene.add(pyramid)

    // Animation loop
    // eslint-disable-next-line no-inner-declarations
    function animate() {
      requestAnimationFrame(animate)

      if (typeAxis.axisX) {
        pyramid.rotation.x += 0.01 // Rotate around X-axis
      } else {
        pyramid.rotation.y += 0.01 // Rotate around Y-axis
      }

      renderer.render(scene, camera)
    }
    animate()
    canvasContainer.value?.addEventListener('click', handleClick)
  }
})

// Cleanup on component unmount
onUnmounted(() => {
  canvasContainer.value?.removeEventListener('click', handleClick)
  renderer.dispose()
  geometry.dispose()
  material.dispose()
})
</script>

<template>
  <div>
    <div>
      <h1>Simple Pyramid with transition created by ThreeJs</h1>
    </div>

    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>
