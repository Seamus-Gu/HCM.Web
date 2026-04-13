<template>
  <div class="s-card-tabs">
    <el-tabs type="card" :stretch="true" v-bind="$attrs">
      <slot></slot>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'SCardTabs',
  props: {},
  setup() {
    return {}
  }
}
</script>
