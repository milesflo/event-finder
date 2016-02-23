var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	// var methodOverride = require("method-override");
	apiRouter = express.Router("/routes.index.js"),
	path = require('path'),
	env = require('dotenv');


app.use('/client', express.static(path.join(__dirname, '../client')));
app.use(morgan('tiny'));
// app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

app.use('/', apiRouter);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT)});
