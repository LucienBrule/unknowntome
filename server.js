var express = require('express');
var app = express();
var quirk = require('./quirk')
var webpage = "<"

var quirkobjects = []

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
  console.log("User %s attempted to GET",req.connection.remoteAddress)
});

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
  console.log("User %s attempted to POST",req.connection.remoteAddress);
});

app.post('/quirk/id', function (req, res) {
  res.send('Got a POST request');
  console.log("User %s attempted to POST",req.connection.remoteAddress);
  for (var i = 0; i <= quirkobjects.length; i++) {
    console.log(quirkobjects[i]);
    if(quirkobjects[i]["title"] == req.query.title){
      if(quirkobjects[i]["geoLoc"] == "fillme"){
              quirkobjects[i]["geoLoc"] = req.query.geoLoc;
      };
    };
  };
});

// accept PUT request at /user
app.put('/quirk', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var myquirk = new quirk(req.query.title,req.query.geoloc,
                          req.query.sentiment,req.query.description,
                          req.query.numReviews,req.query.specialAccess);
  quirkobjects.push(myquirk);
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
  console.log("User %s attempted to DELETE at /user",req.connection.remoteAddress)

});

//do locations get
app.get('/quirks', function (req, res) {
  console.log("User %s attempted to GET",req.connection.remoteAddress)
  res.send(quirkobjects);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
