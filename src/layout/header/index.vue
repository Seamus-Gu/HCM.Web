<template>
  <div
    class="layout-header"
    :class="{ 'header-fixed': isHeaderFixed }"
    :style="{ position: affixHeader ? 'sticky' : 'relative' }"
    ref="headerRef"
  >
    <el-row justify="space-between" align="middle">
      <el-col :span="16">
        <el-row>
          <Hamburger
            class="header-item cursor-pointer"
            :isActive="isActive"
            @click="toggleSideBar"
          ></Hamburger>
          <Breadcrumb v-if="size != 'sm'"></Breadcrumb>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row justify="end">
          <el-space size="default">
            <div v-if="searchSwitch" class="header-item cursor-pointer">
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use xlink:href="#icon-search" />
              </svg>
            </div>
            <div
              v-if="themeSwitch"
              class="header-item cursor-pointer"
              @click="showSetting"
            >
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use xlink:href="#icon-theme" />
              </svg>
            </div>
            <div v-if="noticeSwitch" class="header-item cursor-pointer">
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use xlink:href="#icon-remind" />
              </svg>
            </div>
            <ScreenFull
              v-if="fullSwitch"
              class="header-item cursor-pointer"
              fontSize="20px"
            ></ScreenFull>
            <Avatar></Avatar>
          </el-space>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import Avatar from './Avatar.vue'

import ScreenFull from '@/components/screenFull'

import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'

export default {
  components: {
    ScreenFull,
    Avatar,
    Hamburger,
    Breadcrumb
  },
  setup() {
    const appStore = useAppStore()
    const settingsStore = useSettingsStore()

    const headerRef = ref(null)
    const isHeaderFixed = ref(true)

    const headerData = reactive({
      isActive: computed(() => !appStore.collapse),
      size: computed(() => appStore.size)
    })

    const affixHeader = computed(() => settingsStore.affixHeader)
    const searchSwitch = computed(() => settingsStore.searchSwitch)
    const themeSwitch = computed(() => settingsStore.themeSwitch)
    const noticeSwitch = computed(() => settingsStore.noticeSwitch)
    const fullSwitch = computed(() => settingsStore.fullSwitch)

    const methods = reactive({
      toggleSideBar: () => {
        appStore.toggleSideBar()
      },
      showSetting: () => {
        settingsStore.setVisible(true)
      }
    })

    const handleScroll = () => {
      const div = headerRef.value
      if (div) {
        if (div.offsetTop == 16) {
          isHeaderFixed.value = true
        } else {
          isHeaderFixed.value = false
        }
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, true)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, true)
    })

    return {
      headerRef,
      isHeaderFixed,
      affixHeader,
      searchSwitch,
      themeSwitch,
      noticeSwitch,
      fullSwitch,
      ...toRefs(headerData),
      ...toRefs(methods)
    }
  }
}
</script>
