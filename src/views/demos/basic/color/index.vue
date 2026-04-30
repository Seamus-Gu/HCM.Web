<template>
  <div class="example-color-container">
    <s-panel :class="{ 'background-dark': darkVal }">
      <s-row justify="center" align="middle">
        切换背景
        <s-switch v-model="darkVal" @change="changeTheme" />
      </s-row>
      <s-row style="margin-top: 16px" justify="center">
        <template v-for="item in colorList">
          <s-col :span="8" class="color-item">
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
          </s-col>
        </template>
      </s-row>
    </s-panel>
  </div>
</template>

<script setup>
import { primary, colorList } from '@/utils/theme'
import { generate } from '@/utils/color'

const darkVal = ref(false)
const dataVal = ref({})

function changeTheme() {
  colorList.forEach(element => {
    const colors = generate(element.color, darkVal.value)
    dataVal.value[element.name] = colors
  })
}

changeTheme()
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
