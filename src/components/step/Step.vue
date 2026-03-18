<template>
  <el-step class="s-step" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="scopedData">
      <slot :name="name" v-bind="scopedData"></slot>
    </template>
  </el-step>
</template>

<script>
export default {
  name: 'SStep',
  props: {},
  setup() {
    return {}
  }
}
</script>
