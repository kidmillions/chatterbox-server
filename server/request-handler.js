
var exports = module.exports = {};
var url = require('url');
var fs = require('fs');
var path = require('path');
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var dataStorage = {results:[]};



    // var stubMsg = {
    //   username: 'Jono',
    //   message: 'Do my bidding!'
    // };
    // var req = new stubs.request('/classes/room1', 'POST', stubMsg);


var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
  // Do some basic logging.

// var requestUrl = url.parse(request.url, true);
// console.log(requestUrl);
  var uri = url.parse(request.url).pathname;
  var filename = path.normalize('.' + request.url);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/JSON";
  request.setEncoding('utf8');

  console.log('URI: ' + uri);

  console.log('filename: ' + filename);

  // path.exists(filename, function(exists) {
    // console.log('exists: ' + exists);
    if (!(request.url === '/classes/messages' || request.url === '/')) {
      response.writeHead(404, headers);
      response.write('404 error');
      console.log('should be 404')
      response.end();
      return;
    }
  // });

  // console.log(data);
  var statusCode = 200;

  var res = '';
  if (request.method === "GET") {
    res = JSON.stringify(dataStorage);
  }

  if (request.method === "POST") {
    console.log('post')

    request.on('data', function(chunk) {
      // need to parse to store in the storage
      dataStorage.results.push(JSON.parse(chunk));
    })
    statusCode = 201;
  }

  console.log("Serving request type " + request.method + " for url " + request.url);

  response.writeHead(statusCode, headers);
  console.log(res);
  response.write(res);

  response.end();
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var name = 'nodeJS';
exports.name = name;
exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
