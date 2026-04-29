<template>
  <div class="s-date-picker">
    <el-date-picker
      v-bind="$attrs"
      :placeholder="placeholder || '请选择日期'"
      :start-placeholder="startPlaceholder || '请选择起始日期'"
      :end-placeholder="endPlaceholder || '请选择结束日期'"
      :valueFormat="valueFormat"
    >
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'SDatePicker',
  props: {
    placeholder: {
      type: String
    },
    startPlaceholder: {
      type: String
    },
    endPlaceholder: {
      type: String
    },
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    label: {
      type: String
    }
  },
  setup() {
    return {}
  }
}
</script>
