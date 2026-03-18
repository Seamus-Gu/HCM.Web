<template>
  <div class="humburger">
    <svg
      class="icon"
      ariel-hidden="true"
      font-size="20px"
      :style="{ transform: isActive ? 'none' : 'rotateY(180deg)' }"
    >
      <use xlink:href="#icon-shrink" />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  setup() {
    return {}
  }
}
</script>
