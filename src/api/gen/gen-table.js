import request, { download } from '@/utils/request'
const baseUrl = 'gen/v1/gen-table'

export function getGenTableList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
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

  // return request({
  //   url: baseUrl + '/export-code',
  //   method: 'get',
  //   params: query
  // })
}
