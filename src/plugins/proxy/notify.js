import { notification, Button } from 'ant-design-vue'
import { h } from 'vue'

export default {
  info: data => {
    notification.info({
      message: h('div', { style: 'padding-bottom:2px; font-size:22px' }, [
        h('span', data.title || '提醒')
      ]),
      description: data.content,
      onClick: data.click,
      placement: data.placement || 'bottomRight',
      duration: data.duration
    })
  },
  success: data => {
    notification.success({
      message: h('div', { style: 'padding-bottom:2px; font-size:22px' }, [
        h('span', data.title || '提醒')
      ]),
      description: data.content,
      onClick: data.click,
      placement: data.placement || 'bottomRight',
      duration: data.duration
    })
  },
  error: data => {
    notification.error({
      message: h('div', { style: 'padding-bottom:2px; font-size:22px' }, [
        h('span', data.title || '错误')
      ]),
      description: data.content,
      onClick: data.click,
      placement: data.placement || 'bottomRight',
      duration: data.duration
    })
  },
  warning: data => {
    notification.warning({
      message: h('div', { style: 'padding-bottom:2px; font-size:22px' }, [
        h('span', data.title || '警告')
      ]),
      description: data.content,
      onClick: data.click,
      placement: data.placement || 'bottomRight',
      duration: data.duration
    })
  },
  infoBtn: data => {
    const key = `open${Date.now()}`
    notification.info({
      message: h('div', { style: 'padding-bottom:2px; font-size:22px' }, [
        h('span', data.title || '提醒')
      ]),
      description: data.content,
      placement: data.placement || 'bottomRight',
      duration: data.duration,
      key,
      btn: h(
        Button,
        {
          type: 'primary',
          size: 'middle',
          onClick: async () => {
            await data.click
            notification.close(key)
          }
        },
        () => {
          return data.btnText || '确认'
        }
      )
    })
  },
  successBtn: data => {
    const key = `open${Date.now()}`
    notification.success({
      message: h('div', { style: 'padding-bottom:2px; font-size:22px' }, [
        h('span', data.title || '提醒')
      ]),
      description: data.content,
      placement: data.placement || 'bottomRight',
      duration: data.duration,
      key,
      btn: h(
        Button,
        {
          type: 'primary',
          size: 'middle',
          onClick: async () => {
            await data.click
            notification.close(key)
          }
        },
        () => {
          return data.btnText || '确认'
        }
      )
    })
  },
  errorBtn: data => {
    const key = `open${Date.now()}`
    notification.error({
      message: h('div', { style: 'padding-bottom:2px; font-size:22px' }, [
        h('span', data.title || '错误')
      ]),
      description: data.content,
      placement: data.placement || 'bottomRight',
      duration: data.duration,
      key,
      btn: h(
        Button,
        {
          type: 'danger',
          size: 'middle',
          onClick: async () => {
            await data.click
            notification.close(key)
          }
        },
        () => {
          return data.btnText || '确认'
        }
      )
    })
  },
  warningBtn: data => {
    const key = `open${Date.now()}`
    notification.warning({
      message: h('div', { style: 'padding-bottom:2px; font-size:22px' }, [
        h('span', data.title || '警告')
      ]),
      description: data.content,
      placement: data.placement || 'bottomRight',
      duration: data.duration,
      key,
      btn: h(
        Button,
        {
          style: 'background:#fff39f',
          size: 'middle',
          onClick: async () => {
            await data.click
            notification.close(key)
          }
        },
        () => {
          return data.btnText || '确认'
        }
      )
    })
  }
}
