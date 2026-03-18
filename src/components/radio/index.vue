<template>
  <div class="s-radio">
    <el-radio-group v-bind="$attrs">
      <template v-for="item in options">
        <el-radio :value="item.value" :label="item.value" :size="size">{{
          item.label
        }}</el-radio>
      </template>
    </el-radio-group>
  </div>
</template>

<script>
import { isValidComponentSize } from '@/utils/validate'
export default {
  name: 'SRadio',
  props: {
    options: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      validator: isValidComponentSize
    }
  },
  setup() {
    return {}
  }
}
</script>
