<template>
  <div class="s-check-box">
    <el-checkbox v-bind="$attrs" :placeholder="placeholder || '请输入' + label">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-checkbox>
  </div>
</template>

<script>
export default {
  name: 'SCheckBox',
  props: {
    label: {
      type: String,
      default: '...'
    },
    placeholder: {
      type: String
    }
  },
  setup() {
    return {}
  }
}
</script>
