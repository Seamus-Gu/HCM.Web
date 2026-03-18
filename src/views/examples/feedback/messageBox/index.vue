<template>
  <div class="example-button-container">
    <s-panel title="消息弹框" style="margin-bottom: 8px">
      <s-row
        >模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息。
      </s-row>
      <s-row>
        <s-button type="primary" @click="handleDelete">删除 </s-button>
        <s-button type="primary" @click="handleConfirm">确认 </s-button>
      </s-row>
    </s-panel>
  </div>
</template>

<script>
export default {
  setup() {
    const { proxy } = getCurrentInstance()

    const methods = reactive({
      handleDelete: () => {
        proxy.$modal.delete({
          content: '是否确认删除',
          success: () => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve()
              }, 3000)
            })
          }
        })
      },
      handleConfirm: () => {
        proxy.$modal.confirm({
          content: '是否确认',
          success: () => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve()
              }, 3000)
            })
          }
        })
      }
    })
    return {
      ...toRefs(methods)
    }
  }
}
</script>
