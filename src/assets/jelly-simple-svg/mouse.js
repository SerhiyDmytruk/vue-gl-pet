import Vec2 from './vec2'

export default class Mouse {
  constructor(canvas) {
    this.pos = new Vec2(0, 0)

    var self = this

    canvas.onmousemove = (e) => {
      var r = canvas.getBoundingClientRect()
      self.pos.set(e.clientX - r.left, e.clientY - r.top)
      return e.preventDefault()
    }
    canvas.onmouseup = (e) => {
      return e.preventDefault()
    }
    canvas.onmousedown = (e) => {
      var r = canvas.getBoundingClientRect()
      self.pos.set(e.clientX - r.left, e.clientY - r.top)
      return e.preventDefault()
    }
  }
}
