import { ref } from 'vue'
import Vec2 from './vec2'

export function useMouse(canvasRef) {
  let pos = ref(new Vec2(0, 0))
  let canvas = canvasRef.value

  function updateMousePosition(event) {
    if (!canvas) return
    let rect = canvas.getBoundingClientRect()

    pos.value.set(event.clientX - rect.left, event.clientY - rect.top)
  }

  function startListening() {
    canvas.addEventListener('mousemove', updateMousePosition)
  }

  function stopListening() {
    canvas.removeEventListener('mousemove', updateMousePosition)
  }

  startListening()

  return {
    pos,
    startListening,
    stopListening
  }
}
