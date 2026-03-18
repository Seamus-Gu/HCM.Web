<template>
  <div class="s-dropdown-item">
    <el-dropdown-item v-bind="$attrs">
      <slot></slot>
    </el-dropdown-item>
  </div>
</template>

<script>
export default {
  name: 'SDropdownItem',
  props: {},
  setup() {
    return {}
  }
}
</script>
