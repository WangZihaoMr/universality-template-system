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
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  transpileDependencies: true,
  lintOnSave: true
})
