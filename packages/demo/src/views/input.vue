<template>
  <div class="page">
    <w-group title="默认">
      <w-input
        label="默认类型"
        :autofocus="true"
        placeholder="请输入内容"
        v-model="valueText"
        ref="firstInput"
      />
      <w-input
        label="数字类型"
        placeholder="请输入数字"
        type="number"
        v-model="valueNumber"
      />
    </w-group>

    <w-group title="限制长度">
      <w-input
        label="最大长度10"
        placeholder="请输入内容"
        type="number"
        :maxlength="10"
        v-model="maxlengthValue"
      />
      <w-input
        label="最小长度4"
        placeholder="请输入内容"
        :minlength="4"
        v-model="minlengthValue"
      />
    </w-group>

    <w-group title="带验证">
      <w-input
        label="请输入 abc"
        placeholder="请输入 abc"
        v-model="valueText"
        pattern="^abc$"
        :validate-mode="{onFocus: false}"
      />
      <w-input
        label="必填字段"
        placeholder="请输入内容"
        v-model="valueRequired"
        required
      />
      <w-input
        label="失焦时验证"
        placeholder="请输入内容"
        v-model="valueOnBlur"
        required
        :validate-mode="{onFocus: false, onBlur: true, onChange: false}"
      />
    </w-group>

    <w-group title="只读">
      <w-input
        label="只读内容"
        placeholder="请输入内容"
        :readonly="true"
        v-model="valueReadonly"
      />
    </w-group>

    <w-group title="自定义标签宽度">
      <w-input
        label="这是一个比较长的标签"
        :label-width="190"
        placeholder="请输入内容"
        v-model="valueText"
      />
    </w-group>

    <w-group title="无标签">
      <w-input placeholder="请输入内容" v-model="valueText"/>
    </w-group>

    <w-group title="综合示例">
      <w-input
        label="短信验证码"
        placeholder="请输入验证码"
        v-model="captcha"
      >
        <button class="weui-vcode-btn" slot="ft">获取验证码</button>
      </w-input>
      <w-input
        label="验证码"
        class="weui-cell_vcode"
        placeholder="请输入验证码"
        v-model="vcode"
      >
        <img :src="vcodeImage" class="vcode" slot="ft">
      </w-input>
    </w-group>
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
      vcodeImage,
    }
  },

  mounted () {},
}
</script>
