// for debug
export default class Dot {
  constructor(x, y, neihgbourhood) {
    this.originalX = x
    this.originalY = y
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.friction = 0.3
    this.radius = 4
    this.rotation = 0
    this.scaleX = 1
    this.scaleY = 1
    this.float = 0
    this.spring = 0.03
    this.alpha = 0.1
    this.color = 'rgba(255,0,0,1)'
    this.lineWidth = 0
    this.neighbors = []
    this.neihgbourhood = neihgbourhood
  }

  move(m) {
    let centerBall = { x: m.pos.x, y: m.pos.y, radius: this.neihgbourhood }
    let radius = this.neihgbourhood
    let dx = -m.pos.x + this.x
    let dy = -m.pos.y + this.y
    var minDist = this.radius + radius
    let dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < minDist) {
      console.log('touch')
      console.log(m.pos)

      this.float = 0
      var angle = Math.atan2(dy, dx)
      var tx = centerBall.x + Math.cos(angle) * minDist
      var ty = centerBall.y + Math.sin(angle) * minDist
      this.vx += (tx - this.x) / 10
      this.vy += (ty - this.y) / 10

      // console.log(this.vx, this.vy)
    }

    this.vx *= this.friction
    this.vy *= this.friction

    // begin springBack
    this.springBack()

    if (this.float > 0) {
      this.x =
        this.originalX + this.lastFloat * Math.sin((2 * Math.PI * this.float) / this.lastFloat)
      this.float = this.float - 1 / 100
    }

    this.x += this.vx
    this.y += this.vy

    // console.log(this.vx, this.vy, this.x, this.y)
  }

  springBack() {
    var dx1 = this.originalX - this.x
    var dy1 = this.originalY - this.y

    dx1 *= this.spring
    dy1 *= this.spring

    this.vx += dx1
    this.vy += dy1
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.rotation)
    context.scale(this.scaleX, this.scaleY)
    context.lineWidth = this.lineWidth
    context.globalAlpha = this.alpha
    context.fillStyle = this.color
    context.beginPath()
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()
    context.restore()
  }

  drawAnchor(context) {
    context.save()
    context.translate(this.originalX, this.originalY)
    context.rotate(this.rotation)
    context.scale(this.scaleX, this.scaleY)
    context.lineWidth = this.lineWidth
    context.globalAlpha = this.alpha
    context.fillStyle = '#000000'
    context.beginPath()
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()
    context.restore()
  }
}
