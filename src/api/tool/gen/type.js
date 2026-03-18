import request from '@/utils/request'
const baseUrl = 'gen/type'

// 获取生成类型列表
export function getGenTypeAllList(query) {
  return request({
    url: baseUrl + '/all-list',
    method: 'get',
    params: query
  })
}

// 获取生成类型列表
export function getGenTypeList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

// 根据id获取生成类型详细信息
export function getGenTypeById(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'get'
  })
}

// 添加生成类型
export function addGenType(data) {
  return request({
    url: baseUrl + '/add',
    method: 'post',
    data: data
  })
}

// 修改生成类型
export function editGenType(data) {
  return request({
    url: baseUrl + '/edit',
    method: 'put',
    data: data
  })
}

// 删除生成类型
export function removeGenType(id) {
  return request({
    url: baseUrl + '/remove/' + id,
    method: 'delete'
  })
}
