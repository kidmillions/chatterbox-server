var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var exports = module.exports = {};
var url = require('url');
var fs = require('fs');
var path = require('path');
var dataStorage = {results:[]};
var objectId = 1;

    // var stubMsg = {
    //   username: 'Jono',
    //   message: 'Do my bidding!'
    // };
    // var req = new stubs.request('/classes/room1', 'POST', stubMsg);

var actions = {
  'GET': function (request, response) {
    sendResponse(response, dataStorage, 200);
  },
  'POST': function (request, response) {
    collectData(request, function(message) {
      dataStorage['results'].push(message);
      sendResponse(response, {objectId: objectId}, 201);
      objectId++;
    });
  },
 'OPTIONS': function(request, response){
     sendResponse(response);
   }
};

var sendResponse = function(response, data, statusCode) {
  var statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};


var collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  });
};

var requestHandler = function(request, response) {
  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    throw new Error('action now found');
  }
};

var name = 'nodeJS Server Written by Austin and Chris';
exports.name = name;
exports.requestHandler = requestHandler;
exports.sendResponse = sendResponse;
