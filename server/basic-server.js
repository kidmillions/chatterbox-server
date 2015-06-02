var handler = require('./request-handler.js');
var static = require('node-static');
var requests = require('request');
var fs = require('fs');
console.log(handler.name);

/* Import node's http module: */
var http = require("http");
var port = 3000;
var ip = "127.0.0.1";
var fileServer = new static.Server('../client');


var server = http.createServer(handler.requestHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

server.on('error', function(err) {
  console.log('Server error', err.message);
})
