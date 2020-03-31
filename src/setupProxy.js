const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'https://v1.itooi.cn',
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/" // 把/api 变成空
    }
  }));
};