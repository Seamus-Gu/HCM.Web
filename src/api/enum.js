import request from '@/utils/request'
const baseUrl = '/enum'

// 获取组织树
export function getEnumCombo(key) {
  return request({
    url: baseUrl,
    method: 'get',
    params: {
      key: key
    }
  })
}
