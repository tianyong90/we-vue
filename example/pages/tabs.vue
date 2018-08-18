<template>
  <div>
    <div class="demo-tabs-wrap">
      <div class="tips">基本示例</div>
      <wv-tabs v-model="activeIndex">
        <wv-tab title="标签1">
          内容1
        </wv-tab>
        <wv-tab title="标签2">
          内容2
        </wv-tab>
        <wv-tab title="标签3">
          内容3
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">可滚动</div>
      <wv-tabs>
        <wv-tab title="标签1">
          内容1
        </wv-tab>
        <wv-tab title="标签2">
          内容2
        </wv-tab>
        <wv-tab title="标签3">
          内容3
        </wv-tab>
        <wv-tab title="标签4">
          内容4
        </wv-tab>
        <wv-tab title="标签5">
          内容5
        </wv-tab>
        <wv-tab title="标签6">
          内容6
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">sticky</div>
      <wv-tabs sticky>
        <wv-tab title="标签1">
          内容1
        </wv-tab>
        <wv-tab title="标签2">
          内容2
        </wv-tab>
        <wv-tab title="标签3">
          内容3
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">禁用标签</div>
      <wv-tabs @disabled="onClickDisabled">
        <wv-tab title="标签1">
          内容1
        </wv-tab>
        <wv-tab title="标签2" disabled>
          内容2
        </wv-tab>
        <wv-tab title="标签3">
          内容3
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">卡片式标签</div>
      <wv-tabs type="card">
        <wv-tab title="标签1">
          内容1
        </wv-tab>
        <wv-tab title="标签2">
          内容2
        </wv-tab>
        <wv-tab title="标签3">
          内容3
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">点击事件</div>
      <wv-tabs @click="onClick">
        <wv-tab title="标签1">
          内容1
        </wv-tab>
        <wv-tab title="标签2">
          内容2
        </wv-tab>
        <wv-tab title="标签3">
          内容3
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">滑动切换</div>
      <wv-tabs :active="activeIndex" swipeable>
        <wv-tab title="标签1">
          内容1
        </wv-tab>
        <wv-tab title="标签2">
          内容2
        </wv-tab>
        <wv-tab title="标签3">
          内容3
        </wv-tab>
      </wv-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">自定义标签</div>
      <wv-tabs :active="activeIndex">
        <wv-tab title="标签1">
          <div slot="title">
            <wv-icon type="success-no-circle" /> 标签1
          </div>
          内容1
        </wv-tab>
        <wv-tab title="标签2">
          内容2
        </wv-tab>
        <wv-tab title="标签3">
          内容3
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
