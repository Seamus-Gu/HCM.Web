<template>
  <button aria-disabled="false" type="button" :class="buttonClass">
    <template v-if="loading">
      <svg class="icon is-loading" ariel-hidden="true">
        <use xlink:href="#icon-loading" />
      </svg>
    </template>
    <template v-else>
      <slot name="icon"> </slot>
    </template>
    <span :class="buttonContentClass">
      <slot></slot>
    </span>
    <slot name="append"> </slot>
  </button>
</template>
<script>
import { isValidComponentSize } from '@/utils/validate'
export default {
  name: 'SButton',
  props: {
    type: {
      type: String
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: isValidComponentSize
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  setup(props, context) {
    const buttonClass = computed(() => [
      's-button',
      props.circle && 'is-circle',
      props.disabled && 'is-disabled',
      props.link && 'is-link',
      props.type && 'color-button',
      props.loading && 'is-loading',
      props.type && `s-button--${props.type}`,
      props.size && `s-button--${props.size}`
    ])

    const buttonContentClass = ref({
      prepend: context.slots.icon,
      append: context.slots.append
    })

    return {
      buttonClass,
      buttonContentClass
    }
  }
}
</script>
