<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import { useWindowSize } from '@vueuse/core'

import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const { width } = useWindowSize()

const language = computed(() => appStore.collapse)
const locale = computed(() => (language.value === 'en-US' ? en : zhCn))

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

settingsStore.initSetting()
</script>

<style lang="scss">
@use '@/styles/index.scss' as *;
</style>
