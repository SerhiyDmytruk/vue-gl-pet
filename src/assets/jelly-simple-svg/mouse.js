import Vec2 from './vec2'

export default class Mouse {
  constructor(canvas) {
    this.pos = new Vec2(0, 0)
    this.down = false

    var self = this

    console.log(canvas)

    canvas.onmousemove = (e) => {
      var r = canvas.getBoundingClientRect()
      self.pos.set(e.clientX - r.left, e.clientY - r.top)

      console.log(self.pos)

      return e.preventDefault()
    }
    canvas.onmouseup = (e) => {
      self.down = false
      return e.preventDefault()
    }
    canvas.onmousedown = (e) => {
      self.down = true
      var r = canvas.getBoundingClientRect()
      self.pos.set(e.clientX - r.left, e.clientY - r.top)
      return e.preventDefault()
    }
  }
}
