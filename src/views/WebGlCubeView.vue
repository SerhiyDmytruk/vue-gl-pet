<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { glMatrix, mat4 } from 'gl-matrix'

const canvas = ref<HTMLCanvasElement | null>(null)
var gl: WebGLRenderingContext | null = null

var vertexShaderText = [
  'precision mediump float;',
  '',
  'attribute vec3 vertPosition;',
  'attribute vec3 vertColor;',
  'varying vec3 fragColor;',
  'uniform mat4 mWorld;',
  'uniform mat4 mView;',
  'uniform mat4 mProj;',
  '',
  'void main()',
  '{',
  '  fragColor = vertColor;',
  '  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
  '}'
].join('\n')

// mWorld - is a rotating
// mView - is a camera
// mProj - additonal points, "nice points", which we have before

var fragmentShaderText = [
  'precision mediump float;',
  '',
  'varying vec3 fragColor;',
  'void main()',
  '{',
  '  gl_FragColor = vec4(fragColor, 1.0);',
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
  if (canvas.value) {
    gl = canvas.value.getContext('webgl')

    gl?.clearColor(0.75, 0.85, 0.8, 1.0)
    gl?.clear(gl.COLOR_BUFFER_BIT | gl?.DEPTH_BUFFER_BIT)
    gl?.enable(gl?.DEPTH_TEST)
    gl?.enable(gl?.CULL_FACE)
    gl?.frontFace(gl?.CCW)
    gl?.cullFace(gl?.BACK)

    //
    // Create shaders
    //

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText)
    const program: WebGLProgram | null = createProgram(gl, vertexShader, fragmentShader)

    //
    // Create buffer
    //

    // prettier-ignore
    var boxVertices =
    [ // X, Y, Z           R, G, B
        // Top
        -1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
        -1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
        1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
        1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

        // Left
        -1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
        -1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
        -1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
        -1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

        // Right
        1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
        1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
        1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
        1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

        // Front
        1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
        1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
        -1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
        -1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

        // Back
        1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
        1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
        -1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
        -1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

        // Bottom
        -1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
        -1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
        1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
        1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
    ];

    // prettier-ignore
    var boxIndices =
    [
        // Top
        0, 1, 2,
        0, 2, 3,

        // Left
        5, 4, 6,
        6, 4, 7,

        // Right
        8, 9, 10,
        8, 10, 11,

        // Front
        13, 12, 14,
        15, 14, 12,

        // Back
        16, 17, 18,
        16, 18, 19,

        // Bottom
        21, 20, 22,
        22, 20, 23
    ];

    const boxVertexBufferObject: WebGLBuffer | undefined = gl?.createBuffer()

    if (boxVertexBufferObject) {
      gl?.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject)
    }
    gl?.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW)

    const boxIndexBufferObject: WebGLBuffer | undefined = gl?.createBuffer()

    if (boxIndexBufferObject) {
      gl?.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject)
    }

    gl?.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl?.STATIC_DRAW)

    let positionAttribLocation: number = gl?.getAttribLocation(program, 'vertPosition')
    let colorAttribLocation: number = gl?.getAttribLocation(program, 'vertColor')

    gl?.vertexAttribPointer(
      positionAttribLocation, // Attribute location
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    )
    gl?.vertexAttribPointer(
      colorAttribLocation, // Attribute location
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    )

    gl?.enableVertexAttribArray(positionAttribLocation)
    gl?.enableVertexAttribArray(colorAttribLocation)

    //
    // Main render loop
    //

    // Tell OpenGl state machine which program should be active
    gl?.useProgram(program) // Safe because `undefined` is excluded

    var matWorldUniformLocation = gl?.getUniformLocation(program, 'mWorld')
    var matViewUniformLocation = gl?.getUniformLocation(program, 'mView')
    var matProjUniformLocation = gl?.getUniformLocation(program, 'mProj')

    var worldMartix = new Float32Array(16)
    var viewMatrix = new Float32Array(16)
    var projMatrix = new Float32Array(16)

    mat4.identity(worldMartix)
    mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0])
    mat4.perspective(
      projMatrix,
      glMatrix.toRadian(45),
      canvas.value.width / canvas.value.height,
      0.1,
      1000.0
    )

    gl?.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMartix)
    gl?.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix)
    gl?.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix)

    const xRotationMatrix = new Float32Array(16)
    const yRotationMatrix = new Float32Array(16)

    var indentityMatrix = new Float32Array(16)
    mat4.identity(indentityMatrix)
    var angle = 0

    var loop = function () {
      angle = (performance.now() / 1000 / 6) * 2 * Math.PI
      mat4.rotate(yRotationMatrix, indentityMatrix, angle, [0, 1, 0])
      mat4.rotate(xRotationMatrix, indentityMatrix, angle / 4, [1, 0, 0])
      mat4.mul(worldMartix, xRotationMatrix, yRotationMatrix)

      gl?.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMartix)

      gl?.clearColor(0.75, 0.85, 0.8, 1.0)
      gl?.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
      gl?.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0)

      requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)
  }
})
</script>

<template>
  <div>
    <div>
      <h1>Simple Cube 3D cated by pure WebGl</h1>
    </div>

    <canvas ref="canvas" id="drawOnMe" width="600" height="600">
      Your browser does not support HTML5
    </canvas>
  </div>
</template>
