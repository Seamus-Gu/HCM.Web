import { login, register, logout } from '@/api/auth'
import { getInfo } from '@/api/core/user'
import { getToken, setToken, removeToken } from '@/utils/session-storage'

const userStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    roles: [],
    permissions: [],
    avatar: '',
    userName: '',
    nickName: ''
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.userName.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(username, password)
          .then(res => {
            let token = res.data.access_token

            setToken(token)
            this.token = token
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    register(userInfo) {
      return new Promise((resolve, reject) => {
        register(userInfo)
          .then(res => {
            let token = res.data.access_token

            setToken(token)
            this.token = token
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            const data = res.data

            if (data.roleKeys && data.roleKeys.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = data.roleKeys
              this.permissions = data.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }

            this.userName = data.username
            this.nickName = data.nickName
            this.avatar = data.avatar
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = ''
            this.roles = []
            removeToken()

            location.href = '/login'
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {})
      })
    },
    updateAvatar(avatar) {
      this.avatar = avatar
    }
  }
})

export default userStore
