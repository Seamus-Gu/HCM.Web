<template>
  <div class="s-tooltip">
    <el-tooltip v-bind="$attrs" :content="content" :placement="placement">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-tooltip>
  </div>
</template>

<script>
import { isPlacement } from '@/utils/validate'
export default {
  name: 'STooltip',
  props: {
    content: {
      type: String
    },
    placement: {
      type: String,
      validator: isPlacement,
      default: 'bottom'
    }
  },
  setup() {
    return {}
  }
}
</script>
