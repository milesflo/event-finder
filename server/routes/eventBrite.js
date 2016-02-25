var express = require('express'),
    app = express(),
 	request = require('request');



app.get('/', function(req, res) {
	
	var searchKey = 'music';
	request.get('https://www.eventbriteapi.com/v3/events/search?q=' + searchKey + '&token=J7WH6466CFBTZQZ43RJP' , function(err, response, body){
		
		var myData = JSON.parse(body).events;
		console.log(myData)
		res.json(myData);
	});


});


function fbParser(data) {
	var eventArr = [];
	for (var i = 0; i < data.length; i++) {
		var tmpObj = {};
	}
}
module.exports = app;
