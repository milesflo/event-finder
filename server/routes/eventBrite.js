var express = require('express'),
    app = express(),
 	request = require('request');



app.get('/', function(req, res) {
	console.log(req.query);
	var searchKey = req.query;
	request.get('https://www.eventbriteapi.com/v3/events/search?q=' + searchKey + '&token=J7WH6466CFBTZQZ43RJP' , function(err, response, body){
		console.log(JSON.parse(body[0].));
		var myData = JSON.parse(body);
	});
});

module.exports = app;
