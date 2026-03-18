<template>
  <div class="s-upload-container">
    <s-panel>
      <el-upload
        :headers="headers"
        drag
        action="/api/oss/minio-upload"
        multiple
      >
        <svg class="icon expend-icon" ariel-hidden="true" font-size="60px">
          <use xlink:href="#icon-cloud-upload" />
        </svg>
        <div class="s-upload-text">拖动文件到此或<span> 点此上传 </span></div>
      </el-upload>
    </s-panel>
  </div>
</template>
<script>
import { getToken } from '@/utils/session-storage'

export default {
  name: 'SUpload',
  props: {},
  setup(props, context) {
    const headers = ref({
      Authorization: 'Bearer' + getToken()
    })

    const methods = reactive({})

    return {
      headers,
      ...toRefs(methods)
    }
  }
}
</script>
