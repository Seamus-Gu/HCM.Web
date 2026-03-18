<template>
  <div class="tab-menu-container">
    <s-dropdown
      ref="dropdown"
      @command="handleCommand"
      @visibleChange="visibleChange"
    >
      <span class="more-icon" :class="{ 'icon-hover': isIconHover }">
        <i class="box box-t"></i>
        <i class="box box-b"></i
      ></span>
      <template #dropdown>
        <s-dropdown-item command="0">
          <svg class="icon" ariel-hidden="true" font-size="12px">
            <use xlink:href="#icon-close" />
          </svg>
          &nbsp 关闭当前
        </s-dropdown-item>
        <s-dropdown-item command="1">
          <svg class="icon" ariel-hidden="true" font-size="14px">
            <use xlink:href="#icon-close-circle" />
          </svg>
          &nbsp 关闭其他
        </s-dropdown-item>
        <s-dropdown-item command="2">
          <svg class="icon" ariel-hidden="true" font-size="14px">
            <use xlink:href="#icon-close-circle" />
          </svg>
          &nbsp 全部关闭
        </s-dropdown-item>
      </template>
    </s-dropdown>
  </div>
</template>

<script>
export default {
  components: {},
  setup(props, context) {
    const isIconHover = ref(false)

    const methods = reactive({
      handleCommand: command => {
        context.emit('command', command)
      },
      visibleChange: val => {
        if (val) {
          isIconHover.value = true
        } else {
          isIconHover.value = false
        }
      }
    })

    return {
      isIconHover,
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-menu-container {
  padding-top: 8px;
  .more-icon {
    display: inline-block;
    color: #9a9a9a;
    cursor: pointer;
    transition: transform 0.3s ease-out;
    outline: none;
    .box {
      position: relative;
      display: block;
      width: 18px;
      height: 10px;
    }
    .box:before {
      position: absolute;
      top: 2px;
      left: 0;
      width: 8px;
      height: 8px;
      content: '';
      background: #9a9a9a;
    }
    .box:after {
      position: absolute;
      top: 2px;
      left: 10px;
      width: 8px;
      height: 8px;
      content: '';
      background: #9a9a9a;
    }
  }

  .icon-hover,
  .more-icon:hover {
    transform: rotate(90deg);
    .box:before,
    .box:after {
      background-color: var(--color-primary-core);
    }
    .box-t:before {
      transform: rotate(45deg);
    }
  }

  .box-t:before {
    transition: transform 0.3s ease-out 0.3s;
  }
}
</style>
