import request, { download } from '@/utils/request'
const baseUrl = 'gen/v1/gen-table'

export function getGenTableList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

// 根据id获取代码生成列详细信息
export function getGenTableById(id) {
  return request({
    url: 'gen/v2/gen-table' + '/' + id,
    method: 'get'
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
