var handler = require('./request-handler.js');
var fs = require('fs');
console.log(handler.name);
var url = require('url');
/* Import node's http module: */
var http = require("http");
var port = 3000;
var ip = "127.0.0.1";

var server = http.createServer(function(request, response){
  var routes = '/classes/messages';
  var uri = url.parse(request.url).pathname;
  if (uri === routes) {
    handler.requestHandler(request, response);
  } else {
    handler.sendResponse(response, '404 not found', 404);
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
