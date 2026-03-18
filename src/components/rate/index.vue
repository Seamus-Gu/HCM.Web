<template>
  <div class="s-rate">
    <el-input v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SRate',
  props: {},
  setup() {
    return {}
  }
}
</script>
