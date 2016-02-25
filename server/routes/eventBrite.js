var express = require('express'),
    app = express(),
 	request = require('request');



app.get('/', function(req, res) {
	request('https://www.eventbriteapi.com/v3/events/17920884849/?token=J7WH6466CFBTZQZ43RJP' , function(err, response, body){
		console.log(JSON.parse(body));
		var myData = JSON.parse(body);
		
	}).then(function(data){
		console.log(data)
	});
});

module.exports = app;
