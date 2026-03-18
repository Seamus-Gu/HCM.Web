import request from '@/utils/request'
const baseUrl = '/job'

export function getJobList(query) {
  return request({
    url: baseUrl + '/get-job-list',
    method: 'get',
    params: query
  })
}

export function getClassList(query) {
  return request({
    url: baseUrl + '/get-dll-class-list',
    method: 'get',
    params: query
  })
}

export function AddJob(data) {
  return request({
    url: baseUrl,
    method: 'post',
    data: data
  })
}

export function EditJob(data) {
  return request({
    url: baseUrl,
    method: 'put',
    data: data
  })
}

export function Run(id) {
  return request({
    url: baseUrl + '/run/' + id,
    method: 'get'
  })
}
