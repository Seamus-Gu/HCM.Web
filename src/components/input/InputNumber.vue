<template>
  <div class="s-input-number">
    <el-input-number
      v-bind="$attrs"
      :placeholder="placeholder || '请输入' + label"
    >
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-input-number>
  </div>
</template>

<script>
export default {
  name: 'SInputNumber',
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
