<template>
  <el-card
    :style="{
      width: width,
      height: height,
      overflowY: scrollY ? 'auto' : 'none',
      overflowX: scrollX ? 'auto' : 'none'
    }"
    v-bind="$attrs"
  >
    <template #header t v-if="$slots.header || title">
      <slot v-if="$slots.header" name="header"></slot>
      <template v-else-if="title">
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
    </template>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: 'SPanel',
  props: {
    width: {
      type: String
    },
    height: {
      type: String
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },
  setup() {
    return {}
  }
}
</script>
