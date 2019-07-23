<template>
  <div>
    <div class="demo-tabs-wrap">
      <div class="tips">基本示例</div>
      <w-tabs v-model="activeIndex">
        <w-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">自定义颜色（下划线式）</div>
      <w-tabs
        v-model="activeIndex"
        color="red"
        title-active-color="red"
        title-inactive-color="gray"
      >
        <w-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">自定义颜色（卡片式）</div>
      <w-tabs
        v-model="activeIndex"
        color="red"
        title-active-color="#fff"
        title-inactive-color="gray"
        type="card"
      >
        <w-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">可滚动</div>
      <w-tabs swipeable>
        <w-tab v-for="index in 6" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">Sticky</div>
      <w-tabs sticky>
        <w-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">禁用标签</div>
      <w-tabs @disabled="onClickDisabled">
        <w-tab v-for="index in 4" :key="index" :title="'标签 ' + index" :disabled="index === 2">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">卡片式标签</div>
      <w-tabs type="card">
        <w-tab v-for="index in 3" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">点击事件</div>
      <w-tabs @click="onClick">
        <w-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">滑动切换</div>
      <w-tabs :active="activeIndex" swipeable>
        <w-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>

    <div class="demo-tabs-wrap">
      <div class="tips">自定义标签</div>
      <w-tabs :active="activeIndex">
        <w-tab v-for="index in 3" :key="index" :title="'标签 ' + index">
          <div slot="title">
            <w-icon type="success-no-circle" /> 标签 {{ index }}
          </div>
          <div class="my-content">
            内容 {{ index }}
          </div>
        </w-tab>
      </w-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 1,
    }
  },

  methods: {
    onClickDisabled () {
      this.$toast.text('选项被禁用')
    },

    onClick (index) {
      this.$toast.text(`点击 ${index}`)
    },
  },
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

// 自定义标签里的图标样式
.weui-icon-success-no-circle {
  display: inline-block;
}
</style>
