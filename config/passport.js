var local = require('passport-local').Strategy;
var Knex = require('../db/knex.js');
var locus = require('locus');


module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		if(user){
			var email = user.email;
			var id = user.id;
		}
		Knex('users').where({email: email, id: id}).then(function() {
			done(null, user)
		})
	})

	passport.deserializeUser(function(user, done) {
		Knex('users').where({ id: user.id })
		done(null, user);
	})
	
}