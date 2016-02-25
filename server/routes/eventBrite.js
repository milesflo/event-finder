var express = require('express'),
    app = express(),
 	request = require('request');



app.get('/', function(req, res) {
	
	var searchKey = 'javascript';
	request.get('https://www.eventbriteapi.com/v3/events/search?q=' + searchKey + '&token=J7WH6466CFBTZQZ43RJP' , function(err, response, body){
		console.log(JSON.parse(body).events[0].logo.url);
		var myData = JSON.parse(body).events[0].logo.url;
		res.json(myData);
	});
});

module.exports = app;
