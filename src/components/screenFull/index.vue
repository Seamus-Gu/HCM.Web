<template>
  <div class="screen-full">
    <svg class="icon" ariel-hidden="true" :font-size="fontSize" @click="toggle">
      <use xlink:href="#icon-fullscreen" />
    </svg>
  </div>
</template>

<script>
import { useFullscreen } from '@vueuse/core'

export default {
  name: 'ScreenFull',
  props: {
    fontSize: {
      type: String,
      default: '16px'
    }
  },
  setup(props) {
    const { toggle } = useFullscreen()

    return {
      toggle
    }
  }
}
</script>
