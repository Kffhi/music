const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    // 开发环境
    // target: 'https://v1.itooi.cn',
    target: 'http://www.kffhi.com/api',
    //生产环境
    // target: 'https://www.kffhi.com',
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/" // 把/api 变成空
    }
  }));
};