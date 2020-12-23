<template>
<div class="container">
  <card-base ref="cardBase">
    <canvas 
    id="f2Guage"
    class="canvas"
    />
  </card-base>
  <canvas 
    class="vue-fireworks-fixed"
    :style="fireCanvasStyle"
    />
</div>
</template>

<script>
import CardBase from 'components/dashboards/CardBase'
import anime from 'animejs';
import F2 from '@antv/f2';
const Util = F2.Util;
export default {
  name: 'f2Guage',
  props: {
    percent:{
      type: Number,
       default() {
        return 0;
      },
    },
    el: {
      type: undefined,
      default() {
        return document.body;
      },
    },
    fireCanvasStyle: {
      type: Object,
      default() {
        return {
          left: 0, top: 0,
        };
      },
    },
  },
  components: {
    CardBase
  },
  data () {
    return {
      dataChart: [
        {
          const: 'a',
          actual: this.percent,
          expect: 100
        }
      ]
    }
  },
  mounted () {
    this.startFireWork()
    this.renderChart()
  },
  methods: {
    renderChart () {
      var _self = this
      const chart = new F2.Chart({
        id: 'f2Guage',
        pixelRatio: window.devicePixelRatio, 
        height: 300,
        padding: [0, 30, 60],
        width: this.$refs.cardBase.$el.offsetWidth - 50
      })

      chart.source(this.dataChart, {
        actual: {
          max: 100,
          min: 0,
          nice: false
        }
      })

      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.8,
        startAngle: -Math.PI,
        endAngle: 0
      })
      chart.axis(false)

      chart.interval()
        .position('const*expect')
        .shape('polar-tick')
        .size(10)
        .color('#F3F3F3')
        .animate(false)
      chart.interval()
        .position('const*actual')
        .shape('polar-tick')
        .size(10)
        .color('#246BFF')
        .animate({
          appear: {
            duration: 1100,
            easing: 'linear',
            animation: function animation (shape, animateCfg) {
              const startAngle = shape.attr('startAngle')
              let endAngle = shape.attr('endAngle')
              if (startAngle > endAngle) {
                endAngle += Math.PI * 2
              }
              shape.attr('endAngle', startAngle)
              shape.animate().to(Util.mix({
                attrs: {
                  endAngle
                }
              }, animateCfg)).onUpdate(function (frame) {
                console.log('frame')
                const textEl = document.querySelector('#text')
                if (textEl) textEl.innerHTML = parseInt(frame * _self.percent) + '%'

              }).onEnd(function() {
                console.log('o panico acabou')
              })
            }
          }
        })
      chart.guide().html({
        position: ['50%', '92%'],
        html: `
          <div style="width: 120px;color: #246BFF;white-space: nowrap;text-align:center;">
            <p style="font-size: 23px;margin:0;">Score</p>
            <p id="text" style="font-size: 48px;margin:0;font-weight: bold;">0</p>
          </div>`
      })
      chart.render()
    },
    startFireWork(){
    const canvasEl = document.querySelector('.vue-fireworks-fixed');
    const ctx = canvasEl.getContext('2d');
    const numberOfParticules = 30;
    let pointerX = 0;
    let pointerY = 0;
    const tap = 'ontouchstart' in window || navigator.msMaxTouchPoints
      ? 'touchstart'
      : 'mousedown';
    const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
    function setCanvasSize() {
      canvasEl.width = window.innerWidth * 2;
      canvasEl.height = window.innerHeight * 2;
      canvasEl.style.width = `${window.innerWidth}px`;
      canvasEl.style.height = `${window.innerHeight}px`;
      canvasEl.getContext('2d').scale(2, 2);
    }
    // 更新坐标
    function updateCoords(e) {
      pointerX = e.clientX || e.touches[0].clientX;
      pointerY = (e.clientY || e.touches[0].clientY) - 50;
    }
    // 设置颗粒的方向
    function setParticuleDirection(p) {
      const angle = (anime.random(0, 360) * Math.PI) / 180;
      const value = anime.random(50, 180);
      const radius = [-1, 1][anime.random(0, 1)] * value;
      return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle),
      };
    }
    // 创建小圆圈颗粒
    function createParticule(x, y) {
      const p = {};
      p.x = x;
      p.y = y;
      p.color = colors[anime.random(0, colors.length - 1)];
      p.radius = anime.random(16, 32);
      p.endPos = setParticuleDirection(p);
      p.draw = () => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = p.color;
        ctx.fill();
      };
      return p;
    }
    // 渲染小圆圈
    function renderParticule(anim) {
      var i = 0;
      for (i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw();
      }
    }
    // Random Coords
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    // 动画颗粒
    function animateParticules(x, y) {
      const particules = [];
      for (let i = 0; i < numberOfParticules; i++) {
        particules.push(createParticule(x, y));
      }
      anime.timeline({
          targets: particules,
        }).add({
        
        x(p) {
          return p.endPos.x;
        },
        y(p) {
          return p.endPos.y;
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
      });
    }
    const render = anime({
      duration: Infinity,
      update(anim) {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      },
    });
    var i = 0;
    var sec = setInterval(function(){
      render.play();
      i+=1;
      verifyInt(i);
      animateParticules(getRandomInt(0,800), getRandomInt(0,300));
    }, 200);

    function verifyInt(i){
      if(i == 20){
        clearInterval(sec);
      }
    }
 
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize, false);
    }
  }
}
</script>

<style>
.container {
    position: relative;
}
canvas.guage {
  border-radius: 5px;
  background-color: #1890ff;
  background-image: linear-gradient(#246BFF, #2797FF);
}
.vue-fireworks-fixed {
  width:612px;
  height:300px;
  position: absolute;
  pointer-events:none;
}
.canvas {
  padding-left: 0;
  padding-right: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 800px;
}
</style>