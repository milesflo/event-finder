var express = require("express"),
	
    path = require('path'),
    jwt = require('jsonwebtoken'),
    bodyParser = require("body-parser"),
    knex = require('../../db/knex');

     module.exports = function(app,passport){

// app.use('/client', express.static(path.join(__dirname, '../client')));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//  router.post('/api/login', function(req, res){
//  	knex('users').where(req.body)
//  		.then(function(rows){
//  			if(rows.length === 1){
//  			var token = jwt.sign({ username: rows[0].username,
//                                password: rows[0].password
//                              }, "SECRET KEY");

//             // On success, we send the token back
//             // to the browser.
//             res.json({jwt:token});
//         }
//         else {
//             res.json({
//                 error: JSON.stringify(err),
//                 message: "no matching user/pass combo"
//             });
//         }
//     }).catch(function(err){
//         console.log(err);
//         res.json({
//             error: JSON.stringify(err),
//             message: "Error connecting to Database"
//         });
//     });
// });
app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/'
        })
    );
app.get('/auth/facebook', 
    passport.authenticate('facebook', { 
        scope : 'email'
    })
);

}
