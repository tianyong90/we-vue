<template>
  <div class="page">
    <wv-group title="默认">
      <wv-input label="label" placeholder="请输入内容" v-model="valueText"></wv-input>
      <wv-input label="label" placeholder="请输入数字" type="number" v-model="valueNumber"></wv-input>
    </wv-group>

    <wv-group title="带验证">
      <wv-input label="请输入 abc" placeholder="请输入 abc" v-model="valueText" pattern="^abc$"></wv-input>
      <wv-input label="必填" placeholder="请输入数字" type="number" v-model="valueNumber" required></wv-input>
    </wv-group>

    <wv-group title="只读">
      <wv-input label="label" placeholder="请输入内容" :readonly="true" v-model="valueReadonly"></wv-input>
    </wv-group>

    <wv-group title="自定义标签宽度">
      <wv-input label="这是一个比较长的标签" :labelWidth="190" placeholder="请输入内容" v-model="valueText"></wv-input>
    </wv-group>

    <wv-group title="无标签">
      <wv-input placeholder="请输入内容" v-model="valueText"></wv-input>
    </wv-group>

    <wv-group title="缝合示例">
      <wv-input label="短信验证码" placeholder="请输入验证码" v-model="captcha">
        <button class="weui-vcode-btn" slot="ft">获取验证码</button >
      </wv-input>
      <wv-input label="验证码" class="weui-cell_vcode" placeholder="请输入验证码" v-model="vcode">
        <img :src="vcodeImage" class="vcode" slot="ft"/>
      </wv-input>
    </wv-group>
  </div>
</template>

<script type="text/babel">
import vcodeImage from '../assets/images/vcode.jpg'

export default {
  data () {
    return {
      valueText: 'hello we-vue',
      valueNumber: '',
      valueReadonly: '内容是只读的',
      captcha: '',
      vcode: '',
      vcodeImage
    }
  }
}
</script>
