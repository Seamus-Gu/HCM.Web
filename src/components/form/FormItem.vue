<template>
  <el-form-item
    v-bind="$attrs"
    :label="label"
    :prop="name"
    :label-width="labelWidth"
  >
    <template v-for="(_, name) in $slots" #[name]="scopedData">
      <slot :name="name" v-bind="scopedData"></slot>
    </template>
  </el-form-item>
</template>
<script>
export default {
  name: 'SFormItem',
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    },
    labelWidth: {
      type: [String, Number]
    }
  },
  components: {},
  setup(props) {
    return {}
  }
}
</script>
