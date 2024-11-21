<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { glMatrix, mat4 } from 'gl-matrix'

const canvas = ref<HTMLCanvasElement | null>(null)
var gl: WebGLRenderingContext | null = null

const textureImg = ref<HTMLImageElement | null>(null)

var vertexShaderText = [
  'precision mediump float;',
  '',
  'attribute vec3 vertPosition;',
  'attribute vec2 vertTexCoord;',
  'varying vec2 fragTexCoord;',
  'uniform mat4 mWorld;',
  'uniform mat4 mView;',
  'uniform mat4 mProj;',
  '',
  'void main()',
  '{',
  '  fragTexCoord = vertTexCoord;',
  '  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
  '}'
].join('\n')

// mWorld - is a rotating
// mView - is a camera
// mProj - additonal points, "nice points", which we have before

var fragmentShaderText = [
  'precision mediump float;',
  '',
  'varying vec2 fragTexCoord;',
  'uniform sampler2D sampler;',
  '',
  'void main()',
  '{',
  '  gl_FragColor = texture2D(sampler, fragTexCoord);',
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
    [ // X, Y, Z           U,V
      // Top
      -1.0, 1.0, -1.0,   0, 0,
      -1.0, 1.0, 1.0,    0, 1,
      1.0, 1.0, 1.0,     1, 1,
      1.0, 1.0, -1.0,    1, 0,

      // Left
      -1.0, 1.0, 1.0,    0, 0,
      -1.0, -1.0, 1.0,   1, 0,
      -1.0, -1.0, -1.0,  1, 1,
      -1.0, 1.0, -1.0,   0, 1,

      // Right
      1.0, 1.0, 1.0,    1, 1,
      1.0, -1.0, 1.0,   0, 1,
      1.0, -1.0, -1.0,  0, 0,
      1.0, 1.0, -1.0,   1, 0,

      // Front
      1.0, 1.0, 1.0,    1, 1,
      1.0, -1.0, 1.0,    1, 0,
      -1.0, -1.0, 1.0,    0, 0,
      -1.0, 1.0, 1.0,    0, 1,

      // Back
      1.0, 1.0, -1.0,    0, 0,
      1.0, -1.0, -1.0,    0, 1,
      -1.0, -1.0, -1.0,    1, 1,
      -1.0, 1.0, -1.0,    1, 0,

      // Bottom
      -1.0, -1.0, -1.0,   1, 1,
      -1.0, -1.0, 1.0,    1, 0,
      1.0, -1.0, 1.0,     0, 0,
      1.0, -1.0, -1.0,    0, 1,
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
    let texCoordAttribLocation: number = gl?.getAttribLocation(program, 'vertTexCoord')

    gl.vertexAttribPointer(
      positionAttribLocation, // Attribute location
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    )
    gl.vertexAttribPointer(
      texCoordAttribLocation, // Attribute location
      2, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    )

    gl?.enableVertexAttribArray(positionAttribLocation)
    gl?.enableVertexAttribArray(texCoordAttribLocation)

    //
    //  Create texture
    //
    var boxTexture = gl.createTexture()

    // Wait until the image is loaded

    textureImg.value.onload = () => {
      // Set texture parameters
      gl.bindTexture(gl.TEXTURE_2D, boxTexture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImg.value)

      console.log('Texture successfully loaded and applied')
    }

    gl.bindTexture(gl.TEXTURE_2D, null)

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

    //
    // Main render loop
    //

    var loop = function () {
      angle = (performance.now() / 1000 / 6) * 2 * Math.PI
      mat4.rotate(yRotationMatrix, indentityMatrix, angle, [0, 1, 0])
      mat4.rotate(xRotationMatrix, indentityMatrix, angle / 4, [1, 0, 0])
      mat4.mul(worldMartix, xRotationMatrix, yRotationMatrix)

      gl?.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMartix)

      gl?.clearColor(0.75, 0.85, 0.8, 1.0)
      gl?.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)

      gl?.bindTexture(gl.TEXTURE_2D, boxTexture)
      gl?.activeTexture(gl.TEXTURE0)

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
      <h1>Simple Textured Cube 3D by pure WebGl</h1>
    </div>

    <canvas ref="canvas" id="drawOnMe" width="600" height="600">
      Your browser does not support HTML5
    </canvas>

    <img
      ref="textureImg"
      src="@/assets/box-texture.jpg"
      alt="Texture metal box"
      style="display: none"
    />
  </div>
</template>
