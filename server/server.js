var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	morgan 				= require("morgan"),
	routes 				= require('./routes'),
	path 				= require('path'),
	knex 				= require('../db/knex'),
	passport 			= require('passport'),
	FacebookStrategy	= require('passport-facebook').Strategy,
	cookieParser 		= require('cookie-parser'),
    eventBrite 	    	= require('./routes/eventBrite.js'),
    worker              = require('./worker.js'),
    dotenv              = require('dotenv').load(),
	fbworker			= require('./fbReqs.js'),
	token;
	require('dotenv').load();

	app.use(passport.initialize());

passport.serializeUser(function(user, done) {
	if(user[0] === undefined){
		done(null, user);
	} else {
		done(null, user[0]);
	}
});

passport.deserializeUser(function(user, done) {
	knex('users').where({ id: user.id }).then(function(user, err) {
		done(err, user);
	});
});

passport.use(new FacebookStrategy({
	clientID: process.env.FBCLIENTID,
	clientSecret: process.env.FBCLIENTSECRET,
	callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	function(token, refreshToken, profile, done) {
		console.log(token);
		token = token;
		process.nextTick(function() {
			knex('users').where({facebook_id: profile.id}).then(function(user, err) {
				if(err)
					done(err);
				if(user[0]) {
					return done(null, user[0]);
				} else {
					knex('users').insert({facebook_id: profile.id, username: profile.displayName}).then(function() {
						knex('users').where({facebook_id: profile.id}).then(function(data) {
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

app.use(cookieParser());
app.use(cookieParser());

app.use(session({
	name: 'session',
	keys: [process.env.KEY1]
}));

app.use('/api/users', routes.users);
app.use('/api/eventBrite', eventBrite);

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

app.get('/apiGet', function(req,res) {
	worker.eventFulSearch(req.query, function(err, data) {
		if (err) {
			console.log("it's dead jim");
		}
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

app.use(passport.session());

require('./routes/users.js')(app,passport);
var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT)});