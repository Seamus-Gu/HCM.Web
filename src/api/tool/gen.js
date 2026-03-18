import request from '@/utils/request'
const baseUrl = 'gen'

// 获取生成表列表
export function getGenTableList(query) {
  return request({
    url: baseUrl + '/table-list',
    method: 'get',
    params: query
  })
}

export function getColumnList(query) {
  return request({
    url: baseUrl + '/column-list',
    method: 'get',
    params: query
  })
}

// 添加生成表
export function getGenSql(query) {
  return request({
    url: baseUrl + '/get-sql',
    method: 'get',
    params: query
  })
}

// 添加生成表
export function addGenTable(data) {
  return request({
    url: baseUrl + '/add-table',
    method: 'post',
    data: data
  })
}

// 删除生成表
export function removeGenTable(id) {
  return request({
    url: baseUrl + '/remove-table/' + id,
    method: 'delete'
  })
}

// 添加生成表
export function addGenColumnList(data) {
  return request({
    url: baseUrl + '/add-column-list',
    method: 'post',
    data: data
  })
}
