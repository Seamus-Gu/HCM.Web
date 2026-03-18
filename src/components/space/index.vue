<template>
  <div class="s-space">
    <el-space v-bind="$attrs">
      <slot></slot>
    </el-space>
  </div>
</template>

<script>
export default {
  name: 'SSpace',
  props: {},
  setup() {
    return {}
  }
}
</script>
