<script setup lang="ts">
</script>

<template>
  <div>
    <div>
      <h1>3D Slider only CSS</h1>
      <p>This code example is to try to implement the code in vue and understand how it works</p>
      <a href="https://www.youtube.com/watch?v=yqaLSlPOUxM&list=PLneCHozK72gI337rNDJpIwb2J3V-AT2oy&index=20">YouTube</a>
    </div>

    <div class="banner">
      <div class="slider" style="--quantity: 7">
        <div class="item" style="--position: 1;"><img src="/src/assets/slider/mazepa.jpg" alt="Mazepa"></div>
        <div class="item" style="--position: 2;"><img src="/src/assets/slider/movchaly.jpg" alt="movchaly"></div>
        <div class="item" style="--position: 3;"><img src="/src/assets/slider/pokrova.jpg" alt="pokrova"></div>
        <div class="item" style="--position: 4;"><img src="/src/assets/slider/ruyina.jpg" alt="ruyina"></div>
        <div class="item" style="--position: 5;"><img src="/src/assets/slider/shapka.jpg" alt="shapka"></div>
        <div class="item" style="--position: 6;"><img src="/src/assets/slider/strily.jpg" alt="strily"></div>
        <div class="item" style="--position: 7;"><img src="/src/assets/slider/vybory.jpg" alt="vybory"></div>
      </div>

      <div class="content">
        <h1 data-content="CSS only">CSS only</h1>
        <div class="author">
          <h2>Serhii Yakutovych</h2>
          <p>Ukraine illustrator</p>
          <span>12.11.1952 - 27.06.2017</span>
        </div>
        <div class="model"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .banner {
    width: 100%;
    height: calc(100vh - 110px);
    position: relative;
    overflow: hidden;
    text-align: center;

    .slider {
      position: absolute;
      width: 200px;
      height: 200px;
      top: 10%;
      left: calc(50% - 100px);
      transform-style: preserve-3d;
      transform: perspective(1000px);
      animation: autoRun 20s linear infinite;
      z-index: 2;
    }

    .item {
      position: absolute;
      inset: 0;
      transform:
        rotateY(calc( (var(--position) - 1) * (360 / var(--quantity)) * 1deg  ))
        translateZ(550px);

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .content {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: min(1200px, 100vw);
      height: max-content;
      padding-bottom: 100px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      z-index: 1;

      h1 {
        font-size: 210px;
        line-height: 1em;
        color: #34495e;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: -23px;
        position: relative;
        display: inline-block;

        &::after {
          content: attr(data-content);
          position: absolute;
          inset: 0;
          font-size: 210px;
          line-height: 1em;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: -23px;
          z-index: 3;
          -webkit-text-stroke: 2px hsla(160, 100%, 37%, 1);
          -webkit-text-fill-color: transparent;
          color: transparent;
          pointer-events: none;
        }
      }

      .author {
        text-align: right;

        h2 {
          font-weight: 600;
          font-size: 25px;
        }
      }

      .model {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: 0;
        background-image: url('/src/assets/slider/serhii-akutovich.png');
        background-repeat: no-repeat;
        background-position: left bottom;
        background-size: contain;
        width: 470px;
        height: 75vh;
        z-index: 1;
      }
    }
  }


@keyframes autoRun {
  from {
    transform: perspective(1000px) rotateX(-5deg) rotateY(0deg);
  } to {
    transform: perspective(1000px) rotateX(-5deg) rotateY(360deg);
  }
}
</style>
