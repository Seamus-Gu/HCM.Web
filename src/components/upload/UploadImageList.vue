<template>
  <div class="s-upload-image">
    <s-panel>
      <el-upload
        v-bind="$attrs"
        v-model:file-list="fileList"
        action="/api/oss/minio-upload"
        :list-type="listType"
        :headers="headers"
        :drag="true"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
      >
        <svg class="icon expend-icon" ariel-hidden="true" font-size="60px">
          <use xlink:href="#icon-plus" />
        </svg>
      </el-upload>
    </s-panel>
    <el-dialog v-model="imageVisible" title="图片详情" :fullscreen="true">
      <img style="width: 100%" w-full :src="dialogImageUrl" :alt="previewAlt" />
    </el-dialog>
  </div>
</template>
<script>
import lodash from 'lodash'
import { getToken } from '@/utils/session-storage'

export default {
  name: 'SUploadImageList',
  props: {
    modelValue: {
      type: Array
    },
    listType: {
      type: String,
      default: 'picture'
    }
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance()
    const uploadData = reactive({
      headers: {
        Authorization: 'Bearer' + getToken()
      },
      fileList: [],
      imageVisible: false,
      dialogImageUrl: ''
    })

    const methods = reactive({
      handlePreview: uploadFile => {
        uploadData.dialogImageUrl = uploadFile.url
        uploadData.imageVisible = true
      },
      handleSuccess: (response, uploadFile) => {
        const list = props.modelValue ?? []
        list.push(response.data)
        context.emit('update:modelValue', list)
      },
      handleRemove: uploadFile => {
        const uploadId = uploadFile.id ?? uploadFile.response.data.id
        const result = props.modelValue.filter(t => {
          if (t.id == uploadId) {
            t.serviceId = 0
          }

          return true
        })
        context.emit('update:modelValue', result)
      },
      handleError: (err, uploadFile) => {
        var errJson = JSON.parse(err.message)
        proxy.$msg.error(errJson.message)
      }
    })

    uploadData.fileList = lodash.cloneDeep(props.modelValue)

    return {
      ...toRefs(uploadData),
      ...toRefs(methods)
    }
  }
}
</script>
