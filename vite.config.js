import { defineConfig, loadEnv } from 'vite'
import path from 'path'

import { createVitePlugins, createServer } from './src/utils/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: createVitePlugins(env),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
        // components
        '@com': path.resolve(__dirname, './src/components'),
        //api
        '@api': path.resolve(__dirname, './src/api')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "./src/styles/variables.scss"  as *;
            @use "./src/styles/mixin.scss" as *;
          `,
          quietDeps: true,
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }, // vite 相关配置
    server: createServer(env)
  }
})
