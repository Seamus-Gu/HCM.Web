<template>
  <div class="s-steps">
    <el-steps v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: 'SSteps',
  props: {},
  setup() {
    return {}
  }
}
</script>
