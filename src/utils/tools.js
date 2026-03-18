/**
 * @description: 请求参数处理
 * @param {*} params
 * @return {*}
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

export function blobValidate(data) {
  return data.type !== 'application/json'
}

export function generateColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const rgb = [(hash & 0xff0000) >> 16, (hash & 0x00ff00) >> 8, hash & 0x0000ff]

  const colorCode = rgb.map(c => c.toString(16).padStart(2, '0')).join('')
  return '#' + colorCode
}
