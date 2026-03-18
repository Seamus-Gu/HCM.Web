<template>
  <div class="s-dropdown">
    <el-dropdown v-bind="$attrs">
      <slot></slot>
      <template #dropdown>
        <el-dropdown-menu>
          <slot name="dropdown"></slot>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'SDropdown',
  props: {},
  setup() {
    return {}
  }
}
</script>
