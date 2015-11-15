var app = require('./server');
var express = require('express');
var app = express();
var fs = require('fs');
var quirk = require('./quirk');
var defaultquirks = require('./public/defaultquirks');
var dynamicquirks = require('./dynamicquirks');
var webpage = "<";
var quirkobjects = [];

//Serves the webpage
app.get('/', function (req, res) {
  res.send("This port is running an instance of unknownto");
  console.log("User %s attempted to GET",req.connection.remoteAddress)
});

//Host the static webpage
app.use(express.static('./public'));

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

// Accepts a submission of a new quirk
app.put('/quirk', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var myquirk = new quirk(req.query.title,req.query.geoloc,
                          req.query.sentiment,req.query.description,
                          req.query.numReviews,req.query.specialAccess);
  quirkobjects.push(myquirk);
});

// accept DELETE request at /quirk/id
app.delete('/user/id', function (req, res) {
  res.send('Got a DELETE request at /user/id');
  console.log("User %s attempted to DELETE at /user",req.connection.remoteAddress)
  for (var i = 0; i < quirkobjects.length; i++) {
    if(quirkobjects[i]['title'] == req.query.title){
      quirkobjects.splice(i,1);
    }
  }
});

//Respond with the current quirk list
app.get('/quirks', function (req, res) {
  console.log("User %s attempted to GET",req.connection.remoteAddress)
  res.send(quirkobjects);
});

//start the server , the entry point is here.
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  var stdin = process.openStdin();
  stdin.addListener("data", function(d){
    if(d.toString().trim() == "wq"){
      console.log("quitting...");
      fs.appendFile("./dynamicquirks.json", JSON.stringify(quirkobjects), function(err){
        console.log("Save successfull");
      });
      process.exit(0);
    }
  });
  quirkobjects = defaultquirks

  console.log('Example app listening at http://%s:%s', host, port);
});
