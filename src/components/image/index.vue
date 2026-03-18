<template>
  <div class="s-image" @click="handleImageClick">
    <el-image
      class="s-image-main"
      fit="contain"
      :src="image"
      :style="{ height: height, width: width }"
    >
      <template #error>
        <div class="s-image-error">
          {{ errorMsg }}
        </div>
      </template>
    </el-image>
  </div>
  <el-dialog
    v-model="visible"
    title="修改图片"
    width="800px"
    :align-center="true"
    @close="handleCancel"
  >
    <s-row :gutter="8">
      <s-col :span="24">
        <s-panel>
          <vueCropper
            style="height: 400px"
            ref="cropperRef"
            :info="true"
            outputType="png"
            :img="options.img"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
          />
        </s-panel>
        <s-panel>
          <el-space>
            <s-upload-btn
              v-if="visible"
              width="60px"
              @upload="upload"
              accept="image/*"
            >
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use xlink:href="#icon-cloud-upload" />
              </svg>
            </s-upload-btn>
            <s-button @click="changeScale(1)">
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use xlink:href="#icon-plus" />
              </svg>
            </s-button>
            <s-button @click="changeScale(-1)">
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use xlink:href="#icon-minus" />
              </svg>
            </s-button>
            <s-button @click="turnLeft">
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use xlink:href="#icon-rotation-left" />
              </svg>
            </s-button>
            <s-button @click="turnRight">
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use xlink:href="#icon-rotation-right" />
              </svg>
            </s-button>
          </el-space>
        </s-panel>
      </s-col>
    </s-row>
    <template #footer>
      <span class="dialog-footer">
        <s-button @click="handleCancel">取消</s-button>
        <s-button type="primary" :loading="submitLoading" @click="handleSubmit">
          确认
        </s-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'SImage',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String
    },
    errorMsg: {
      type: String,
      default: '暂无封面'
    },
    image: {
      type: String
    },
    cropWidth: {
      type: Number,
      default: 261
    },
    cropHeight: {
      type: Number,
      default: 348
    }
  },
  setup(props) {
    const imageData = reactive({
      visible: false,
      cropperRef: undefined
    })

    const options = reactive({
      img: undefined, // 裁剪图片的地址
      imageName: '',
      autoCrop: true, // 是否默认生成截图框
      autoCropWidth: props.cropWidth, // 默认生成截图框宽度
      autoCropHeight: props.cropHeight, // 默认生成截图框高度
      fixedBox: true, // 固定截图框大小 不允许改变
      previews: {} //预览数据
    })

    const methods = reactive({
      handleImageClick: () => {
        imageData.visible = true
      },
      handleCancel: () => {
        imageData.visible = false
      },
      turnLeft: () => {},
      turnRight: () => {}
    })

    return {
      options,
      ...toRefs(imageData),
      ...toRefs(methods)
    }
  }
}
</script>
