import { reactive, toRaw } from 'vue'

export function useDot(x, y, neighbourhood) {
  // Reactive state for the dot
  const state = reactive({
    originalX: x,
    originalY: y,
    x,
    y,
    vx: 0,
    vy: 0,
    friction: 0.3,
    radius: 4,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    float: 0,
    spring: 0.03,
    alpha: 0.1,
    color: 'rgba(255,0,0,1)',
    lineWidth: 0,
    neighbors: [], // Stores connected neighbors
    neighbourhood,
    lastFloat: 0
  })

  // Movement logic
  const move = (mouse) => {
    let centerBall = { x: mouse.x, y: mouse.y, radius: state.neighbourhood }
    let radius = state.neighbourhood
    let dx = -mouse.x + state.x
    let dy = -mouse.y + state.y
    let minDist = state.radius + radius
    let dist = Math.sqrt(dx ** 2 + dy ** 2)

    if (dist < minDist) {
      console.log('touch')
      console.log(mouse)

      state.float = 0
      let angle = Math.atan2(dy, dx)
      let tx = centerBall.x + Math.cos(angle) * minDist
      let ty = centerBall.y + Math.sin(angle) * minDist

      state.vx += (tx - state.x) / 10
      state.vy += (ty - state.y) / 10
    }

    state.vx *= state.friction
    state.vy *= state.friction

    springBack()

    if (state.float > 0) {
      state.x =
        state.originalX + state.lastFloat * Math.sin((2 * Math.PI * state.float) / state.lastFloat)
      state.float -= 1 / 100
    }

    state.x += state.vx
    state.y += state.vy

    // console.log(state.vx, state.vy, state.x, state.y)
  }

  // Trigger a floating effect
  const floatMe = (amount) => {
    if (state.float < 0.1) {
      state.float = amount
      state.lastFloat = amount
    }
  }

  // Spring back towards the original position
  const springBack = () => {
    const dx = state.originalX - state.x
    const dy = state.originalY - state.y

    state.vx += dx * state.spring
    state.vy += dy * state.spring
  }

  // Draw the dot
  const draw = (context) => {
    context.save()
    context.translate(state.x, state.y)
    context.rotate(state.rotation)
    context.scale(state.scaleX, state.scaleY)
    context.lineWidth = state.lineWidth
    context.globalAlpha = state.alpha
    context.fillStyle = state.color
    context.beginPath()
    context.arc(0, 0, state.radius, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()
    context.restore()
  }

  // Draw the anchor/original position
  const drawAnchor = (context) => {
    context.save()
    context.translate(state.originalX, state.originalY)
    context.rotate(state.rotation)
    context.scale(state.scaleX, state.scaleY)
    context.lineWidth = state.lineWidth
    context.globalAlpha = state.alpha
    context.fillStyle = '#000000'
    context.beginPath()
    context.arc(0, 0, state.radius, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()
    context.restore()
  }

  return {
    ...toRaw(state),
    move,
    floatMe,
    draw,
    drawAnchor
  }
}
