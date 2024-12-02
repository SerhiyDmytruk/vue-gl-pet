import { ref, onMounted, onUnmounted } from 'vue'
import Vec2 from './vec2'

export function useMouse(canvasRef) {
  const pos = ref(new Vec2(0, 0))
  const down = ref(false)

  function updateMousePosition(event) {
    const canvas = canvasRef.value

    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    pos.value.set(event.clientX - rect.left, event.clientY - rect.top)
    console.log(pos.value)
  }

  function handleMouseDown(event) {
    down.value = true
    updateMousePosition(event)
  }

  function handleMouseUp(event) {
    down.value = false
    updateMousePosition(event)
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    canvas.addEventListener('mousemove', updateMousePosition)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
  })

  onUnmounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    canvas.removeEventListener('mousemove', updateMousePosition)
    canvas.removeEventListener('mousedown', handleMouseDown)
    canvas.removeEventListener('mouseup', handleMouseUp)
  })

  return {
    pos,
    down
  }

  // constructor(canvas) {
  //   this.pos = new Vec2(0, 0)
  //   this.down = false

  //   var self = this

  //   canvas.onmousemove = (e) => {
  //     var r = canvas.getBoundingClientRect()
  //     self.pos.set(e.clientX - r.left, e.clientY - r.top)
  //     return e.preventDefault()
  //   }
  //   canvas.onmouseup = (e) => {
  //     self.down = false
  //     return e.preventDefault()
  //   }
  //   canvas.onmousedown = (e) => {
  //     self.down = true
  //     var r = canvas.getBoundingClientRect()
  //     self.pos.set(e.clientX - r.left, e.clientY - r.top)
  //     return e.preventDefault()
  //   }
  // }
}
