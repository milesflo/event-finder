var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var methodOverride = require("method-override");
var apiRouter = express.Router();
// var authorRouter = require("./controllers/authors.js");
// var bookRouter = require("./controllers/books.js");


app.set("view engine", "ejs");
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + './partials'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.send("Hello! YOOO");
});


// apiRouter.route('/event')
// .get(function(req,res){
//   knex('posts').then(function(error,response){
// 		res.json(response);
// 	});
// });



app.use('/', apiRouter);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT) });