import request from '@/utils/request'
const baseUrl = '/core/v1/sys-menu'

// 获取路由
export const getRouters = () => {
  return request({
    url: baseUrl + '/get-routers',
    method: 'get'
  })
}

// 获取菜单树形列表
export function getMenuTree(query) {
  return request({
    url: baseUrl + '/tree',
    method: 'get',
    params: query
  })
}

// 根据id获取菜单信息
export function getMenuById(menuId) {
  return request({
    url: baseUrl + '/' + menuId,
    method: 'get'
  })
}

// 获取菜单树形列表
export function getMenuTreeSelect(query) {
  return request({
    url: baseUrl + '/tree-select',
    method: 'get',
    params: query
  })
}

export function getMenuNextOrder() {
  return request({
    url: baseUrl + '/get-next-order',
    method: 'get'
  })
}

// 添加组织
export function addMenu(data) {
  return request({
    url: baseUrl,
    method: 'post',
    data: data
  })
}
// 修改组织
export function editMenu(data) {
  return request({
    url: baseUrl,
    method: 'put',
    data: data
  })
}

// 删除组织
export function delMenu(id) {
  return request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
}
