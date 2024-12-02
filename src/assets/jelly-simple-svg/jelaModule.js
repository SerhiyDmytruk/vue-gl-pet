import Mouse from './mouse'
import Dot from './jellydot'
import Ball from './ball'
import SvgParse from './svgParse'

export default class Jelateria {
  constructor(opts) {
    console.log(opts)
    this.canvas = opts.canvas
    this.ctx = this.canvas.getContext('2d')
    this.paths = opts.paths
    this.islands = []
    this.radius = opts.radius || 50
    this.m = new Mouse(this.canvas)
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
      let island = {}
      island.dots = []
      SvgParse(path.path, path.points, path.offsetX, path.offsetY).forEach((dot) => {
        island.dots.push(new Dot(dot[0], dot[1], this.radius))
      })
      island.color = path.color
      island.float = path.float
      this.buildNeighbours(island.dots)
      this.islands.push(island)
    })
  }

  floatEffect(island) {
    //
    let amplitude = island.float
    island.dots.forEach((dot) => {
      // console.log(dot);
      if (parseInt(dot.x) - parseInt(dot.originalX) > 0) {
        // console.log(parseInt(dot.x),parseInt(dot.originalX),'ints');
      }

      if (
        parseInt(dot.x) == parseInt(dot.originalX) &&
        parseInt(dot.y) == parseInt(dot.originalY)
      ) {
        // dot.vx = 10;

        // console.log(this.time);
        // dot.x = dot.originalX;
        // console.log(dot);
        // console.log('runme');
        dot.floatMe(amplitude + (amplitude / 3) * Math.random())
      }
    })
  }

  buildNeighbours(dots) {
    for (var i = 0, len = dots.length; i < len; i++) {
      var jp = dots[i]
      var pi = i === 0 ? len - 1 : i - 1
      var ni = i === len - 1 ? 0 : i + 1
      jp.setNeighbors(dots[pi], dots[ni])
      console.log(jp)
      for (var j = 0; j < len; j++) {
        var ojp = dots[j]
        var curdist = Math.sqrt((ojp.x - jp.x) * (ojp.x - jp.x) + (ojp.y - jp.y) * (ojp.y - jp.y))
        if (ojp !== jp && ojp !== dots[pi] && ojp !== dots[ni] && curdist <= 30) {
          jp.addAcrossNeighbor(ojp)
        }
      }
    }
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
      this.floatEffect(island)
      island.dots.forEach((dot) => {
        dot.think()
      })
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
