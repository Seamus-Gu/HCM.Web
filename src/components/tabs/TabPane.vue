<template>
  <div class="s-tab-pane">
    <el-tab-pane v-bind="$attrs">
      <slot></slot>
    </el-tab-pane>
  </div>
</template>

<script>
export default {
  name: 'STabPane',
  props: {},
  setup() {
    return {}
  }
}
</script>
