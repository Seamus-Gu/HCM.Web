<template>
  <div class="s-tag">
    <el-tag v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'STag',
  props: {},
  setup() {
    return {}
  }
}
</script>
