import { reactive } from 'vue'

export function useBall(radius, color) {
  const ball = reactive({
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

  const move = (m) => {
    let centerBall = { x: m.pos.x, y: m.pos.y, radius: 150 }

    // let ball = this;

    var dx = ball.x - centerBall.x
    var dy = ball.y - centerBall.y
    var minDist = ball.radius + 150
    var dist = Math.sqrt(dx * dx + dy * dy)
    // console.log(ball.x,ball.y, dist,minDist,centerBall);

    if (dist < minDist) {
      var angle = Math.atan2(dy, dx),
        tx = centerBall.x + Math.cos(angle) * minDist,
        ty = centerBall.y + Math.sin(angle) * minDist

      ball.vx += tx - ball.x
      ball.vy += ty - ball.y
    }
    console.log(tx, ty, ball.x, ball.vx, '1')

    ball.vx *= ball.friction
    ball.vy *= ball.friction
    console.log(tx, ty, ball.x, ball.vx, '2')
    // begin
    var dx1 = ball.originalX - ball.x
    var dy1 = ball.originalY - ball.y

    dx1 *= ball.spring
    dy1 *= ball.spring

    ball.vx += dx1
    ball.vy += dy1
    console.log(tx, ty, ball.x, ball.vx, '3')
    // end

    ball.x += ball.vx
    ball.y += ball.vy
  }

  const draw = (context) => {
    context.save()
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
    x: ball.x - ball.radius,
    y: ball.y - ball.radius,
    width: ball.radius * 2,
    height: ball.radius * 2,
    draw,
    move
  }
}
