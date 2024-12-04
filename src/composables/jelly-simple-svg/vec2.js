export default class Vec2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  set(x, y) {
    this.x = x
    this.y = y

    return this
  }
  copy(v) {
    return this.set(v.x, v.y)
  }
  translate(x, y) {
    return this.set(this.x + x, this.y + y)
  }
  scale(v) {
    return this.set(this.x * v, this.y * v)
  }
  distance(o) {
    var dx = this.x - o.x,
      dy = this.y - o.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}
