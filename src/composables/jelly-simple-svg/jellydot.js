import { reactive, toRefs } from 'vue'

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
    const centerBall = { x: mouse.pos.x, y: mouse.pos.y, radius: state.neighbourhood }
    const radius = state.neighbourhood
    const dx = -mouse.pos.x + state.x
    const dy = -mouse.pos.y + state.y
    const minDist = state.radius + radius
    const dist = Math.sqrt(dx ** 2 + dy ** 2)

    if (dist < minDist) {
      state.float = 0
      const angle = Math.atan2(dy, dx)
      const tx = centerBall.x + Math.cos(angle) * minDist
      const ty = centerBall.y + Math.sin(angle) * minDist

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
  }

  // Trigger a floating effect
  const floatMe = (amount) => {
    if (state.float < 0.1) {
      state.float = amount
      state.lastFloat = amount
    }
  }

  // Add a neighbor for interaction
  const addNeighbor = (neighbor, compress, strength) => {
    const dist = Math.sqrt((neighbor.x - state.x) ** 2 + (neighbor.y - state.y) ** 2)
    state.neighbors.push({
      point: neighbor,
      x: neighbor.x,
      y: neighbor.y,
      vx: neighbor.vx,
      vy: neighbor.vy,
      dist,
      compress,
      strength
    })
  }

  // Add across neighbor
  const addAcrossNeighbor = (neighbor) => {
    addNeighbor(neighbor, 1, 1)
  }

  // Set neighboring dots
  const setNeighbors = (prev, next) => {
    addNeighbor(prev, 30, 0.5)
    addNeighbor(next, 30, 0.5)
  }

  // Spring back towards the original position
  const springBack = () => {
    const dx = state.originalX - state.x
    const dy = state.originalY - state.y

    state.vx += dx * state.spring
    state.vy += dy * state.spring
  }

  // Handle interactions with neighbors
  const think = () => {
    state.neighbors.forEach((n) => {
      const dx = state.x - n.x
      const dy = state.y - n.y
      const d = Math.sqrt(dx ** 2 + dy ** 2)
      let a = ((n.dist - d) / d) * n.strength

      if (d < n.dist) {
        a /= n.compress
      }

      const ox = dx * a * state.friction
      const oy = dy * a * state.friction

      state.vx += ox
      state.vy += oy

      n.point.vx -= ox
      n.point.vy -= oy

      // Visual feedback based on movement intensity
      n.point.color = ox > 0.001 ? 'rgba(255,0,255,1)' : 'rgba(0,255,255,1)'
    })
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
    ...toRefs(state),
    move,
    floatMe,
    addNeighbor,
    addAcrossNeighbor,
    setNeighbors,
    think,
    draw,
    drawAnchor
  }
}
