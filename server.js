var express = require('express');
var app = express();
var quirk = require('./quirk')
var webpage = "<"
var defaultquirks = require('./defaultquirks')
// var mainview = require('Unkn')
// var dynamicquirks = require('./dynamicquirks')
var quirkobjects = []

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.sendFile('UnknownTo.html')
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
  for (var i = 0; i < quirkobjects.length; i++) {
    if(quirkobjects[i]['title'] == req.query.title){
      if (typeof(req.query.geoloc)!=='undefined') quirkobjects[i]['geoloc'] = String(req.query.geoloc);
      if (typeof(req.query.sentiment)!=='undefined') quirkobjects[i]['sentiment'] = String(req.query.sentiment);
      if (typeof(req.query.description)!=='undefined') quirkobjects[i]['description'] = String(req.query.description);
      if (typeof(req.query.numreviews)!=='undefined') quirkobjects[i]['numReviews'] = String(req.query.numreviews);
      if (typeof(req.query.specialaccess)!=='undefined') quirkobjects[i]['specialAccess'] = String(req.query.specialaccess);
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
  quirkobjects = defaultquirks

  console.log('Example app listening at http://%s:%s', host, port);
});
