<template>
  <div class="user-avatar" @click="editCropper()">
    <el-avatar :src="avatar" :size="128"> 上传头像</el-avatar>
    <s-dialog
      v-model="visible"
      title="修改头像"
      width="720px"
      @cancel="cancel"
      @confirm="updateAvatar"
    >
      <s-row :gutter="8">
        <s-col :span="14" height="100%">
          <s-panel height="100%" :body-style="{ height: 'calc(100% - 40px)' }">
            <vueCropper
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
        </s-col>
        <s-col :span="10">
          <s-panel>
            <div class="avatar-upload-preview">
              <div class="preview-image">
                <img
                  :src="options.previews.url"
                  :style="options.previews.img"
                />
              </div>
            </div>
          </s-panel>
          <s-panel style="margin-top: 8px">
            <div class="avatar-img-preview">
              <div class="preview-image">
                <img
                  :src="options.previews.url"
                  :style="options.previews.img"
                />
              </div>
            </div>
          </s-panel>
        </s-col>
      </s-row>
      <s-row>
        <s-col :span="24">
          <s-panel>
            <el-space>
              <s-upload-btn width="80px" @upload="upload" accept="image/*">
                <svg class="icon" ariel-hidden="true" font-size="20px">
                  <use xlink:href="#icon-cloud-upload" />
                </svg>
              </s-upload-btn>
              <s-button style="width: 60px" @click="changeScale(1)">
                <svg class="icon" ariel-hidden="true" font-size="20px">
                  <use xlink:href="#icon-plus" />
                </svg>
              </s-button>
              <s-button style="width: 60px" @click="changeScale(-1)">
                <svg class="icon" ariel-hidden="true" font-size="20px">
                  <use xlink:href="#icon-minus" />
                </svg>
              </s-button>
              <s-button style="width: 60px" @click="turnLeft">
                <svg class="icon" ariel-hidden="true" font-size="20px">
                  <use xlink:href="#icon-rotation-left" />
                </svg>
              </s-button>
              <s-button style="width: 60px" @click="turnRight">
                <svg class="icon" ariel-hidden="true" font-size="20px">
                  <use xlink:href="#icon-rotation-right" />
                </svg>
              </s-button>
            </el-space>
          </s-panel>
        </s-col>
      </s-row>
    </s-dialog>
  </div>
</template>

<script>
import { uploadAvatar } from '@/api/core/profile'
import useUserStore from '@/store/modules/user'

export default {
  setup() {
    const userStore = useUserStore()
    const { proxy } = getCurrentInstance()
    const avatar = computed(() => userStore.avatar)

    const avatarData = reactive({
      visible: false,
      cropperRef: undefined
    })

    const options = reactive({
      img: avatar.value, // 裁剪图片的地址
      autoCrop: true, // 是否默认生成截图框
      autoCropWidth: 200, // 默认生成截图框宽度
      autoCropHeight: 200, // 默认生成截图框高度
      fixedBox: true, // 固定截图框大小 不允许改变
      previews: {} //预览数据
    })

    const methods = reactive({
      editCropper: () => {
        avatarData.visible = true
      },
      cancel: () => {
        avatarData.visible = false
      },
      realTime: data => {
        options.previews = data
      },
      upload: file => {
        if (file.type.indexOf('image/') == -1) {
          proxy.$msg.error(
            '文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。'
          )
        } else {
          const reader = new FileReader()

          reader.readAsDataURL(file)
          reader.onload = () => {
            options.img = reader.result
          }
        }
      },
      changeScale: num => {
        avatarData.cropperRef.changeScale(num)
      },
      turnLeft: () => {
        avatarData.cropperRef.rotateLeft()
      },
      turnRight: () => {
        avatarData.cropperRef.rotateRight()
      },
      updateAvatar: () => {
        avatarData.cropperRef.getCropBlob(data => {
          let formData = new FormData()
          formData.append('avatarFile', data)
          uploadAvatar(formData).then(res => {
            options.img = res.data.imgUrl
            userStore.updateAvatar(options.img)
            avatarData.visible = false
          })
        })
      }
    })
    return {
      avatar,
      options,
      ...toRefs(avatarData),
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-avatar {
  position: relative;
  display: inline-block;
}

.user-avatar:hover:after {
  content: '+';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(119, 118, 118, 0.5);
  font-size: 50px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  cursor: pointer;
  line-height: 115px;
  border-radius: 50%;
}

.avatar-upload-preview {
  width: 100%;
  @include flex-center;
  .preview-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: $shadow_2;
    overflow: hidden;
  }
}

.avatar-img-preview {
  width: 100%;
  @include flex-center;
  .preview-image {
    width: 200px;
    height: 200px;
    box-shadow: $shadow_2;
    overflow: hidden;
  }
}
</style>
