<template>
  <div class="s-input" :style="style">
    <el-input v-bind="$attrs" :placeholder="placeholder || '请输入' + label">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SInput',
  props: {
    label: {
      type: String,
      default: '...'
    },
    placeholder: {
      type: String
    },
    style: {
      type:String
    }
  },
  setup() {
    return {}
  }
}
</script>
