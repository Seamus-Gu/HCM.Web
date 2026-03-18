<template>
  <div class="s-select">
    <el-select v-bind="$attrs" :placeholder="placeholder || '请选择' + label">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'SSelect',
  props: {
    label: {
      type: String,
      default: '...'
    },
    placeholder: {
      type: String
    },
    options: {
      type: Array,
      default: []
    },
    request: {
      type: Function
    }
  },
  setup(props) {
    return {}
  }
}
</script>
