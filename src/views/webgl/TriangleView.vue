<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null

var vertexShaderText = [
  'precision mediump float;',
  '',
  'attribute vec2 vertPosition;',
  'attribute vec3 vertColor;',
  'varying vec3 fragColor;',
  '',
  'void main()',
  '{',
  '  fragColor = vertColor;',
  '  gl_Position = vec4(vertPosition, 0.0, 1.0);',
  '}'
].join('\n')

var fragmentShaderText = [
  'precision mediump float;',
  '',
  'varying vec3 fragColor;',
  'void main()',
  '{',
  '  gl_FragColor = vec4(fragColor, 1.0);',
  '}'
].join('\n')

function createShader(gl: WebGLRenderingContext, type: any, source: any) {
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

function createProgram(gl, vertexShader: any, fragmentShader: any) {
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
  if (canvas.value) {
    gl = canvas.value.getContext('webgl')

    gl?.clearColor(0.75, 0.85, 0.8, 1.0)
    gl?.clear(gl.COLOR_BUFFER_BIT | gl?.DEPTH_BUFFER_BIT)

    //
    // Create shaders
    //

    const vertexShader = createShader(gl, gl?.VERTEX_SHADER, vertexShaderText)
    const fragmentShader = createShader(gl, gl?.FRAGMENT_SHADER, fragmentShaderText)
    const program = createProgram(gl, vertexShader, fragmentShader)

    //
    // Create buffer
    //

    // prettier-ignore
    const triangleVertices =
    [ // X, Y,       R, G, B
      0.0, 0.5,    1.0, 1.0, 0.0,
      -0.5, -0.5,  0.7, 0.0, 1.0,
      0.5, -0.5,   0.1, 1.0, 0.6
    ];

    const triangleVertexBufferObject = gl?.createBuffer()
    gl?.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject)
    gl?.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW)

    const positionAttribLocation = gl?.getAttribLocation(program, 'vertPosition')
    const colorAttribLocation = gl?.getAttribLocation(program, 'vertColor')

    gl?.vertexAttribPointer(
      positionAttribLocation, // Attribute location
      2, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    )
    gl?.vertexAttribPointer(
      colorAttribLocation, // Attribute location
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    )

    gl?.enableVertexAttribArray(positionAttribLocation)
    gl?.enableVertexAttribArray(colorAttribLocation)

    //
    // Main render loop
    //
    gl?.useProgram(program)
    gl?.drawArrays(gl.TRIANGLES, 0, 3)
  }
})
</script>

<template>
  <div>
    <div>
      <h1>Simple Triangle created by pure WebGl</h1>
    </div>

    <canvas ref="canvas" id="drawOnMe" width="600" height="600">
      Your browser does not support HTML5
    </canvas>
  </div>
</template>
