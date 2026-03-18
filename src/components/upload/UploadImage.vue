<template>
  <div class="s-upload-image">
    <s-panel>
      <el-upload
        v-bind="$attrs"
        v-model:file-list="fileList"
        :headers="headers"
        action="/api/oss/minio-upload"
        list-type="picture-card"
        class="image-contont"
        :class="{ hide: hideUpload }"
        :on-preview="handlePreview"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-change="handleEditChange"
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
import { getToken } from '@/utils/session-storage'

export default {
  name: 'SUploadImage',
  props: {
    modelValue: {
      type: Object
    },
    init: {
      type: String
    },
    previewAlt: {
      type: String,
      default: 'Preview Image'
    }
  },
  setup(props, context) {
    const uploadData = reactive({
      hideUpload: false,
      fileList: [],
      headers: {
        Authorization: 'Bearer' + getToken()
      },
      imageVisible: false,
      dialogImageUrl: ''
    })

    const methods = reactive({
      handlePreview: uploadFile => {
        uploadData.dialogImageUrl = uploadFile.url
        uploadData.imageVisible = true
      },
      handleSuccess: (response, uploadFile) => {
        context.emit('update:modelValue', response.data)
      },
      handleRemove: () => {
        uploadData.hideUpload = uploadData.fileList.length >= 1
      },
      handleEditChange: () => {
        uploadData.hideUpload = uploadData.fileList.length >= 1
      }
    })

    if (props.init && props.init != '') {
      uploadData.hideUpload = true
      uploadData.fileList = [
        {
          url: props.init
        }
      ]
    }

    watch(
      () => props.init,
      newVal => {
        if (newVal && newVal != '') {
          uploadData.hideUpload = true
          uploadData.fileList = [
            {
              url: newVal
            }
          ]
        } else {
          uploadData.hideUpload = false
          uploadData.fileList = []
        }
      }
    )

    return {
      ...toRefs(uploadData),
      ...toRefs(methods)
    }
  }
}
</script>
