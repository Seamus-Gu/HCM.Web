import request from '@/utils/request'
const baseUrl = 'gen/v1/sql/'

// 获取生成表列表
export function generateData(data) {
  return request({
    url: baseUrl + 'generate-data',
    method: 'post',
    data: data
  })
}
