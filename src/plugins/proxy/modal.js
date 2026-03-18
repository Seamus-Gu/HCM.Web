import { ElMessageBox } from 'element-plus'

export default {
  delete: modalData => {
    return ElMessageBox.confirm(
      modalData.content ?? '是否确认删除?',
      modalData.title ?? '提示',
      {
        confirmButtonText: modalData.confirmText ?? '确认',
        cancelButtonText: modalData.cancelText ?? '取消',
        type: 'error',
        center: true,
        beforeClose: async (action, instance, done) => {
          if (action == 'confirm') {
            instance.confirmButtonLoading = true
            modalData
              .success()
              .then(() => {
                done()
              })
              .catch(() => {})
              .finally(() => {
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              })
          } else {
            done()
          }
        }
      }
    )
  },
  warning: modalData => {
    return ElMessageBox.confirm(modalData.content, modalData.title ?? '警告', {
      confirmButtonText: modalData.confirmText ?? '确认',
      cancelButtonText: modalData.cancelText ?? '取消',
      type: 'warning',
      center: true,
      beforeClose: async (action, instance, done) => {
        if (action == 'confirm') {
          instance.confirmButtonLoading = true
          modalData
            .success()
            .then(() => {
              done()
            })
            .catch(() => {})
            .finally(() => {
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            })
        } else {
          done()
        }
      }
    })
  },
  confirm: modalData => {
    return ElMessageBox.confirm(modalData.content, modalData.title ?? '提示', {
      confirmButtonText: modalData.confirmText ?? '确认',
      cancelButtonText: modalData.cancelText ?? '取消',
      type: modalData.type ?? 'warning',
      center: true,
      beforeClose: async (action, instance, done) => {
        if (action == 'confirm') {
          instance.confirmButtonLoading = true
          modalData
            .success()
            .then(() => {
              done()
            })
            .catch(() => {})
            .finally(() => {
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            })
        } else {
          done()
        }
      }
    })
  },
  alert: modalData => {
    return ElMessageBox.alert(modalData.content, modalData.title ?? '提示', {
      confirmButtonText: modalData.confirmText ?? '确认',
      type: modalData.type ?? 'info',
      center: true,
      beforeClose: async (action, instance, done) => {
        if (action == 'confirm') {
          instance.confirmButtonLoading = true
          modalData
            .success()
            .then(() => {
              done()
            })
            .catch(() => {})
            .finally(() => {
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            })
        } else {
          done()
        }
      }
    })
  },
  box: modalData => {
    return ElMessageBox({
      title: modalData.title ?? '提示',
      message: modalData.content,
      type: modalData.type ?? 'info',
      center: true,
      customStyle: modalData.customStyle,
      beforeClose: async (action, instance, done) => {
        if (action == 'confirm') {
          instance.confirmButtonLoading = true
          modalData
            .success()
            .then(() => {
              done()
            })
            .catch(() => {})
            .finally(() => {
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            })
        } else {
          done()
        }
      }
    })
  }
}
