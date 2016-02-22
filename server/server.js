<<<<<<< HEAD
// require all necessary modules
var express = require('express');
var methodOverride = require("method-override");
var path = require('path');
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var router = require('./controllers/routes');


// create express app
var app = express();

//public assets directory
app.use('/client', express.static(path.join(__dirname, '../client')));

// set bodyParser configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// set the routes path
app.use('/api', router.index);

// always redirect to angular app for routes
// are not registered
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

//set a port to listen to
var port = process.env.PORT || 3000;

//tune in to that port
app.listen(port, function(){
  console.log('listenning on port: ' + port);
});
=======
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	// var methodOverride = require("method-override");
	apiRouter = express.Router(),
	path = require('path');



app.use('/client', express.static(path.join(__dirname, '../client')));
app.use(morgan('tiny'));
// app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.send("Hello! YOOO");
});




app.use('/', apiRouter);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT) });
>>>>>>> 6102522f4c80b20909a2711932a36209a66fd13b