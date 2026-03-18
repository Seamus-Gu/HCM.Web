<template>
  <div :class="rowClass" :style="rowStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'SRow',
  props: {
    gutter: {
      type: Number
    },
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    },
    hasMarginBottom: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const rowClass = ref([
      's-row',
      !props.hasMarginBottom && 's-row-no-bottom',
      props.justify !== 'start' ? `is-justify-${props.justify}` : '',
      props.align !== 'top' ? `is-align-${props.align}` : ''
    ])

    const rowStyle = ref({})

    if (props.gutter) {
      let marginVal = `-${props.gutter / 2}px`
      rowStyle.value['margin-left'] = marginVal
      rowStyle.value['margin-right'] = marginVal
    }

    return {
      rowClass,
      rowStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.s-row {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.s-row:after,
.s-row:before {
  display: table;
  content: '';
}
.s-row:after {
  clear: both;
}

.s-row-no-bottom {
  margin-bottom: 0;
}
.s-row:last-child {
  margin-bottom: 0;
}

.is-justify-center {
  justify-content: center;
}
.is-justify-end {
  justify-content: flex-end;
}
.is-justify-space-between {
  justify-content: space-between;
}
.isz-justify-space-around {
  justify-content: space-around;
}
.is-align-middle {
  align-items: center;
}
.is-align-bottom {
  align-items: flex-end;
}
</style>
