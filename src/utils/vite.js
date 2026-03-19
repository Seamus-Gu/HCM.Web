import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function createVitePlugins(viteEnv) {
  const plugins = [
    vue(),
    autoImport({
      imports: ['vue', 'vue-router', 'pinia']
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ]
  viteEnv.VITE_USE_MOCK === 'true' &&
    plugins.push(
      viteMockServe({
        supportTs: false, //如果使用 js发开，则需要配置 supportTs 为 false
        watchFiles: true // 监视mock文件更改
      })
    )
  return plugins
}

export function createServer(viteEnv) {
  const server = {
    port: 8083,
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/api': {
        target: viteEnv.VITE_APP_HOST,
        secure: false, // 使用Https时
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
  return server
}
