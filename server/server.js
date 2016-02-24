var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	routes = require('./routes'),
	path = require('path');
var passport 			= require('passport');
var FacebookStrategy	= require('passport-facebook').Strategy;

require('dotenv').load();

passport.serializeUser(function(user, done) {
		if(user[0] === undefined){
			done(null, user);
		} else {
			done(null, user[0]);
		}
	});

passport.deserializeUser(function(user, done) {
	console.log(user);
	Knex('users').where({ id: user.id }).then(function(user, err) {
		done(err, user);
	});
});


	passport.use(new FacebookStrategy({
		clientID: process.env.FBCLIENTID,
		clientSecret: process.env.FBCLIENTSECRET,
		callbackURL: 'http://localhost:3000'
	},
	function(token, refreshToken, profile, done) {
<<<<<<< HEAD
		
=======
		console.log(profile + "HERE!!!!");
>>>>>>> 939508e037079bb3a2c9e16406c7cbd70fed450c
		process.nextTick(function() {
			console.log(profile)
			Knex('users').where({facebook_id: profile.id}).then(function(user, err) {
				if(err)
					done(err);
				if(user[0]) {
					return done(null, user[0]);
				} else {
					Knex('users').insert({facebook_id: profile.id, password: token, username: profile.displayName, email: profile.emails}).then(function() {
						Knex('users').where({facebook_id: profile.id}).then(function(data) {
							return done(null, data[0]);
						});
					});
				}
			});
		});
	}
));



app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/js',express.static(path.join(__dirname, '../client/js')));
app.use('/templates',express.static(path.join(__dirname, '../client/js/templates')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/users', routes.users);
// app.use('/api/todos', routes.todos);

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

require('./routes/users.js')(app,passport);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT)});
