const { defineConfig } = require('@vue/cli-service')

// svg
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = defineConfig({
  publicPath: './',
  devServer: {
    // 配置端口号
    port: 9999,
    // 配置主机名
    host: 'localhost',
    // 是否开启https协议
    https: false,
    // 是否自动打开浏览器
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVER_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  transpileDependencies: true
})
