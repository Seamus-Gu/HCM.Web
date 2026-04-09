<template>
  <el-card
    :style="{
      width: width,
      height: height
    }"
    :body-style="{
      overflowY: scrollY ? 'auto' : 'hidden',
      overflowX: scrollX ? 'auto' : 'hidden'
    }"
    body-class="card-body"
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
      default: true
    },
    scrollY: {
      type: Boolean,
      default: true
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
