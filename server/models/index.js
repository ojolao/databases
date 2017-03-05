var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      //when invoked, this needs to return an object and pass it back to controllers
      var returnObj = {results: []};
      db.query('SELECT * from messages', function(err, rows) {
        if (err) {
          console.log(err);
        } else {
          console.log('rows', rows);
          //needs to read from the database: messages (use query to get username, content, roomname)
          //push each object into results array of response object
          for (var i = 0; i < rows.length; i++) {
            returnObj.results.push(rows[i]);
          }
        }
      });
      //return response object 
      return returnObj;
    }, // a function which produces all the messages
    post: function (data) {
      var roomname = data.roomname || 'lobby';
      db.query('INSERT INTO rooms SET name = ?', [roomname], function(err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      });
      db.query('INSERT INTO users SET name = ?', [data.username], function(err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      });
      db.query('INSERT INTO messages SET content = ?, userid = (SELECT id from USERS WHERE name = ?), roomid = (SELECT id from ROOMS where name = ?)', [data.text, data.username, roomname], function(err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      });
      //we will use INSERT to add posts to db
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      var returnObj = {results: []};
      db.query('SELECT * from users', function(err, rows) {
        if (err) {
          console.log(err);
        } else {
          //needs to read from the database: messages (use query to get username, content, roomname)
          //push each object into results array of response object
          for (var i = 0; i < rows.length; i++) {
            returnObj.results.push(rows[i]);
            console.log('rows', rows);
          }
        }
      });
      //return response object 
      return returnObj;
    }, //a function which produces all the users
    post: function (data) {
      db.query('INSERT INTO users SET name = data.username', function(err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      });
    } //a function which can be used to insert a user into the database
  }
};

