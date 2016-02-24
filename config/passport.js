var express = require('express');
var router = express.Router();
var passport = require('passport');
var knex = require('../db/knex');

outer.get('/facebook',
  passport.authenticate('facebook'),
  function(req, res){

  });

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    console.log(req.user.facebook_id);
    if(req.isAuthenticated()){
      console.log("I am authenticated");
    }
    res.cookie('userID', req.user.id, { signed: true });
    res.redirect('/users/profile');
  });

router.get('/logout', function(req, res){
  res.clearCookie('userID');
  res.redirect('/');
});


module.exports = router;
