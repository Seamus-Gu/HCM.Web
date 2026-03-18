<template>
  <div class="example-color-container">
    <el-card :class="{ 'background-dark': darkVal }">
      <el-row>
        <el-switch v-model="darkVal" @change="changeTheme" />
      </el-row>
      <el-row style="margin-top: 16px" justify="center">
        <template v-for="item in coreList">
          <el-col :span="8" class="color-item">
            <div class="color-palette">
              <div class="color-title">{{ item.title }}</div>
              <div
                class="color-primary"
                :style="{ background: primary[item.name] }"
              >
                {{ primary[item.name] }}
              </div>
              <div class="main-color">
                <div
                  v-for="(itemColor, index) in dataVal[item.name]"
                  class="main-color-item"
                  :style="{
                    background: itemColor,
                    color: index >= 5 ? '#ffffff' : '#000000'
                  }"
                >
                  {{ itemColor }}
                </div>
              </div>
            </div>
          </el-col>
        </template>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { coreList, primary, colorList, darkList } from '@/utils/theme'

export default {
  setup() {
    const darkVal = ref(false)
    const dataVal = ref(colorList)

    const methods = reactive({
      changeTheme: val => {
        if (val) {
          dataVal.value = darkList
        } else {
          dataVal.value = colorList
        }
      }
    })

    return {
      darkVal,
      coreList,
      primary,
      dataVal,
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scopped>
.color-item {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  .color-palette {
    width: 100%;
    display: inline-block;
    .color-title {
      margin: 0 0 24px;
      color: #5c6b77;
      font-weight: 500;
      font-size: 22px;
      text-align: center;
      text-transform: capitalize;
    }
    .color-primary {
      margin: 0 24px 16px 24px;
      padding-left: 24px;
      border-radius: 12px;
      color: #fff;
    }
    .main-color {
      .main-color-item {
        position: relative;
        height: 44px;
        margin: 0 24px;
        padding-left: 24px;
        font-size: 14px;
        font-family: Consolas, sans-serif;
        line-height: 44px;
        cursor: pointer;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
      }
    }
  }
}

.background-dark {
  background: #141414;
}
</style>
