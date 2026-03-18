<template>
  <div class="s-dialog">
    <el-dialog v-bind="$attrs" @close="handleClose">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
      <template v-if="!$slots.footer" #footer>
        <div class="dialog-footer">
          <s-button @click="handleClose">取消</s-button>
          <s-button
            type="primary"
            @click="handleConfirm"
            :loading="confirmLoading"
          >
            确认
          </s-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SDialog',
  emits: ['close', 'confirm'],
  props: {
    confirmLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const methods = reactive({
      handleClose: () => {
        context.emit('close')
      },
      handleConfirm: () => {
        context.emit('confirm')
      }
    })
    return {
      ...toRefs(methods)
    }
  }
}
</script>
