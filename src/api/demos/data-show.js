import request from '@/utils/request'
const baseUrl = '/example/data-show'

// 获取列表
export function getList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

// 获取树型数据
export function getTree(query) {
  return request({
    url: baseUrl + '/tree',
    method: 'get',
    params: query
  })
}
