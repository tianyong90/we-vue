<template>
  <div>
    <doc-header theme="dark"/>
    <div class="main">
      <div id="particles-js"/>
      <div class="title">WE-VUE</div>
      <div class="slogan">简单易用的 vue 组件</div>
      <div class="btns">
        <router-link to="/doc/v1_6/index" class="btn btn-quickstart">开始使用</router-link>
        <a href="https://demo.wevue.org" class="btn btn-demo">查看示例</a>
      </div>
      <img class="qrcode" src="../assets/demo_qrcode.png" alt="">
    </div>
  </div>
</template>

<script>
import 'particles.js'

export default {
  data () {
    return {}
  },

  mounted () {
    /* eslint-disable no-undef */
    particlesJS('particles-js', {
      'particles': {
        'number': {
          'value': 50,
          'density': {
            'enable': true,
            'value_area': 800
          }
        },
        'color': {
          'value': '#ffffff'
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#000000'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        'opacity': {
          'value': 0.5,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        'size': {
          'value': 2,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 100,
          'color': '#ffffff',
          'opacity': 0.4,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 6,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': true,
            'mode': 'grab'
          },
          'onclick': {
            'enable': true,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 140,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    })
  }
}
</script>

<style scoped lang="scss">
  $qrcode-size: 120px;

  #particles-js {
    width: 100%;
    height: 100vh;
    background: url(../assets/background.jpg) center top no-repeat;
    background-size: cover;
    position: absolute;
  }

  .main {
    display: flex;
    flex-direction: column;
    position: absolute;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 70px);

    .title {
      color: #fff;
      font-size: 5em;
      font-weight: 200;
      text-shadow: #333 3px 3px 6px;
      z-index: 100;
    }

    .slogan {
      color: #fff;
      font-size: 1.5em;
      font-weight: 100;
      text-shadow: #333 2px 2px 0px;
      margin-top: 20px;
      z-index: 100;
    }

    .btns {
      margin: 50px 0;
      z-index: 100;

      .btn {
        display: block;
        padding: .5em 1em;
        background-color: #329368;
        margin: 0 10px;
        color: white;
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
        float: left;
      }
    }

    .qrcode {
      display: block;
      width: $qrcode-size;
      height: $qrcode-size;
      background-color: #fff;
      margin-top: 30px;
      z-index: 100;
    }
  }
</style>
