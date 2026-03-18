import request, { download } from '@/utils/request'
const baseUrl = '/system/profile'

// 获取用户个人信息
export function getProfile() {
  return request({
    url: baseUrl,
    method: 'get'
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: baseUrl + '/avatar',
    method: 'post',
    data: data
  })
}
