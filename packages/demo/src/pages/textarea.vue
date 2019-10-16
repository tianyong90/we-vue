<template>
  <div>
    <w-group>
      <w-textarea
        placeholder="请输入文本"
        :rows="1"
        :show-counter="false"
        v-model="content1"
      />
    </w-group>

    <w-group>
      <w-textarea
        placeholder="请输入文本"
        :rows="3"
        v-model="content2"
        :max-length="5"
      />
    </w-group>

    <w-group title="标题">
      <w-textarea
        placeholder="请输入文本"
        :rows="6"
        v-model="content1"
      />
    </w-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content1: '',
      content2: 'hello',
    }
  },
}
</script>
