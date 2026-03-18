<template>
  <div
    class="sider-title cursor-pointer"
    :class="{ 'sider-title-collapse': collapse }"
  >
    <transition name="sider-fade">
      <template v-if="!collapse">
        <el-row align="middle" justify="center" style="height: 100%">
          <img class="logo" src="~@/assets/images/Vue.png" alt="" />
          <div class="content">
            <span style="color: #57caeb">Vue</span>管理系统
          </div>
        </el-row>
      </template>
      <template v-else>
        <el-row align="middle" justify="center" style="height: 100%">
          <img class="logo" src="~@/assets/images/Vue.png" alt="" />
        </el-row>
      </template>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SideBarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: false
    }
  },
  setup() {
    const router = useRouter()

    const methods = reactive({
      returnHome: () => {
        router.push({ path: '/' })
      }
    })
    return {
      ...toRefs(methods)
    }
  }
}
</script>
