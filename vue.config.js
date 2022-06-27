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
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module.rules.delete('svg') // 重点：删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/imgs')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
})
