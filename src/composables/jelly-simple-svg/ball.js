import { reactive } from 'vue'

export function useBall(radius, color) {
  let ball = reactive({
    radius: radius || 20,
    color: color || '#EDC951',
    originalX: 0,
    originalY: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    alpha: 0.5,
    lineWidth: 0,
    friction: 0.9,
    spring: 0.03
  })

  const draw = (context) => {
    console.log(context, 'context')
    console.log(ball, 'ball')
    context.save()
    console.log(ball.x, ball.y)
    context.translate(ball.x, ball.y)
    context.rotate(ball.rotation)
    context.scale(ball.scaleX, ball.scaleY)
    context.lineWidth = ball.lineWidth
    context.globalAlpha = ball.alpha
    context.fillStyle = ball.color
    context.beginPath()
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, ball.radius, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()
    if (ball.lineWidth > 0) {
      context.stroke()
    }
    context.restore()
  }

  return {
    ...ball,
    draw
  }
}
