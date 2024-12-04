import Mouse from './mouse'
import Dot from './jellydot'
import Ball from './ball'
import SvgParse from './svgParse'

export default class Jelateria {
  constructor(opts) {
    this.canvas = opts.canvas
    this.ctx = this.canvas.getContext('2d')
    this.paths = opts.paths
    this.islands = []
    this.radius = opts.radius || 50
    this.m = new Mouse(opts.canvas)
    this.parsePaths()
    this.paused = true
    this.centerBall = new Ball(this.radius, '#ff0000')
    this.draw()

    let style = window.getComputedStyle(this.canvas)
    this.height = parseInt(style.height)
    this.width = parseInt(style.width)
    this.time = 0

    this.tick()
  }

  parsePaths() {
    this.paths.forEach((path) => {
      let island = {
        dots: [],
        color: path.color,
        float: path.float
      }

      SvgParse(path.path, path.points, path.offsetX, path.offsetY).forEach((dot) => {
        island.dots.push(new Dot(dot[0], dot[1], this.radius))
      })

      this.islands.push(island)
    })
  }

  ConnectDots(island) {
    let dots = island.dots
    this.ctx.beginPath()

    for (var i = 0, jlen = dots.length; i <= jlen; ++i) {
      var p0 = dots[i + 0 >= jlen ? i + 0 - jlen : i + 0]
      var p1 = dots[i + 1 >= jlen ? i + 1 - jlen : i + 1]
      this.ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5)
    }

    this.ctx.closePath()
    this.ctx.fillStyle = island.color
    this.ctx.fill()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    // mouse draw
    this.centerBall.x = this.m.pos.x
    this.centerBall.y = this.m.pos.y
    this.centerBall.draw(this.ctx)
    // end

    this.islands.forEach((island) => {
      island.dots.forEach((dot) => {
        dot.move(this.m)
        dot.draw(this.ctx)
        dot.drawAnchor(this.ctx)
      })
      this.ConnectDots(island)
    })
  }

  tick() {
    if (!this.paused) {
      this.time++
      this.draw()
    }
    window.requestAnimationFrame(this.tick.bind(this))
  }

  pause() {
    console.log('pause animation')
    this.paused = true
  }
  play() {
    console.log('play animation')
    this.paused = false
  }
}
