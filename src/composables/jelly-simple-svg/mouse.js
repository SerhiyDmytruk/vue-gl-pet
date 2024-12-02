import { ref } from 'vue'
import Vec2 from './vec2'

export function useMouse(canvasRef) {
  let pos = ref(new Vec2(0, 0))
  let down = ref(false)
  let canvas = canvasRef.value

  function updateMousePosition(event) {
    if (!canvas) return
    let rect = canvas.getBoundingClientRect()

    pos.value.set(event.clientX - rect.left, event.clientY - rect.top)
  }

  function handleMouseDown() {
    down.value = true
  }

  function handleMouseUp() {
    down.value = false
  }

  function startListening() {
    canvas.addEventListener('mousemove', updateMousePosition)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
  }

  function stopListening() {
    canvas.removeEventListener('mousemove', updateMousePosition)
    canvas.removeEventListener('mousedown', handleMouseDown)
    canvas.removeEventListener('mouseup', handleMouseUp)
  }

  startListening()

  return {
    pos,
    down,
    startListening,
    stopListening
  }
}
