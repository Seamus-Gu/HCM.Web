<template>
  <div class="s-result">
    <el-result v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
  name: 'SResult',
  props: {},
  setup() {
    return {}
  }
}
</script>
