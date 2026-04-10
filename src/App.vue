<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useWindowSize } from '@vueuse/core'

import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'

export default {
  setup() {
    const appStore = useAppStore()
    const settingsStore = useSettingsStore()

    const { width } = useWindowSize()

    watchEffect(() => {
      if (width.value > 1200) {
        appStore.setSize('lg')
        appStore.openSideBar()
      } else if (width.value < 992) {
        appStore.setSize('sm')
        appStore.closeSideBar()
      } else {
        appStore.setSize('md')
        appStore.closeSideBar()
      }
    })

    settingsStore.setLoginSetting()

    return {
      locale: zhCn
    }
  }
}
</script>

<style lang="scss">
@use '@/styles/index.scss' as *;
</style>
