var app = require('./server');
var express = require('express');
var app = express();
var fs = require('fs');
var Datastore = require('nedb')
var sentiment = require('sentiment');


var quirk = require('./js/quirk');
var parking = require('./js/parking')
var bathroom = require('./js/bathroom')
var waterfountain = require('./js/waterfountain')
var meetinglocation = require('./js/meetinglocation')

var defaultquirks = require('./defaultjson/defaultquirks');
var defaultparkingspots = require('./defaultjson/defaultparkingspots');
var defaultbathrooms = require('./defaultjson/defaultbathrooms');
var defaultwaterfountains = require('./defaultjson/defaultwaterfountains');
var defaultmeetinglocations = require('./defaultjson/defaultmeetinglocations');

var quirks = new Datastore({ filename: __dirname + '/nedbs/quirks.json', autoload: true });
var parkingspots = new Datastore({ filename: __dirname + '/nedbs/parkingspots.json', autoload: true });
var bathrooms = new Datastore({ filename: __dirname + '/nedbs/bathrooms.json', autoload: true });
var waterfountains = new Datastore({ filename: __dirname + '/nedbs/waterfountains.json', autoload: true });
var meetinglocations = new Datastore({ filename: __dirname + '/nedbs/meetinglocations.json', autoload: true });

var webpage = "<";


//Serves the webpage
app.get('/', function (req, res) {
     res.sendfile('./public/index.html');
});

app.get('/defaultquirks.json', function(req, res)
{
  res.sendfile('./defaultquirks.json');
});
// app.get('/', function (req, res) {
//   var hostname = req.headers.host.split(":")[0];
//   if(hostname.slice(0,6) == "quirks")
//     res.sendfile('./public/UnknownTo.html');
//   else 
//     res.sendfile('./public/NecessitiesUnknownTo.html');
//   console.log("User %s attempted to GET",req.connection.remoteAddress)
// });

//Host the static webpage
app.use(express.static('./public'));

//route the quirks
app.put('/quirk', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var myquirk = new quirk(req.query.title,req.query.geoloc,
                          req.query.sentiment,req.query.description,
                          req.query.numReviews,req.query.specialAccess);
  quirks.insert(myquirk,function(err,newDoc){
    console.log("add successfull");
  });
});
app.get('/quirks/all', function (req, res) {
  quirks.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('/quirks/byid',function (req, res) {
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
app.put('/quirk/comment', function (req, res) {
 res.send("OK")
 quirks.find({title:req.query.title},function(err,docs){
  var mysent = String(parseInt(docs.sentiment) + parseInt(sentiment(req.query.comment))/2);
  quirks.update({title: req.query.title},{$set:{sentiment:mysent}});
  });
});
app.delete('/quirk/id', function (req, res) {
  db.remove({_id:res.query._id},function (err, numRemoved) {
    console.log("removed some quirks");
  });
});

//route parking spaces
app.put('/parkingspot', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var myparkingspot = new parkingspot(req.query.title,req.query.start,req.query.stop);
  parkingspots.insert(myparkingspot,function(err,newDoc){
    console.log("add successfull");
  });
});
app.get('/parkingspots/all', function (req, res) {
  parkingspots.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('/parkingspots/byid',function (req, res) {
  parkingspots.find({_id:req.query._id},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('qurirks/bytitle',function (req, res) {
  parkingspots.find({title: req.query.title},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.delete('/parkingspot/id', function (req, res) {
  db.remove({_id:res.query._id},function (req, res) {
      console.log("removed some parkingspots");

  });
});

//route bathrooms
app.put('/bathroom', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var mybathroom = new bathroom(req.query.title,req.query.geoloc,
                          req.query.sentiment,req.query.description,
                          req.query.numReviews,req.query.specialAccess);
  bathrooms.insert(mybathroom,function(err,newDoc){
    console.log("add successfull");
  });
});
app.get('/bathrooms/all', function (req, res) {
  bathrooms.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });});
app.get('/bathrooms/byid',function (req, res) {
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
app.delete('/bathroom/id', function (req, res) {
  db.remove({_id:res.query._id},function (req, res) {
    console.log("removed some bathroom/s");
  });
});

//route meeting locations
app.put('/meetinglocation', function (req, res) {
  res.send('Got a PUT request at /user');
  console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
  var mymeetinglocation = new meetinglocation(req.query.title,req.query.geoloc,
                          req.query.sentiment,req.query.description,
                          req.query.numReviews,req.query.specialAccess);
  meetinglocations.insert(mymeetinglocation,function(err,newDoc){
    console.log("add successfull");
  });
});
app.get('/meetinglocations/all', function (req, res) {
  meetinglocations.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });  });
app.get('/meetinglocations/byid',function (req, res) {
  meetinglocations.find({_id:String(req.query._id)},function (err, docs) {
    res.send(JSON.stringify(docs));
  });  });
app.get('/meetinglocations/bytitle',function (req, res) {
  meetinglocations.find({title: req.query.title},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('meetinglocations/bysentiment',function (req, res) {
  meetinglocations.find({sentiment: req.query.sentiment},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.post('/meetinglocation', function (req, res) {
    meetinglocations.update({title: req.query.title})
});
app.delete('/meetinglocation/id', function (req, res) {
    db.remove({_id:res.query._id},function (req, res) {
      console.log("removed some meetinglocations");
    });
});

//route water fountains
app.route("/waterfountain");
app.put('/waterfountain', function (req, res) {
    res.send('Got a PUT request at /user');
    console.log("User %s attempted to PUT at /user",req.connection.remoteAddress);
    var mywaterfountain = new waterfountain(req.query.title,req.query.geoloc,
                            req.query.sentiment,req.query.description,
                            req.query.numReviews,req.query.specialAccess);
    waterfountains.insert(mywaterfountain,function(err,newDoc){
      console.log("add successfull");
    });
});
app.get('/waterfountains/all', function (req, res) {
  waterfountains.find({},function (err, docs) {
    res.send(JSON.stringify(docs));
  });
});
app.get('/waterfountains/byid',function (req, res) {
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
app.post('/waterfountain', function (req, res) {
    waterfountains.update({title: req.query.title})
  });
app.delete('/waterfountain/id', function (req, res) {
    db.remove({_id:res.query._id},function (req, res) {
      console.console.log("removed some waterfountains");
    });
});

//start the server , the entry point is here.
var server = app.listen(3000, function () {
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


  stdin.addListener("data", function(d){
    if(d.toString().trim() == "wq"){
      console.log("quitting...");
      process.exit(0);
    }
  });

  console.log('Example app listening at http://%s:%s', host, port);
});
