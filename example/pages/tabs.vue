<template>
  <div>
    <div class="demo-tabs-wrap">
      <div class="tips">
        基本示例
      </div>
      <wv-tabs v-model="activeIndex">
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          内容 {{ index }}
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">
        可滚动
      </div>
      <wv-tabs>
        <wv-tab v-for="index in 6" :key="index" :title="'标签 ' + index">
          内容 {{ index }}
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">
        sticky
      </div>
      <wv-tabs sticky>
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          内容 {{ index }}
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">
        禁用标签
      </div>
      <wv-tabs @disabled="onClickDisabled">
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index" :disabled="index === 2">
          内容 {{ index }}
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">
        卡片式标签
      </div>
      <wv-tabs type="card">
        <wv-tab v-for="index in 3" :key="index" :title="'标签 ' + index">
          内容 {{ index }}
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">
        点击事件
      </div>
      <wv-tabs @click="onClick">
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          内容 {{ index }}
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">
        滑动切换
      </div>
      <wv-tabs :active="activeIndex" swipeable>
        <wv-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          内容 {{ index }}
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">
        自定义标签
      </div>
      <wv-tabs :active="activeIndex">
        <wv-tab v-for="index in 3" :key="index" :title="'标签 ' + index">
          <div slot="title">
            <wv-icon type="success-no-circle" /> 标签 {{ index }}
          </div>
          内容 {{ index }}
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

<style module lang="scss">
  .demo-tabs-wrap {
    display: block;
    overflow: hidden;
    margin-bottom: 30px;

    .tips {
      display: block;
      font-size: .825rem;
      color: #555;
      padding: .5em 1em;
    }

    .wv-tabs__content {
      padding: 1rem;
      background-color: #fff;
    }
  }
</style>
