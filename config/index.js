'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/getSingerList': {//使用/api/getDiscLists来代替下面的target
        //target代表源地址
        target: 'https://u.y.qq.com/cgi-bin/musics.fcg',
        //bypass代表源地址是提前设置的数据
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://u.y.qq.com';
          req.headers.host = 'u.y.qq.com';
        },
        changeOrigin:true,
        pathRewrite: {
          '^/api/getSingerList': ''
        }
      },
      '/api/getRecommend': {//使用/api/getRecommend来代替下面的target
        //target代表源地址
        target: 'https://u.y.qq.com/cgi-bin/musics.fcg',
        //bypass代表源地址是提前设置的数据
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://u.y.qq.com';
          req.headers.host = 'u.y.qq.com';
        },
        changeOrigin:true,
        pathRewrite: {
          '^/api/getRecommend': ''
        }
      },
      '/api/getDiscList': {//使用/api/getDiscLists来代替下面的target
        //target代表源地址
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
        //bypass代表源地址是提前设置的数据
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com';
          req.headers.host = 'c.y.qq.com';
        },
        changeOrigin:true,
        pathRewrite: {
          '^/api/getDiscList': ''
        }
      },
      '/api/getSongList': {//使用/api/getSongList来代替下面的target
        //target代表源地址
        target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
        //bypass代表源地址是提前设置的数据
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com';
          req.headers.host = 'c.y.qq.com';
        },
        changeOrigin:true,
        pathRewrite: {
          '^/api/getSongList': ''
        }
      },
      '/api/getSearch': {//使用/api/getSearch来代替下面的target
        //target代表源地址
        target: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
        //bypass代表源地址是提前设置的数据
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://c.y.qq.com';
          req.headers.host = 'c.y.qq.com';
        },
        changeOrigin:true,
        pathRewrite: {
          '^/api/getSearch': ''
        }
      },
      '/api/getHotKey': {//使用/api/getHotKey来代替下面的target
        //target代表源地址
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        //bypass代表源地址是提前设置的数据
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://u.y.qq.com';
          req.headers.host = 'u.y.qq.com';
        },
        changeOrigin:true,
        pathRewrite: {
          '^/api/getHotKey': ''
        }
      },
      '/api/audioSong': {//使用/api/audioSong来代替下面的target
        //target代表源地址
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg?_=1588149638609&',
        //bypass代表源地址是提前设置的数据
        bypass: function (req, res, proxyOptions) {
          req.headers.referer = 'https://u.y.qq.com';
          req.headers.host = 'u.y.qq.com';
        },
        changeOrigin:true,
        pathRewrite: {
          '^/api/audioSong': ''
        }
      },
      '/user': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true // 跨域
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    env:require('./prod.env'),
    port:9000,
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

