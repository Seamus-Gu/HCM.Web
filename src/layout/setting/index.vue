<template>
  <div class="setting-container">
    <el-drawer
      class="setting-drawer"
      title="主题配置"
      :size="256"
      :modelValue="visible"
      @closed="handleCloseSetting"
    >
      <div class="theme-setting-container">
        <s-row>
          <h3>主题风格设置</h3>
        </s-row>
        <s-row align="middle">
          <s-col :span="8">
            <span>主题颜色</span>
          </s-col>
          <s-col :offset="12" :span="4" id="theme-color-picker">
            <el-dropdown ref="colorDropdownRef" trigger="click">
              <div
                class="theme-color-selsct cursor-pointer"
                @click="showColorPicker"
              >
                <div
                  class="theme-color-content"
                  :style="{ background: getThemeColor(theme) }"
                ></div>
              </div>
              <template #dropdown>
                <ColorSelect @changeColor="handleTheme"> </ColorSelect>
              </template>
            </el-dropdown>
          </s-col>
        </s-row>
        <s-row align="middle">
          <s-col :span="8">
            <span>暗黑模式</span>
          </s-col>
          <s-col :offset="11" :span="4">
            <s-switch v-model="isDark" />
          </s-col>
        </s-row>
      </div>
      <s-divider />
      <div>
        <s-row>
          <h3>系统布局设置</h3>
        </s-row>
        <s-row align="middle">
          <s-col :span="8">
            <span>标签</span>
          </s-col>
          <s-col :offset="11" :span="4">
            <s-switch v-model="showTabView" />
          </s-col>
        </s-row>
        <s-row align="middle">
          <s-col :span="8">
            <span>头部固定</span>
          </s-col>
          <s-col :offset="11" :span="4">
            <s-switch v-model="affixHeader" />
          </s-col>
        </s-row>
      </div>
      <s-divider />
      <div>
        <s-row align="middle">
          <h3>顶部按钮</h3>
        </s-row>
        <s-row align="middle">
          <s-col :span="8">
            <span>搜索</span>
          </s-col>
          <s-col :offset="11" :span="4">
            <s-switch v-model="searchSwitch" />
          </s-col>
        </s-row>
        <s-row align="middle">
          <s-col :span="8">
            <span>主题</span>
          </s-col>
          <s-col :offset="11" :span="4">
            <s-switch v-model="themeSwitch" />
          </s-col>
        </s-row>
        <s-row align="middle">
          <s-col :span="8">
            <span>通知</span>
          </s-col>
          <s-col :offset="11" :span="4">
            <s-switch v-model="noticeSwitch" />
          </s-col>
        </s-row>
        <s-row>
          <s-col :span="8">
            <span>全屏</span>
          </s-col>
          <s-col :offset="11" :span="4">
            <s-switch v-model="fullSwitch" />
          </s-col>
        </s-row>
      </div>
      <s-divider />
      <s-row>
        <s-col :span="12" style="padding-left: 8px">
          <s-button type="primary" @click="savaSettings">保存配置</s-button>
        </s-col>
        <s-col :span="12" style="padding-left: 8px">
          <s-button type="primary" @click="resetSettings">重置配置</s-button>
        </s-col>
      </s-row>
    </el-drawer>
  </div>
</template>
<script>
import ColorSelect from './ColorSelect.vue'

import { getThemeColor } from '@/utils/theme'
import { setSettings } from '@/utils/local-storage'

import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

export default {
  components: {
    ColorSelect
  },
  setup() {
    const settingsStore = useSettingsStore()
    const permissionStore = usePermissionStore()

    const colorDropdownRef = ref(null)

    const visible = computed(() => settingsStore.visible)

    const theme = computed(() => settingsStore.theme)
    const isDark = computed({
      get: () => settingsStore.isDark,
      set: () => {
        settingsStore.toggleIsDark()
      }
    })

    const switchData = reactive({
      showTabView: computed({
        get: () => settingsStore.showTabView,
        set: () => {
          settingsStore.toggleTabView()
        }
      }),
      affixHeader: computed({
        get: () => settingsStore.affixHeader,
        set: () => {
          settingsStore.toggleAffixHeader()
        }
      }),
      searchSwitch: computed({
        get: () => settingsStore.searchSwitch,
        set: () => {
          settingsStore.toggleSearchSwitch()
        }
      }),
      themeSwitch: computed({
        get: () => settingsStore.themeSwitch,
        set: () => {
          settingsStore.toggleThemeSwitch()
        }
      }),
      noticeSwitch: computed({
        get: () => settingsStore.noticeSwitch,
        set: () => {
          settingsStore.togglenoticeSwitch()
        }
      }),
      fullSwitch: computed({
        get: () => settingsStore.fullSwitch,
        set: () => {
          settingsStore.toggleFullSwitch()
        }
      })
    })

    const methods = reactive({
      handleCloseSetting: () => {
        settingsStore.setVisible(false)
      },
      handleTheme: val => {
        settingsStore.setTheme(val)
        colorDropdownRef.value.handleClose()
      },
      savaSettings: async () => {
        let settings = {
          theme: theme.value,
          isDark: isDark.value,
          showTabView: switchData.showTabView,
          affixHeader: switchData.affixHeader,
          searchSwitch: switchData.searchSwitch,
          themeSwitch: switchData.themeSwitch,
          noticeSwitch: switchData.noticeSwitch,
          fullSwitch: switchData.fullSwitch
        }
        setSettings(JSON.stringify(settings))
        settingsStore.setVisible(false)
      },
      resetSettings: () => {
        let setting = {
          theme: 'light',
          themeColor: '#1890FF',
          showTabView: true,
          showSideBar: true,
          affixHeader: true,
          searchSwitch: true,
          themeSwitch: true,
          noticeSwitch: true,
          fullSwitch: true
        }
        settingsStore.setVisible(false)
      }
    })

    return {
      visible,
      theme,

      colorDropdownRef,
      getThemeColor,
      isDark,
      ...toRefs(switchData),
      ...toRefs(methods)
    }
  }
}
</script>
