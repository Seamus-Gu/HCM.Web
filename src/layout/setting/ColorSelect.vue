<template>
  <div class="color-select-container">
    <el-row>
      <el-col :span="24">
        <template v-for="item in colorList" :key="item">
          <el-space>
            <div class="color-select-grid cursor-pointer">
              <div
                class="color"
                :style="{ background: item.color }"
                @click="changeColor(item)"
              ></div>
            </div>
          </el-space>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { colorList } from '@/utils/theme'
export default {
  setup(props, context) {
    const methods = reactive({
      changeColor: val => {
        context.emit('changeColor', val)
      }
    })

    return {
      colorList,
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped>
.color-select-container {
  width: 188px;
  padding: 8px 16px 16px 16px;
  .color-select-grid {
    padding: 2px;
    border: solid 1px #d0d0d0;
    width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 4px;
    margin-top: 8px;
  }
  .color {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
</style>
