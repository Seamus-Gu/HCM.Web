import axios from 'axios'
import { getToken } from '@/utils/session-storage'
import errorCode from '@/utils/error-code'
import { tansParams, blobValidate } from '@/utils/tools'
import { ElMessage, ElMessageBox } from 'element-plus'
import { saveAs } from 'file-saver'

export let isRelogin = { show: false }

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 30000,
  //请求头
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// request拦截器
service.interceptors.request.use(
  config => {
    const { headers, method, params } = config
    headers['Authorization'] = 'Bearer ' + getToken()

    if (method === 'get' && params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data, config, request, status } = response

    if (status === 200) {
      const { code, message } = data

      if (code == 200) {
        config.method != 'get' &&
          !config.headers.HideMsg &&
          ElMessage.success(message)
        return data
      } else {
        ElMessage.error(message || errorCode[code])
        return Promise.reject(response)
      }
    } else if (response.status === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true
        ElMessageBox.confirm('登录状态已过期,请重新登录', '提示', {
          confirmButtonText: '重新登录'
        })
          .then(() => {
            useUserStore()
              .logOut()
              .finally(() => {
                location.reload()
              })
          })
          .catch(() => {
            isRelogin.show = false
          })
      }

      return
    } else {
      ElMessage.error(errorCode[error.response.status])
    }
  },

  error => {
    if (error.response) {
      ElMessage.error(errorCode[error.response.status])
    } else {
      console.log(error)
    }
    return Promise.reject(error)
  }
)

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'get',
      params: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(
  url,
  params = {},
  headers = { 'Content-Type': 'application/json' }
) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'post',
      data: params,
      headers: headers
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 通用下载方法
export function download(url, params = {}, filename, config) {
  console.log(url)
  return service
    .post(url, params, {
      transformRequest: [
        params => {
          return tansParams(params)
        }
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config
    })
    .then(async data => {
      const isBlob = blobValidate(data)
      if (isBlob) {
        const blob = new Blob([data])
        saveAs(blob, filename)
      } else {
        const resText = await data.text()
        const rspObj = JSON.parse(resText)
        const errMsg =
          errorCode[rspObj.code] || rspObj.message || errorCode['default']
        ElMessage.error(errMsg)
      }
    })
    .catch(r => {
      console.error(r)
      ElMessage.error('下载文件出现错误，请联系管理员！')
    })
}

export default service
