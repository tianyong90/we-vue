<template>
  <div class="page">
    <wv-group title="默认">
      <wv-input
        label="默认类型"
        :autofocus="true"
        placeholder="请输入内容"
        v-model="valueText"
        ref="firstInput"
      />
      <wv-input
        label="数字类型"
        placeholder="请输入数字"
        type="number"
        v-model="valueNumber"
      />
    </wv-group>

    <wv-group title="限制长度">
      <wv-input
        label="最大长度10"
        placeholder="请输入内容"
        type="number"
        :maxlength="10"
        v-model="maxlengthValue"
      />
      <wv-input
        label="最小长度4"
        placeholder="请输入内容"
        :minlength="4"
        v-model="minlengthValue"
      />
    </wv-group>

    <wv-group title="带验证">
      <wv-input
        label="请输入 abc"
        placeholder="请输入 abc"
        v-model="valueText"
        pattern="^abc$"
        :validate-mode="{onFocus: false}"
      />
      <wv-input
        label="必填字段"
        placeholder="请输入内容"
        v-model="valueRequired"
        required
      />
      <wv-input
        label="失焦时验证"
        placeholder="请输入内容"
        v-model="valueOnBlur"
        required
        :validate-mode="{onFocus: false, onBlur: true, onChange: false}"
      />
    </wv-group>

    <wv-group title="只读">
      <wv-input
        label="只读内容"
        placeholder="请输入内容"
        :readonly="true"
        v-model="valueReadonly"
      />
    </wv-group>

    <wv-group title="自定义标签宽度">
      <wv-input
        label="这是一个比较长的标签"
        :label-width="190"
        placeholder="请输入内容"
        v-model="valueText"
      />
    </wv-group>

    <wv-group title="无标签">
      <wv-input placeholder="请输入内容" v-model="valueText"/>
    </wv-group>

    <wv-group title="综合示例">
      <wv-input
        label="短信验证码"
        placeholder="请输入验证码"
        v-model="captcha"
      >
        <button class="weui-vcode-btn" slot="ft">获取验证码</button>
      </wv-input>
      <wv-input
        label="验证码"
        class="weui-cell_vcode"
        placeholder="请输入验证码"
        v-model="vcode"
      >
        <img :src="vcodeImage" class="vcode" slot="ft">
      </wv-input>
    </wv-group>
  </div>
</template>

<script>
import vcodeImage from '../assets/images/vcode.jpg'

export default {
  data () {
    return {
      valueText: 'hello we-vue',
      valueNumber: '',
      maxlengthValue: '',
      minlengthValue: '',
      valueReadonly: '内容是只读的',
      valueRequired: '',
      valueOnBlur: '',
      captcha: '',
      vcode: '',
      vcodeImage
    }
  },

  mounted () {
  }
}
</script>
