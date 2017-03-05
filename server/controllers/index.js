var models = require('../models');
var mysql = require('mysql');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'x-parse-application-id, x-parse-rest-api-key, content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
};

var sendResponse = function (response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

module.exports = {
  messages: {
    get: function (request, res) {
      if (request.url === '/classes/messages' || request.url === '/classes/messages?order=-createdAt') {
        statusCode = 200;
        var data = models.messages.get();
        sendResponse(res, data, statusCode); //'messages from our mysql database', statusCode);
      }
    }, // a function which handles a get request for all messages
    post: function (request, res) {
      console.log('REQUEST.BODY FOR POST', request.body);
      statusCode = 201;
      models.messages.post(request.body);
      sendResponse(res, request.body, statusCode);
    }, // a function which handles posting a message to the database
    options: function (request, res) {
      statusCode = 200;
      sendResponse(res, null, statusCode);
    } 
  },

  users: {
    // Ditto as above
    get: function (request, res) {
      if (request.url === '/classes/users' || request.url === '/classes/users?order=-createdAt') {
        statusCode = 200;
        var data = models.users.get();
        sendResponse(res, data, statusCode);
      }
    },
    post: function (request, res) {
      statusCode = 201;
      request.on('data', function(data) {
        statusCode = 201;
        models.users.post(request.body);
        sendResponse(res, request.body, statusCode);
      });
    },  
    options: function (request, res) {
      statusCode = 200;
      sendResponse(res, null, statusCode);
    } 
  }
};

