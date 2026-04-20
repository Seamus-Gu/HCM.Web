<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useI18n } from 'vue-i18n'

import { useWindowSize } from '@vueuse/core'

import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { locale: currentLocale } = useI18n()

const { width } = useWindowSize()

const elementLocales = {
  'zh-CN': zhCn,
  'en-US': en
}

const locale = computed(() => elementLocales[currentLocale.value] || zhCn)

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

appStore.initLanguage()
settingsStore.initSetting()
</script>

<style lang="scss">
@use '@/styles/index.scss' as *;
</style>
