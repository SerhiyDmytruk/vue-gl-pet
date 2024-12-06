<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (canvasContainer.value) {
    const scene = new THREE.Scene()
    THREE.ColorManagement.enabled = false

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, 600 / 600, 0.1, 1000)
    camera.position.z = 2

    // Renderer setup with transparency disabled
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(600, 600)
    renderer.setClearColor(new THREE.Color(0.75, 0.85, 0.8), 1.0)
    canvasContainer.value.appendChild(renderer.domElement)

    // Triangle geometry with color data
    const geometry = new THREE.BufferGeometry()

    // Extract positions and colors from the interleaved array
    // prettier-ignore
    const positions = new Float32Array([
      0.0,  0.5, 0.0,  // Top vertex
    -0.5, -0.5, 0.0,  // Bottom-left vertex
      0.5, -0.5, 0.0   // Bottom-right vertex
    ]);

    // prettier-ignore
    const colors = new Float32Array([
      1.0, 1.0, 0.0,  // Top vertex color (Yellow)
      0.7, 0.0, 1.0,  // Bottom-left vertex color (Purple)
      0.1, 1.0, 0.6   // Bottom-right vertex color (Cyan)
    ]);

    // Separate positions and colors
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // First 3 are XYZ
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3)) // Last 3 are RGB

    // Material with vertex colors enabled
    const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide })
    const triangle = new THREE.Mesh(geometry, material)

    scene.add(triangle)

    // Animation loop
    // eslint-disable-next-line no-inner-declarations
    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }
})

// Cleanup on component unmount
onUnmounted(() => {
  renderer.dispose()
  geometry.dispose()
  material.dispose()
})
</script>

<template>
  <div>
    <div>
      <h1>Simple Triangle created by ThreeJs</h1>
    </div>

    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>
