<template>
  <div class="s-tabs">
    <el-tabs v-bind="$attrs">
      <slot></slot>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'STabs',
  props: {},
  setup() {
    return {}
  }
}
</script>
