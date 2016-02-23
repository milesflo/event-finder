var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	routes = require('./routes'),
	path = require('path');

app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/js',express.static(path.join(__dirname, '../client/js')));
app.use('/templates',express.static(path.join(__dirname, '../client/js/templates')));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/users', routes.users);
// app.use('/api/todos', routes.todos);

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT) });
