<template>
  <div>
    <div class="demo-tabs-wrap">
      <div class="tips">基本示例</div>
      <wv-tabs v-model="activeIndex">
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">可滚动</div>
      <wv-tabs>
        <wv-tab v-for="index in 6" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">Sticky</div>
      <wv-tabs sticky>
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">禁用标签</div>
      <wv-tabs @disabled="onClickDisabled">
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index" :disabled="index === 2">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">卡片式标签</div>
      <wv-tabs type="card">
        <wv-tab v-for="index in 3" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">点击事件</div>
      <wv-tabs @click="onClick">
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">滑动切换</div>
      <wv-tabs :active="activeIndex" swipeable>
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">自定义标签</div>
      <wv-tabs :active="activeIndex">
        <wv-tab v-for="index in 3" :key="index" :title="'标签 ' + index">
          <div slot="title">
            <wv-icon type="success-no-circle" /> 标签 {{ index }}
          </div>
          <div class="my-content">
            内容 {{ index }}
          </div>
        </wv-tab>
      </wv-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 1
    }
  },

  methods: {
    onClickDisabled () {
      this.$toast.text('选项被禁用')
    },

    onClick (index) {
      this.$toast.text(`点击 ${index}`)
    }
  }
}
</script>

<style scoped lang="scss">
.demo-tabs-wrap {
  display: block;
  overflow: hidden;
  margin-bottom: 30px;

  .tips {
    display: block;
    font-size: 0.825rem;
    text-align: center;
    color: #333;
    padding: 0.5em 1em;
  }

  .my-content {
    padding: 3rem 0;
    text-align: center;
    background-color: #e8e8e8;
  }
}
</style>
