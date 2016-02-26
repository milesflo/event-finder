var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	morgan 				= require("morgan"),
	routes 				= require('./routes'),
	path 				= require('path'),
	knex 				= require('../db/knex'),
	passport 			= require('passport'),
	FacebookStrategy	= require('passport-facebook').Strategy,
    eventBrite 	    	= require('./routes/eventBrite.js'),
    dotenv              = require('dotenv').load(),
	fbworker			= require('./fbReqs.js'),
	jwt					= require('jsonwebtoken'),
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
		//console.log(token);
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

app.use('/api/users', routes.users);
app.use('/api/eventBrite', eventBrite);

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

app.get('/apiGet', function(req,res) {
	if (req.query.q) {
		knex('queue').insert({
			query: req.query.q,
			done: false
		}).then(function () {
			res.json({status: "queued"});
		});
	}
});

app.get('/searchResults', function(req, res) {
	console.log(req.query.q);
	knex('user_events').where('event_name', 'like', '%'+req.query.q+'%').then(
		function(data) {
			res.json(data);
		}
	);
});

app.get('/loadHome', function(req, res) {
	var payload = [];
	knex('user_events').where('event_name', 'like', '%Music%').then(function(data) {
		var finalTmp = theGreaterParser(data);
		// console.log(data);
		var tmp = {};
		tmp.data = finalTmp;
		tmp.type = 'Music';
		payload.push(tmp)
		knex('user_events').where('event_name', 'like', '%Food%').then(function(data) {
			var finalTmp = theGreaterParser(data)
			var tmp = {};
			tmp.data = finalTmp;
			tmp.type = 'Food';
			payload.push(tmp)
			knex('user_events').where('event_name', 'like', '%Sports%').then(function(data) {
				var finalTmp = theGreaterParser(data)
				var tmp = {};
				tmp.data = finalTmp;
				tmp.type = 'Sports';
				payload.push(tmp);
				res.send(payload);
			})
		})
	})
})

function theGreaterParser(data) {
        var tmpArr = data,
            final = [];

        for (var i = 0; i < tmpArr.length; i++) {
            var tmpObj = {},
                event = tmpArr[i].eventJson;

            if(event.title && event.description && event.start_time && event.stop_time) {
                tmpObj.title = event.title;
                tmpObj.description = event.description;
				tmpObj.start_time = event.start_time;
				tmpObj.end_time = event.stop_time;

				if (event.image.large) {
                	tmpObj.img = event.image.large.url;
            	} else {
                	tmpObj.img = '/client/images/Drawing.png';
            	}
            	final.push(tmpObj)
            }
        }
        console.log(final)
        return final;
    }

app.use(passport.session());


require('./routes/users.js')(app,passport);
var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT)});
