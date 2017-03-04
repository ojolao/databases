var models = require('../models');
var mysql = require('mysql');

var sendResponse = function (response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

module.exports = {
  messages: {
    get: function (req, res) {
      if (req.url === '/classes/messages' || req.url === '/classes/messages?order=-createdAt') {
        statusCode = 200;
        sendResponse(res); //'messages from our mysql database', statusCode);
      }
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      statusCode = 201;
      request.on('data', function(data) {
        var parsedBody = JSON.parse(data);
        //'mysql database messages table'.messages.results.push(parsedBody);
        sendResponse(response, parsedBody, statusCode);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

