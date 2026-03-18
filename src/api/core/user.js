import request, { download } from '@/utils/request'
const baseUrl = '/core/v1/sys-user/'

// 获取用户详细信息
export function getInfo() {
  return request({
    url: baseUrl + 'get-info',
    method: 'get'
  })
}

// 获取用户列表
export function getUserList(query) {
  return request({
    url: baseUrl + 'list',
    method: 'get',
    params: query
  })
}

// 获取用户下拉
export function getUserCombo(query) {
  return request({
    url: baseUrl + 'combo',
    method: 'get',
    params: query
  })
}

// 根据id获取用户信息
export function getUser(userId) {
  return request({
    url: baseUrl + userId,
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: baseUrl + 'add',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: baseUrl + 'edit',
    method: 'put',
    data: data
  })
}

// 删除用户
export function removeUser(id) {
  return request({
    url: baseUrl + 'remove/' + id,
    method: 'delete'
  })
}

//重置密码
export function resetPwd(data) {
  return request({
    url: baseUrl + 'reset-pwd',
    method: 'put',
    data: data
  })
}

// 导出用户列表
export function exportUser(excelName) {
  return download(baseUrl + 'export', {}, excelName)
}
