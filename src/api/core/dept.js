import request from '@/utils/request'
const baseUrl = '/core/v1/sys-dept'

// 获取组织树
export function getDeptTree(query) {
  return request({
    url: baseUrl + '/tree',
    method: 'get',
    params: query
  })
}

// 获取组织下拉
export function getDeptTreeSelect(query) {
  return request({
    url: baseUrl + '/tree-select',
    method: 'get',
    params: query
  })
}

// 获取组织信息
export function getDeptById(deptId) {
  return request({
    url: baseUrl + '/' + deptId,
    method: 'get'
  })
}

// 获取组织信息
export function getNextOrderNum() {
  return request({
    url: baseUrl + '/get-next-order',
    method: 'get'
  })
}

// 添加组织
export function addDept(data) {
  return request({
    url: baseUrl,
    method: 'post',
    data: data
  })
}
// 修改组织
export function editDept(data) {
  return request({
    url: baseUrl,
    method: 'put',
    data: data
  })
}

// 删除组织
export function delDept(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
}
