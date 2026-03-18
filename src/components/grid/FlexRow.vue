<template>
  <el-row v-bind="$attrs">
    <slot></slot>
  </el-row>
</template>

<script>
export default {
  name: 'SFlexRow',
  props: {},
  setup() {
    return {}
  }
}
</script>
