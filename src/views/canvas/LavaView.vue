<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

var tl = gsap.timeline()

onMounted(() => {
  for (var i = 0; i < 10; i++) {
    var t = tl.to(document.querySelector('#blob' + i), randomBetween(14, 20), {
      y: 260,
      repeat: -1,
      repeatDelay: randomBetween(1, 3),
      yoyo: true,
      ease: 'Linear.easeNone'
    })

    tl.add(t, i + 1)
  }

  tl.seek(100)
  tl.timeScale(1)

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
})
</script>

<template>
  <div>
    <div>
      <h1>Lava animation</h1>
      <p>This code example is to try to implement the code in vue and understand how it works</p>
      <a href="https://gsap.com/community/forums/topic/18323-gsap-lava-lamp-blobs/" target="_blank">
        original link
      </a>
    </div>

    <div class="background">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
        x="0px"
        y="0px"
        width="600px"
        height="600px"
        viewBox="0 0 600 600"
        enable-background="0 0 600 600"
        xml:space="preserve"
      >
        <defs>
          <clipPath id="glassMask">
            <path
              id="glassShape"
              d="M316.784,186H295h-22c0,0-28.216,122-28.216,143.622c0,8.489,7.432,14.378,7.432,14.378	H295h42.568c0,0,7.432-5.89,7.432-14.378C345,308,316.784,186,316.784,186z"
            />
          </clipPath>

          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 21 -9"
              result="cm"
            />
          </filter>
        </defs>

        <rect id="bg" fill="transparent" width="600" height="600" />
        <path
          ref="blob0"
          id="blob0"
          fill="#ffffff"
          d="M293.667,166.5c0,8.523-6.262,14.311-14,13.56c-7.737-0.708-14-6.508-14-13.56
                                              c-0.001-7.045,6.268-13.299,14-14C287.399,151.741,293.667,157.985,293.667,166.5z"
        />
        <path
          ref="blob1"
          id="blob1"
          fill="#ffffff"
          d="M344.615,191.879c3.699,14.279-10.945,19.409-33.184,18.025c-22.24-0.936-36.891-6.401-33.191-18.57
                                              c3.67-12.088,18.553-22.051,33.185-22.621C326.058,167.541,340.946,177.677,344.615,191.879z"
        />
        <path
          ref="blob2"
          id="blob2"
          fill="#ffffff"
          d="M326.792,199.809c0.96,3.645-2.84,8.864-8.606,10.044c-5.766,1.064-9.561-3.989-8.602-9.547
                                              c0.951-5.577,4.812-9.615,8.606-8.853C321.982,192.371,325.84,196.142,326.792,199.809z"
        />
        <path
          ref="blob3"
          id="blob3"
          fill="#ffffff"
          d="M290.531,192.375c0.014,10.161-9.078,19.319-20.28,20.281c-11.203,0.668-20.297-8.529-20.282-20.281
                                              c0-11.714,8.983-23.226,20.28-22.52C281.546,170.779,290.532,182.252,290.531,192.375z"
        />
        <path
          ref="blob4"
          id="blob4"
          fill="#ffffff"
          d="M313.271,174.423c1.668,8.305-4.627,15.838-14.135,15.138c-9.508-0.815-15.804-8.485-14.136-15.494
                                              c1.664-7.031,7.996-13.322,14.135-13.957C305.274,159.629,311.607,166.098,313.271,174.423z"
        />
        <path
          ref="blob5"
          id="blob5"
          fill="#ffffff"
          d="M293.667,166.5c0,8.523-6.262,14.311-14,13.56c-7.737-0.708-14-6.508-14-13.56
                                              c-0.001-7.045,6.268-13.299,14-14C287.399,151.741,293.667,157.985,293.667,166.5z"
        />
        <path
          ref="blob6"
          id="blob6"
          fill="#ffffff"
          d="M319.333,172.231c2.007,7.745-5.936,10.527-17.998,9.776c-12.062-0.508-20.009-3.472-18.002-10.072
                                              c1.99-6.556,10.063-11.96,17.999-12.269C309.269,159.031,317.343,164.528,319.333,172.231z"
        />
        <path
          ref="blob7"
          id="blob7"
          fill="#ffffff"
          d="M309.667,176.532c0.521,1.977-1.54,4.807-4.668,5.448c-3.127,0.577-5.186-2.164-4.666-5.178
                                              c0.516-3.025,2.61-5.215,4.667-4.802C307.058,172.498,309.151,174.543,309.667,176.532z"
        />
        <path
          ref="blob8"
          id="blob8"
          fill="#ffffff"
          d="M290,172.5c0.007,5.511-4.924,10.478-10.999,11c-6.076,0.362-11.008-4.626-11.001-11
                                              c0-6.353,4.872-12.597,10.999-12.214C285.126,160.787,290,167.01,290,172.5z"
        />
        <path
          ref="blob9"
          id="blob9"
          fill="#ffffff"
          d="M302.333,162.763c0.905,4.505-2.51,8.59-7.666,8.211c-5.157-0.442-8.572-4.602-7.667-8.404
                                              c0.903-3.813,4.337-7.225,7.666-7.57C297.996,154.739,301.431,158.248,302.333,162.763z"
        />
        <path
          ref="blob10"
          id="blob10"
          fill="#ffffff"
          d="M344.615,191.879c3.699,14.279-10.945,19.409-33.184,18.025c-22.24-0.936-36.891-6.401-33.191-18.57
                                              c3.67-12.088,18.553-22.051,33.185-22.621C326.058,167.541,340.946,177.677,344.615,191.879z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.background {
  background: blue;
}
</style>
