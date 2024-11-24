<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { glMatrix, mat4 } from 'gl-matrix'

const canvas = ref<HTMLCanvasElement | null>(null)
var gl: WebGLRenderingContext | null = null

const textureImg = ref<HTMLImageElement | null>(null)

var vertexShaderText = [
  'precision mediump float;',
  '',
  'attribute vec3 a_position;',
  'attribute vec3 a_color;',
  'varying vec3 v_color;',
  '',
  'void main()',
  '{',
  '  v_color = a_color;',
  '  gl_Position = vec4(a_position, 1.0);',
  '}'
].join('\n')

var fragmentShaderText = [
  'precision mediump float;',
  '',
  'varying vec3 v_color;',
  '',
  'void main()',
  '{',
  '  gl_FragColor = vec4(v_color, 1.0);',
  '}'
].join('\n')

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`ERROR compiling ${shader} shader!`, gl.getShaderInfoLog(shader))
    return
  } else {
    console.log(gl.getShaderInfoLog(shader))
  }

  gl.deleteShader(shader)
}

function createProgram(gl: WebGLRenderingContext, vertexShader: object, fragmentShader: object) {
  var program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  var success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('ERROR validating program!', gl.getProgramInfoLog(program))
    return
  } else {
    console.log(gl.getProgramInfoLog(program))
  }

  gl.deleteProgram(program)
}

onMounted(() => {
  if (canvas.value || textureImg.value) {
    gl = canvas.value.getContext('webgl')

    gl?.clearColor(0.75, 0.85, 0.8, 1.0)
    gl?.clear(gl.COLOR_BUFFER_BIT | gl?.DEPTH_BUFFER_BIT)

    //
    // Create shaders
    //

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText)
    const program: WebGLProgram | null = createProgram(gl, vertexShader, fragmentShader)

    //
    // Create buffer
    //

    gl.useProgram(program)

    // Pyramid vertices and colors
    // prettier-ignore
    const vertices = new Float32Array([
    // Base square (two triangles)
    -0.5, 0.0, -0.5,  // Bottom-left
     0.5, 0.0, -0.5,  // Bottom-right
    -0.5, 0.0,  0.5,  // Top-left
     0.5, 0.0,  0.5,  // Top-right

    // Pyramid tip
     0.0, 1.0,  0.0,  // Tip of the pyramid
]);

    // prettier-ignore
    const indices = new Uint16Array([
    // Base square
    0, 1, 2,
    2, 1, 3,

    // Triangular faces
    0, 2, 4,  // Left face
    2, 3, 4,  // Front face
    3, 1, 4,  // Right face
    1, 0, 4   // Back face
]);

    // prettier-ignore
    const colors = new Float32Array([
    // Base colors
    1.0, 0.0, 0.0,  // Bottom-left: red
    0.0, 1.0, 0.0,  // Bottom-right: green
    0.0, 0.0, 1.0,  // Top-left: blue
    1.0, 1.0, 0.0,  // Top-right: yellow

    // Tip color
    1.0, 0.0, 1.0   // Tip: magenta
]);

    // Create and bind buffers
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)

    const indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

    // Link vertex data
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(positionLocation)

    const colorLocation = gl.getAttribLocation(program, 'a_color')
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(colorLocation)

    // Set up the viewport
    gl.viewport(0, 0, canvas.value.width, canvas.value.height)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    //
    // Main render loop
    //

    var render = function () {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
      requestAnimationFrame(render)
    }

    render()
  }
})
</script>

<template>
  <div>
    <div>
      <h1>Pyramid x-transition</h1>
    </div>

    <canvas ref="canvas" width="600" height="600"> Your browser does not support HTML5 </canvas>
  </div>
</template>
