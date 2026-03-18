<template>
  <div class="s-switch">
    <el-switch v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-switch>
  </div>
</template>

<script>
export default {
  name: 'SSwitch',
  props: {},
  setup() {
    return {}
  }
}
</script>
