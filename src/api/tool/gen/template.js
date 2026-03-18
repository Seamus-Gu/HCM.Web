import request from '@/utils/request'
const baseUrl = 'gen/template'

// 获取代码模板列表
export function getGenTemplateAllList(query) {
  return request({
    url: baseUrl + '/all-list',
    method: 'get',
    params: query
  })
}

// 获取代码模板列表
export function getGenTemplateList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

// 根据id获取代码模板详细信息
export function getGenTemplateById(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'get'
  })
}

// 添加代码模板
export function addGenTemplate(data) {
  return request({
    url: baseUrl + '/add',
    method: 'post',
    data: data
  })
}

// 修改代码模板
export function editGenTemplate(data) {
  return request({
    url: baseUrl + '/edit',
    method: 'put',
    data: data
  })
}

// 删除代码模板
export function removeGenTemplate(id) {
  return request({
    url: baseUrl + '/remove/' + id,
    method: 'delete'
  })
}
