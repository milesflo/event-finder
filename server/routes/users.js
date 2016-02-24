var express     = require("express"),
    path        = require('path'),
    jwt         = require('jsonwebtoken'),
    bodyParser  = require("body-parser"),
    Knex        = require('../../db/knex');

module.exports = function(app,passport){
    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/#/api',
                failureRedirect: '/'
            })
        );
    app.get('/auth/facebook',
        passport.authenticate('facebook', {
            scope : 'email'
        })
    );
};
