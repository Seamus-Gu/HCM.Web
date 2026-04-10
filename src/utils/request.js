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

// 通用下载方法
export async function download(url, data = {}, filename, config) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_APP_BASE_API + url,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getToken()
        },
        responseType: 'blob',
        ...config
      }
    )

    const contentDisposition = response.headers['content-disposition']
    let fileName = 'test.zip'
    if (contentDisposition) {
      // 解析 .NET 返回的文件名（支持中文）
      const fileNameMatch = contentDisposition.match(
        /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      )
      if (fileNameMatch != null && fileNameMatch[1]) {
        // 解码文件名（解决中文乱码）
        fileName = decodeURIComponent(fileNameMatch[1].replace(/"/g, ''))
      }
    }
    // 创建 Blob 对象
    const blob = new Blob([response.data], {
      type: response.data.type || 'application/octet-stream'
    })

    // 创建下载链接
    const link = document.createElement('a')
    const blobUrl = window.URL.createObjectURL(blob)
    link.href = blobUrl
    link.download = fileName

    // 触发下载
    document.body.appendChild(link)
    link.click()

    // 释放资源
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)

    return Promise.resolve('下载成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('下载文件出现错误，请联系管理员！')
    return Promise.reject(error)
  }
}

export default service
