var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	morgan 				= require("morgan"),
	routes 				= require('./routes'),
	path 				= require('path'),
	knex 				= require('../db/knex'),
	passport 			= require('passport'),
<<<<<<< HEAD
	FacebookStrategy	= require('passport-facebook').Strategy;
var eventBrite 		= require('./routes/eventBrite.js');
var worker = require('./worker.js');
=======
	FacebookStrategy	= require('passport-facebook').Strategy,
    dotenv              = require('dotenv').load(),
	worker 				= require('./worker.js'),
	fbworker			= require('./fbReqs.js'),
	token;
>>>>>>> f44e5fb0adbecb921c7928ada26905238ed6493d

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

<<<<<<< HEAD

=======
>>>>>>> f44e5fb0adbecb921c7928ada26905238ed6493d
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/js',express.static(path.join(__dirname, '../client/js')));
app.use('/templates',express.static(path.join(__dirname, '../client/js/templates')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/users', routes.users);
app.use('/api/eventBrite', eventBrite);

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

app.get('/apiGet', function(req,res) {
<<<<<<< HEAD
	worker.eventFulSearch(req.query, function(err, data) {
		if (err) {
			console.log("it's dead jim");
		}
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
=======
	worker.eventFulSearch(req.query);
<<<<<<< HEAD
});
// app.use(passport.initialize());
=======
	fbworker.fbQuery(req.query, token);
>>>>>>> f44e5fb0adbecb921c7928ada26905238ed6493d
})
app.use(passport.initialize());
>>>>>>> f44e5fb0adbecb921c7928ada26905238ed6493d
app.use(passport.session());

require('./routes/users.js')(app,passport);


var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT)});
