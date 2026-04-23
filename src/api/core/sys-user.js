import request from '@/utils/request'
const baseUrl = 'core/v1/sys-user/'

// 获取用户详细信息
export function getInfo() {
  return request({
    url: baseUrl + 'get-info',
    method: 'get'
  })
}

// 获取用户信息表列表
export function getSysUserList(query) {
  return request({
    url: baseUrl + 'list',
    method: 'get',
    params: query
  })
}

// 获取用户下拉
export function getSysUserCombo(query) {
  return request({
    url: baseUrl + 'combo',
    method: 'get',
    params: query
  })
}

// 根据id获取用户信息表详细信息
export function getSysUserById(id) {
  return request({
    url: baseUrl + id,
    method: 'get'
  })
}

// 添加用户信息表
export function addSysUser(data) {
  return request({
    url: baseUrl + 'add',
    method: 'post',
    data: data
  })
}

// 修改用户信息表
export function editSysUser(data) {
  return request({
    url: baseUrl + 'edit',
    method: 'put',
    data: data
  })
}

// 删除用户信息表
export function removeSysUser(id) {
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
