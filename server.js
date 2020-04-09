var server = require('pushstate-server');

server.start({
  port: 3000,
  directory: './build'  //你build以后的目录
});