import { useMouse } from './mouse'
import { useDot } from './jellydot'
import { useBall } from './ball'
import { svgParse } from './svgParse'
import { reactive, ref } from 'vue'

export function jelaModule(opts) {
  const canvasRef = ref(opts.canvas) // Wrap canvas in a ref
  const { pos } = useMouse(canvasRef) // Use the ref in useMouse

  const options = reactive({
    canvas: opts.canvas,
    ctx: opts.canvas.getContext('2d'),
    paths: opts.paths,
    islands: [],
    radius: opts.radius || 50,
    m: pos,
    paused: true,
    centerBall: useBall(opts.radius, '#ff0000'),
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

      svgParse(path.path, path.points, path.offsetX, path.offsetY, path.color).forEach((dot) => {
        island.dots.push(new useDot(dot[0], dot[1], options.radius))
      })

      options.islands.push(island)
    })
  }

  const connectDots = (island) => {
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
    options.centerBall.draw(options.ctx, options.m)
    // end

    options.islands.forEach((island) => {
      island.dots.forEach((dot) => {
        dot.move(options.m)
        dot.draw(options.ctx)
        dot.drawAnchor(options.ctx)
      })
      connectDots(island)
    })
  }

  const tick = () => {
    if (!options.paused) {
      options.time++
      draw()
    }
    window.requestAnimationFrame(tick)
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

  return { options, pause: () => (options.paused = true), play: () => (options.paused = false) }
}
