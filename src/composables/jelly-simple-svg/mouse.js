import { ref, onMounted, onUnmounted } from 'vue'
import Vec2 from './vec2'

export function useMouse(canvasRef) {
  let pos = ref(new Vec2(0, 0))
  let down = ref(false)

  function updateMousePosition(event) {
    console.log('Mouse Position:', event)

    let canvas = canvasRef.value

    if (!canvas) return

    let rect = canvas.getBoundingClientRect()
    console.log('Mouse Position:', rect)

    pos.value.set(event.clientX - rect.left, event.clientY - rect.top)
    console.log('Mouse Position:', event.clientX - rect.left, event.clientY - rect.top)
  }

  function handleMouseDown() {
    down.value = true
  }

  function handleMouseUp() {
    down.value = false
  }

  onMounted(() => {
    let canvas = canvasRef.value

    canvas.addEventListener('mousemove', updateMousePosition)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
  })

  onUnmounted(() => {
    let canvas = canvasRef.value

    canvas.removeEventListener('mousemove', updateMousePosition)
    canvas.removeEventListener('mousedown', handleMouseDown)
    canvas.removeEventListener('mouseup', handleMouseUp)
  })

  return {
    pos,
    down
  }
}
