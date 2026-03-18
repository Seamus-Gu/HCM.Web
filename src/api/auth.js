import request from '@/utils/request'
const baseUrl = '/auth/v1/'

export function getEmailCode(email) {
  return request({
    url: baseUrl + 'get-code',
    method: 'get',
    params: { email: email }
  })
}

// 登录
export function login(username, password) {
  return request({
    url: baseUrl + 'login',
    method: 'post',
    headers: { HideMsg: true },
    data: { username, password }
  })
}

// 注册
export function register(data) {
  return request({
    url: baseUrl + 'register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 退出
export function logout() {
  return request({
    url: baseUrl + 'logout',
    headers: { HideMsg: true },
    method: 'delete'
  })
}
