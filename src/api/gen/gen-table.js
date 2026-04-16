import request, { download } from '@/utils/request'
const baseUrl = 'gen/v1/gen-table'

export function getGenTableList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

// 根据id获取代码生成表详细信息
export function getGenTableById(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'get'
  })
}

// 修改代码生成表
export function editGenTable(data) {
  return request({
    url: baseUrl + '/edit',
    method: 'put',
    data: data
  })
}

export function generateCode(query) {
  return request({
    url: baseUrl + '/generate-code',
    method: 'get',
    params: query
  })
}

export function exportCode(data) {
  return download(baseUrl + '/export-code', data, 'code.zip')
}
