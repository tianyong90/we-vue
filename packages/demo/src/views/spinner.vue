<template>
  <div>
    <w-group title="默认示例">
      <w-cell :title="type" v-for="type in types" :key="type">
        <w-spinner :type="type" slot="ft" />
      </w-cell>
    </w-group>

    <w-group title="指定大小(24px)">
      <w-cell
        :title="type"
        v-for="type in typesExceptDefault"
        :key="type"
      >
        <w-spinner :type="type" :size="24" slot="ft" />
      </w-cell>
    </w-group>

    <w-group title="指定颜色(red)">
      <w-cell
        :title="type"
        v-for="type in typesExceptDefault"
        :key="type"
      >
        <w-spinner :type="type" color="red" slot="ft" />
      </w-cell>
    </w-group>
  </div>
</template>

<script>
const SPINNER_TYPES = [
  'default',
  'snake',
  'double-snake',
  'dot-circle',
  'bar-circle',
]

export default {
  data () {
    return {
      types: SPINNER_TYPES,
    }
  },

  computed: {
    typesExceptDefault () {
      return this.types.filter(type => type !== 'default')
    },
  },
}
</script>
