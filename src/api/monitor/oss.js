import request, { download } from '@/utils/request'
const baseUrl = '/oss'

export function getOssList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

export function upload(data) {
  return request({
    url: baseUrl + '/upload',
    method: 'post',
    data: data
  })
}
