
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

  var uri = url.parse(request.url).pathname;
  var filename = path.normalize('.' + request.url);
  var headers = defaultCorsHeaders;
  var statusCode = 200;
  var res = '';



  request.setEncoding('utf8');
  headers['Content-Type'] = "application/JSON";

  if (!(request.url === '/classes/messages' || request.url === '/')) {
    response.writeHead(404, headers);
    response.write('404 error');
    console.log('should be 404')
    response.end();
    return;
  }

  if (request.method === "GET") {





      // if (err) { throw err };
      // var readBuffer = new Buffer(1024);
      // var bufferOffset = 0;
      // var bufferLength = readBuffer.length;
      // var filePosition = 100;
      // fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition, function read(err, readBytes) {
      //   if (err) {throw err;}
      //   console.log('just read ' + readBytes + ' bytes');
      //   if (readBytes > 0) {
      //     console.log(readBuffer.slice(0, readBytes));
      //     res = JSON.stringify(readBuffer.slice(0, readBytes));
      //     console.log(res);
      //   }
      // });
      // res.on('data', function(chunk) {
      //   console.log(chunk);
      // })
    // });




    // res = JSON.stringify(dataStorage);
  }

  if (request.method === "POST") {
    request.on('data', function(chunk) {
      // boot up the data.js file
      dataStorage.results.push(JSON.parse(chunk));
    });
    statusCode = 201;
  }

  console.log("Serving request type " + request.method + " for url " + request.url);

  response.writeHead(statusCode, headers);
  response.write(res);
  response.end();
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var name = 'nodeJS Server Written by Austin and Chris';
exports.name = name;
exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
