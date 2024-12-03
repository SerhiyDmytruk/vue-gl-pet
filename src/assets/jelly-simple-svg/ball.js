export default class Ball {
  constructor(radius, color) {
    this.radius = radius || 20

    this.color = color || '#EDC951'
    this.originalX = 0
    this.originalY = 0
    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.rotation = 0
    this.scaleX = 1
    this.scaleY = 1
    this.alpha = 0.5
    this.lineWidth = 0
    this.friction = 0.9
    this.spring = 0.03
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
    if (this.lineWidth > 0) {
      context.stroke()
    }
    context.restore()
  }
}
