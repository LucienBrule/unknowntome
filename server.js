#!/usr/bin/env node
'use strict';

var app = require(__dirname + '/server'); //Hacky solutution to my problems
var express = require('express');
var https = require('https');
var http = require('http');
var server;
var insecureServer;
var fs = require('fs');
var port = 443;
var insecurePort = 80;
var app = express();                      //Notice how the hack solution doesn't actually matter for in ap operability
var Datastore = require('nedb')
var sentiment = require('sentiment');
//FOR HTTPS
var SSLoptions = {
  key: fs.readFileSync('ssl/SSLKEY.key'),
  cert: fs.readFileSync('ssl/SSLCERT.pem'),
  requestCert: false,
  rejectUnauthorized: true
};

//EXTRA HTTPS SECURITY
var helmet = require('helmet');

app.use(helmet.hsts({
  maxAge: 31536000000,
  includeSubdomains: true
}));
app.use(helmet.hidePoweredBy());

//security-- api service++
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var quirk = require(__dirname + '/js/quirk');
var parking = require(__dirname + '/js/parking')
var bathroom = require(__dirname + '/js/bathroom')
var waterfountain = require(__dirname + '/js/waterfountain')
var meetinglocation = require(__dirname + '/js/meetinglocation')

var defaultquirks = require(__dirname + '/defaultjson/defaultquirks');
var defaultparkingspots = require(__dirname + '/defaultjson/defaultparkingspots');
var defaultbathrooms = require(__dirname + '/defaultjson/defaultbathrooms');
var defaultwaterfountains = require(__dirname + '/defaultjson/defaultwaterfountains');
var defaultmeetinglocations = require(__dirname + '/defaultjson/defaultmeetinglocations');

var quirks = new Datastore({ filename: __dirname + '/nedbs/quirks.json', autoload: true });
var parkingspots = new Datastore({ filename: __dirname + '/nedbs/parkingspots.json', autoload: true });
var bathrooms = new Datastore({ filename: __dirname + '/nedbs/bathrooms.json', autoload: true });
var waterfountains = new Datastore({ filename: __dirname + '/nedbs/waterfountains.json', autoload: true });
var meetinglocations = new Datastore({ filename: __dirname + '/nedbs/meetinglocations.json', autoload: true });

var webpage = "<";
var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    fallthrough: true,
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
app.use("/",express.static(__dirname + "/public",options))
//Serves the webpage
// app.get('/', function (req, res) {
//      res.sendFile('./public/index.html');
// });

// app.get('/defaultquirks.json', function(req, res)
// {
//   res.sendFile('./defaultjson/defaultquirks.json');
// });

// app.get('/', function (req, res) {
//   var hostname = req.headers.host.split(":")[0];
//   if(hostname.slice(0,6) == "quirks")
//     res.sendfile('./public/UnknownTo.html');
//   else 
//     res.sendfile('./public/NecessitiesUnknownTo.html');
//   console.log("User %s attempted to GET",req.connection.remoteAddress)
// });

//Host the static webpage
// app.use(express.static('./public'));

//route the quirks
app.get('/api/quirk', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var myquirk = new quirk(req.query.title,req.query.geoloc,
                          req.query.sentiment,req.query.description,
                          req.query.numReviews,req.query.specialAccess);
  quirks.insert(myquirk,function(err,newDoc){
    console.log("add successfull");
  });
});
app.get('/api/quirks/all', function (req, res) {
  quirks.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('/api/quirks/byid',function (req, res) {
  quirks.find({_id:String(req.query._id)},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('quirks/bytitle',function (req, res) {
  quirks.find({title: req.query.title},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('quirks/bysentiment',function (req, res) {
  quirks.find({sentiment: req.query.sentiment},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('/api/quirk/comment', function (req, res) {
 res.send("OK")
 quirks.find({title:req.query.title},function(err,docs){
  var mysent = String(parseInt(docs.sentiment) + parseInt(sentiment(req.query.comment))/2);
  quirks.update({title: req.query.title},{$set:{sentiment:mysent}});
  });
});
app.delete('/api/quirk/id', function (req, res) {
  db.remove({_id:res.query._id},function (err, numRemoved) {
    console.log("removed some quirks");
  });
});

//route parking spaces
app.get('/api/parkingspot', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var myparkingspot = new parkingspot(req.query.title,req.query.start,req.query.stop);
  parkingspots.insert(myparkingspot,function(err,newDoc){
    console.log("add successfull");
  });
});
app.get('/api/parkingspots/all', function (req, res) {
  parkingspots.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('/api/parkingspots/byid',function (req, res) {
  parkingspots.find({_id:req.query._id},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('qurirks/bytitle',function (req, res) {
  parkingspots.find({title: req.query.title},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.delete('/api/parkingspot/id', function (req, res) {
  db.remove({_id:res.query._id},function (req, res) {
      console.log("removed some parkingspots");

  });
});

//route bathrooms
app.get('/api/bathroom', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var mybathroom = new bathroom(req.query.title,req.query.geoloc,
                          req.query.sentiment,req.query.description,
                          req.query.numReviews,req.query.specialAccess);
  bathrooms.insert(mybathroom,function(err,newDoc){
    console.log("add successfull");
  });
});
app.get('/api/bathrooms/all', function (req, res) {
  bathrooms.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });});
app.get('/api/bathrooms/byid',function (req, res) {
  bathrooms.find({_id:req.query._id},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('qurirks/bytitle',function (req, res) {
  bathrooms.find({title: req.query.title},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('bathrooms/bysentiment',function (req, res) {
  bathrooms.find({sentiment: req.query.sentiment},function (err, docs) {
    res.send(JSON.stringify(docs));
  });});
app.delete('/api/bathroom/id', function (req, res) {
  db.remove({_id:res.query._id},function (req, res) {
    console.log("removed some bathroom/s");
  });
});

//route meeting locations
app.get('/api/meetinglocation', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var mymeetinglocation = new meetinglocation(req.query.title,req.query.geoloc,
                          req.query.sentiment,req.query.description,
                          req.query.numReviews,req.query.specialAccess);
  meetinglocations.insert(mymeetinglocation,function(err,newDoc){
    console.log("add successfull");
  });
});
app.get('/api/meetinglocations/all', function (req, res) {
  meetinglocations.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });  });
app.get('/api/meetinglocations/byid',function (req, res) {
  meetinglocations.find({_id:String(req.query._id)},function (err, docs) {
    res.send(JSON.stringify(docs));
  });  });
app.get('/api/meetinglocations/bytitle',function (req, res) {
  meetinglocations.find({title: req.query.title},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('meetinglocations/bysentiment',function (req, res) {
  meetinglocations.find({sentiment: req.query.sentiment},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.post('/api/meetinglocation', function (req, res) {
    meetinglocations.update({title: req.query.title})
});
app.delete('/api/meetinglocation/id', function (req, res) {
    db.remove({_id:res.query._id},function (req, res) {
      console.log("removed some meetinglocations");
    });
});

//route water fountains
app.route("/waterfountain");
app.get('/api/waterfountain', function (req, res) {
    res.send('Got a PUT request at /user');
    console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
    var mywaterfountain = new waterfountain(req.query.title,req.query.geoloc,
                            req.query.sentiment,req.query.description,
                            req.query.numReviews,req.query.specialAccess);
    waterfountains.insert(mywaterfountain,function(err,newDoc){
      console.log("add successfull");
    });
});
app.get('/api/waterfountains/all', function (req, res) {
  waterfountains.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('/api/waterfountains/byid',function (req, res) {
  waterfountains.find({_id:String(req.query._id)},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('waterfountains/bytitle',function (req, res) {
  waterfountains.find({title: req.query.title},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('waterfountains/bysentiment',function (req, res) {
  quirks.find({sentiment: req.query.sentiment},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.post('/api/waterfountain', function (req, res) {
    waterfountains.update({title: req.query.title})
  });
app.delete('/api/waterfountain/id', function (req, res) {
    db.remove({_id:res.query._id},function (req, res) {
      console.console.log("removed some waterfountains");
    });
});


app.get("/:name",function (req,res,next){
  fileName = req.params.name;
  res.sendFile(fileName,options,function(err){
    if(err){
      console.log(err);
      res.status(err.status).end();
    }
    else{
      console.log('Sent: ', filename);
    }
  });
});

//start the server , the entry point is here.
  var server = https.createServer(SSLoptions,app).listen(443, function () {
  var host = server.address().address;
  var port = server.address().port;
  var stdin = process.openStdin();
  quirks.insert(defaultquirks, function (err, newDocs) {
  });
  parkingspots.insert(defaultparkingspots, function (err, newDocs) {
  });
  bathrooms.insert(defaultbathrooms, function (err, newDocs) {
  });
  waterfountains.insert(defaultwaterfountains, function (err, newDocs) {
  });
  meetinglocations.insert(defaultmeetinglocations, function (err, newDocs) {
  });

  quirks.find({_id : "01"},function(err,docs){
    console.log(JSON.stringify(docs));
  });
  parkingspots.find({_id : "01"},function(err,docs){
    console.log(JSON.stringify(docs));
  });

insecureServer = http.createServer();
insecureServer.on('request', function (req, res) {
  // TODO also redirect websocket upgrades
  res.setHeader(
    'Location'
  , 'https://' + req.headers.host.replace(/:\d+/, ':' + port) + req.url
  );
  res.statusCode = 302;
  res.end();
});
insecureServer.listen(insecurePort, function(){
  console.log("\nRedirecting all http traffic to https\n");
});


  stdin.addListener("data", function(d){
    if(d.toString().trim() == "wq"){
      console.log("quitting...");
      process.exit(0);
    }
  });


  console.log('Example app listening at http://%s:%s', host, port);
});
