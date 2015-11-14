var express = require('express');
var app = express();
var webpage = "<"

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
  console.log("User %s attempted to GET",req.connection.remoteAddress)
});

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
  console.log("User %s attempted to POST",req.connection.remoteAddress)
  
});

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress)

});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
  console.log("User %s attempted to DELETE at /user",req.connection.remoteAddress)

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
