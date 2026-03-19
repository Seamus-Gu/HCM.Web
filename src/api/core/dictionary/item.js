import request from '@/utils/request'
const baseUrl = '/system/dictionary/item'

export function getDictItemList(query) {
  return request({
    url: baseUrl + '/list',
    method: 'get',
    params: query
  })
}

export function getNextOrderNum() {
  return request({
    url: baseUrl + '/get-next-order',
    method: 'get'
  })
}

/**
 * @description: 获取字典类
 * @param {*} typeId
 * @return {*}
 */
export function getDictType(typeId) {
  return request({
    url: baseUrl + '/' + typeId,
    method: 'get'
  })
}

// 新增字典类
export function addDictType(data) {
  return request({
    url: baseUrl,
    method: 'post',
    data: data
  })
}
