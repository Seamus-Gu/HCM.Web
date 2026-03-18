import request from '@/utils/request'
const baseUrl = 'gen/column'

// 获取生成列列表
export function getGenColumnList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

// 根据id获取生成列详细信息
export function getGenColumnById(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'get'
  })
}

// 添加生成列
export function addGenColumn(data) {
  return request({
    url: baseUrl + '/add',
    method: 'post',
    data: data
  })
}

// 修改生成列
export function editGenColumn(data) {
  return request({
    url: baseUrl + '/edit',
    method: 'put',
    data: data
  })
}

// 删除生成列
export function removeGenColumn(id) {
  return request({
    url: baseUrl + '/remove/' + id,
    method: 'delete'
  })
}
