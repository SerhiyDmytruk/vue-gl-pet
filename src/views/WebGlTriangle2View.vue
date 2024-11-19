<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let gl: WebGLRenderingContext | null = null

var vertexShaderText = [
  'attribute vec4 position;',
  '',
  'void main()',
  '{',
  '  gl_Position = position;',
  '}'
].join('\n')

var fragmentShaderText = [
  'precision highp float;',
  'void main()',
  '{',
  '  gl_FragColor = vec4(0, 1, 0.5, 1);',
  '}'
].join('\n')

onMounted(() => {
  if (canvas.value) {
    gl = canvas.value.getContext('webgl')

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderText)
    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(vertexShader))
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderText)
    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(fragmentShader))
    }

    const prg = gl.createProgram()
    gl.attachShader(prg, vertexShader)
    gl.attachShader(prg, fragmentShader)
    gl.linkProgram(prg)
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(prg))
    }

    // NOTE! These are only here to unclutter the diagram.
    // It is safe to detach and delete shaders once
    // a program is linked though it is arguably not common.
    // and I usually don't do it.
    gl.detachShader(prg, vertexShader)
    gl.deleteShader(vertexShader)
    gl.detachShader(prg, fragmentShader)
    gl.deleteShader(fragmentShader)

    const positionLoc = gl.getAttribLocation(prg, 'position')

    // in clip space
    const vertexPositions = new Float32Array([0, 0.7, 0.5, -0.7, -0.5, -0.7])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW)

    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(
      positionLoc,
      2, // 2 values per vertex shader iteration
      gl.FLOAT, // data is 32bit floats
      false, // don't normalize
      0, // stride (0 = auto)
      0 // offset into buffer
    )

    gl.useProgram(prg)

    // compute 3 vertices for 1 triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3)
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
