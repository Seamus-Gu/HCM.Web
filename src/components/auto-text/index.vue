<template>
  <el-tooltip
    class="s-auto-text"
    v-bind="$attrs"
    :content="contont"
    :disabled="isShow"
  >
    <span
      ref="contontRef"
      class="s-auto-text-contont"
      @mouseover="handleShowToolTip"
    >
      {{ contont }}
    </span>
  </el-tooltip>
</template>

<script>
export default {
  name: 'SAutoText',
  props: {
    contont: {
      type: String
    }
  },
  setup() {
    const isShow = ref(false)
    const contontRef = ref()

    const handleShowToolTip = () => {
      const isShowToolTip =
        contontRef.value.clientWidth < contontRef.value.scrollWidth
      isShow.value = !isShowToolTip
    }
    return {
      isShow,
      contontRef,
      handleShowToolTip
    }
  }
}
</script>
<style>
.s-auto-text-contont {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
