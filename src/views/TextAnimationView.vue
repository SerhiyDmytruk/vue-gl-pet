<script setup lang="ts">
import { useThrottleFn, useDebounceFn } from '@vueuse/core'
import { reactive } from 'vue'

const skewStyle = reactive({
  transform: 'skewY(0)'
})

var checkScrollSpeed = (function (settings) {
  settings = settings! || {}

  let lastPos: null | number,
    newPos: number,
    timer: any,
    delta: number,
    delay = settings?.delay || 50 // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null
    delta = 0
  }

  clear()

  return function () {
    newPos = window.scrollY
    if (lastPos != null) {
      // && newPos < maxScroll
      delta = newPos - lastPos
    }
    lastPos = newPos
    clearTimeout(timer)
    timer = setTimeout(clear, delay)
    return delta
  }
})()

var setSkew = useThrottleFn(function (skew) {
  skewStyle.transform = 'skewY(' + skew + 'deg)'
}, 16)

var setBack = useDebounceFn(function () {
  skewStyle.transform = 'skewY(0deg)'
}, 100)

// listen to "scroll" event
window.onscroll = function () {
  const speed = checkScrollSpeed()
  console.clear()
  console.log(speed)

  setSkew(speed / 10)
  setBack()
}
</script>

<template>
  <div>
    <div>
      <h1>Skew Text Animation</h1>

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>

      <img
        :style="skewStyle"
        class="special"
        src="https://picsum.photos/seed/picsum/736/654"
        alt="random0"
      />

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>

      <img
        :style="skewStyle"
        class="special"
        src="https://picsum.photos/id/237/536/354"
        alt="random1"
      />

      <p :style="skewStyle" class="special">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt suscipit, ratione, quos
        fuga praesentium blanditiis illum sapiente? Aliquam neque, accusantium labore reprehenderit
        ipsum asperiores velit eaque. Corporis adipisci accusantium omnis.
      </p>
    </div>
  </div>
</template>

<style scoped>
.special {
  font-size: 36px;
  margin: 25px 0;
  font-weight: bold;
  transition: transform 0.1s linear;
}
</style>
