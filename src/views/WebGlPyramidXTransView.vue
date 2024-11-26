<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { mat4, glMatrix } from 'gl-matrix'

const canvas = ref<HTMLCanvasElement | null>(null)

// Vertex Shader
const vertexShaderSource = `
    precision mediump float;
    attribute vec3 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    uniform mat4 u_transform;
    void main() {
      v_color = a_color;
      gl_Position = u_transform * vec4(a_position, 1.0);
    }
  `

// Fragment Shader
const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    void main() {
      gl_FragColor = vec4(v_color, 1.0);
    }
  `

onMounted(() => {
  if (!canvas.value) return

  const gl = canvas.value.getContext('webgl')

  if (!gl) {
    console.error('WebGL not supported')
    return
  }

  // Compile shaders
  const compileShader = (source: string, type: number): WebGLShader => {
    const shader = gl.createShader(type)!
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader))
      throw new Error('Shader compile error')
    }
    return shader
  }

  const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
  const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

  // Link program
  const program = gl.createProgram()!

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    throw new Error('Program link error')
  }
  gl.useProgram(program)

  // Pyramid vertices
  // prettier-ignore
  const vertices = new Float32Array([
    // Base square (two triangles)
    -0.5, 0.0, -0.5,  1.0, 0.0, 0.0, // Bottom-left (red)
     0.5, 0.0, -0.5,  0.0, 1.0, 0.0, // Bottom-right (green)
    -0.5, 0.0,  0.5,  0.0, 0.0, 1.0, // Top-left (blue)
     0.5, 0.0,  0.5,  1.0, 1.0, 0.0, // Top-right (yellow)

    // Pyramid tip
     0.0, 1.0,  0.0,  1.0, 0.0, 1.0, // Tip (magenta)
  ])

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

  // Create buffers
  const vertexBuffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const indexBuffer = gl.createBuffer()!
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

  // Define attributes
  const positionLocation = gl.getAttribLocation(program, 'a_position')
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 24, 0)
  gl.enableVertexAttribArray(positionLocation)

  const colorLocation = gl.getAttribLocation(program, 'a_color')
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 24, 12)
  gl.enableVertexAttribArray(colorLocation)

  // Uniforms
  const transformLocation = gl.getUniformLocation(program, 'u_transform')!

  // Rotation matrices
  const transformMatrix = mat4.create()
  let angle = 0

  // Render loop
  const render = () => {
    angle += 0.01
    mat4.identity(transformMatrix)
    mat4.rotateY(transformMatrix, transformMatrix, angle) // Rotate around Y-axis
    // mat4.rotateX(transformMatrix, transformMatrix, angle / 2) // Rotate around X-axis

    gl.uniformMatrix4fv(transformLocation, false, transformMatrix)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)

    requestAnimationFrame(render)
  }

  render()
})
</script>

<template>
  <canvas ref="canvas" width="600" height="600"> Your browser does not support WebGL. </canvas>
</template>
