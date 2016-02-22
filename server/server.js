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

// app.use('/api/users', routes.users);
// app.use('/api/todos', routes.todos);

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

app.use('/', apiRouter);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT) });
