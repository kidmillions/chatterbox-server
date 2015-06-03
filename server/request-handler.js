var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var exports = module.exports = {};
var fs = require('fs');
// var dataStorage = {results:[]};
var objectId = 1;

    // var stubMsg = {
    //   username: 'Jono',
    //   message: 'Do my bidding!'
    // };
    // var req = new stubs.request('/classes/room1', 'POST', stubMsg);

var actions = {
  'GET': function (request, response) {
    fs.readFile('./data.json', {encoding: 'utf8'}, function (err, data) {
      sendResponse(response, data, 200);
    });

  },
  'POST': function (request, response) {
    collectData(request, function(message) {
      fs.readFile('./data.json', {encoding: 'utf8'}, function (err, data) {
        console.log(data);
        var newData = JSON.parse(data);
        console.log(newData);
        newData['results'].push(JSON.parse(message));
        fs.writeFile('./data.json', JSON.stringify(newData), function(err) {
          if (err) {
            console.log('it doesnt work');
          }
        });
      });

      // dataStorage['results'].push(message);
      sendResponse(response, 'sent', 201);
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
  response.end(data);
};


var collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data);
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
