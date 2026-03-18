<template>
  <div class="s-upload-button">
    <s-button class="button-container" @click="handleBtnClick">
      <input
        id="fileInput"
        :accept="accept"
        class="file-input"
        type="file"
        @change="upload"
      />
      <slot></slot>
    </s-button>
  </div>
</template>
<script>
export default {
  name: 'SUploadBtn',
  props: {
    accept: {
      type: String,
      default: '.xlsx,.xls'
    }
  },
  setup(props, context) {
    const fileInputRef = ref()
    const methods = reactive({
      handleBtnClick: () => {
        document.getElementById('fileInput').click()
      },
      upload: async data => {
        let file = data.target.files[0]
        await context.emit('upload', file)
        document.getElementById('fileInput').value = ''
      }
    })
    return {
      fileInputRef,
      ...toRefs(methods)
    }
  }
}
</script>
