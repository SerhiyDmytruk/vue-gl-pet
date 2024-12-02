import { useMouse } from './mouse'
import { useDot } from './jellydot'
import { useBall } from './ball'
import { svgParse } from './svgParse'
import { reactive } from 'vue'

export function jelaModule(opts) {
  const options = reactive({
    canvas: opts.canvas,
    ctx: opts.canvas.getContext('2d'),
    paths: opts.paths,
    islands: [],
    radius: opts.radius || 50,
    m: new useMouse(opts.canvas),
    paused: true,
    centerBall: new useBall(opts.radius, '#ff0000'),
    height: parseInt(window.getComputedStyle(opts.canvas).height),
    width: parseInt(window.getComputedStyle(opts.canvas).width),
    time: 0
  })

  const parsePaths = () => {
    options.paths.forEach((path) => {
      let island = {
        dots: [],
        color: path.color,
        float: path.float
      }
      svgParse(path.path, path.points, path.offsetX, path.offsetY).forEach((dot) => {
        island.dots.push(new useDot(dot[0], dot[1], options.radius))
      })

      buildNeighbours(island.dots)
      options.islands.push(island)
    })
  }

  const floatEffect = (island) => {
    //
    let amplitude = island.float
    island.dots.forEach((dot) => {
      if (
        parseInt(dot.x) == parseInt(dot.originalX) &&
        parseInt(dot.y) == parseInt(dot.originalY)
      ) {
        dot.floatMe(amplitude + (amplitude / 3) * Math.random())
      }
    })
  }

  const buildNeighbours = (dots) => {
    for (var i = 0, len = dots.length; i < len; i++) {
      var jp = dots[i]
      var pi = i === 0 ? len - 1 : i - 1
      var ni = i === len - 1 ? 0 : i + 1

      jp.setNeighbors(dots[pi], dots[ni])
      // console.log(dots[pi], dots[ni],pi,ni);
      for (var j = 0; j < len; j++) {
        var ojp = dots[j]
        var curdist = Math.sqrt((ojp.x - jp.x) * (ojp.x - jp.x) + (ojp.y - jp.y) * (ojp.y - jp.y))
        if (ojp !== jp && ojp !== dots[pi] && ojp !== dots[ni] && curdist <= 30) {
          jp.addAcrossNeighbor(ojp)
        }
      }
    }
  }

  const ConnectDots = (island) => {
    let dots = island.dots
    options.ctx.beginPath()

    for (var i = 0, jlen = dots.length; i <= jlen; ++i) {
      var p0 = dots[i + 0 >= jlen ? i + 0 - jlen : i + 0]
      var p1 = dots[i + 1 >= jlen ? i + 1 - jlen : i + 1]
      options.ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5)
    }

    options.ctx.closePath()
    options.ctx.fillStyle = island.color
    options.ctx.fill()
  }

  const draw = () => {
    options.ctx.clearRect(0, 0, options.width, options.height)

    // mouse draw
    options.centerBall.x = options.m.pos.x
    options.centerBall.y = options.m.pos.y
    options.centerBall.draw(options.ctx)
    // end

    options.islands.forEach((island) => {
      floatEffect(island)
      island.dots.forEach((dot) => {
        dot.think()
        dot.move(options.m)
        dot.draw(options.ctx)
        dot.drawAnchor(options.ctx)
      })
      ConnectDots(island)
    })
  }

  const tick = () => {
    if (!options.paused) {
      options.time++
      draw()
    }
    window.requestAnimationFrame(tick.bind(this))
  }

  const pause = () => {
    console.log('pause animation')
    options.paused = true
  }

  const play = () => {
    console.log('play animation')
    options.paused = false
  }

  parsePaths() // Initialize islands
  tick() // Start the animation loop

  return { options, pause, play }
}
