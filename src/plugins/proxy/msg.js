import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  info: content => {
    ElMessage.info(content)
  },
  error: content => {
    ElMessage.error(content)
  },
  success: content => {
    ElMessage.success(content)
  },
  warning: content => {
    ElMessage.warning(content)
  },
  asyncInfo(data) {
    ElMessage.loading(data.lTitle || '正在处理中', data.lTime || 2.5).then(() =>
      ElMessage.info(data.content, 2.5)
    )
  },
  asyncError(data) {
    ElMessage.loading(data.lTitle || '正在处理中', data.lTime || 2.5).then(() =>
      ElMessage.info(data.content, 2.5)
    )
  },
  asyncSuccess(data) {
    ElMessage.loading(data.lTitle || '正在处理中', data.lTime || 2.5).then(() =>
      ElMessage.info(data.content, 2.5)
    )
  },
  asyncWarning(data) {
    ElMessage.loading(data.lTitle || '正在处理中', data.lTime || 2.5).then(() =>
      ElMessage.info(data.content, 2.5)
    )
  }
}
