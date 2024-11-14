export default class Ball {
  constructor(x, y, radius = 2, color = '#ff6600') {
    this.x = x
    this.y = y
    this.originalX = x
    this.originalY = y
    this.vx = 0
    this.vy = 0
    this.radius = radius
    this.color = color
    this.friction = 0.7
    this.springFactor = 0.01
  }

  setPos(x, y) {
    this.x = x
    this.y = y
  }

  think(mouse) {
    let dx = this.x - mouse.x
    let dy = this.y - mouse.y
    let dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 30) {
      const angle = Math.atan2(dy, dx)
      const tx = mouse.x + Math.cos(angle) * 30
      const ty = mouse.y + Math.sin(angle) * 30
      this.vx += tx - this.x
      this.vy += ty - this.y
    }

    const dx1 = -(this.x - this.originalX)
    const dy1 = -(this.y - this.originalY)
    this.vx += dx1 * this.springFactor
    this.vy += dy1 * this.springFactor
    this.vx *= this.friction
    this.vy *= this.friction
    this.x += this.vx
    this.y += this.vy
  }

  draw(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}
