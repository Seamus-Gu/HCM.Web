<template>
  <div class="avatar cursor-pointer">
    <s-dropdown trigger="click" @command="handleCommand">
      <el-avatar :src="avatar"> {{ nickNameAvatar }} </el-avatar>
      <template #dropdown>
        <s-dropdown-item command="0"> 个人中心 </s-dropdown-item>
        <s-dropdown-item command="1"> 主题配置 </s-dropdown-item>
        <s-dropdown-item command="2" divided> 退出登录 </s-dropdown-item>
      </template>
    </s-dropdown>
  </div>
</template>
<script>
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'

export default {
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()

    const userStore = useUserStore()
    const settingsStore = useSettingsStore()

    const avatarData = reactive({
      avatar: computed(() => userStore.avatar),
      nickNameAvatar: 'zxc',
      // nickNameAvatar: computed(() => userStore.nickName).value.substring(0, 1),
      settingVisible: false
    })

    const methods = reactive({
      handleCommand: command => {
        if (command == '0') {
          router.push({ path: '/system/user/profile' })
        } else if (command == '1') {
          settingsStore.setVisible(true)
        } else {
          proxy.$modal.confirm({
            content: '确定注销并退出系统吗?',
            success: () => {
              return userStore.logOut()
            }
          })
        }
      }
    })
    return {
      ...toRefs(avatarData),
      ...toRefs(methods)
    }
  }
}
</script>
