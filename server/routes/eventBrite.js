var express = require('express'),
    app = express(),
 	request = require('request');



app.get('/', function(req, res) {
	
	var searchKey = 'music';
	request.get('https://www.eventbriteapi.com/v3/events/search?q=' + searchKey + '&token=J7WH6466CFBTZQZ43RJP' , function(err, response, body){
		
		var myData = JSON.parse(body).events;
		ebParser(myData)
		
		// res.json(myData);
	});


});


function ebParser(data) {
	var eventArr = [];
	for (var i = 0; i < data.length; i++) {
		var tmpObj = {};

		tmpObj.event_name = data[i].name.text;
		tmpObj.event_desc = data[i].description;
		tmpObj.start_time = data[i].start.local;
		tmpObj.end_time = data[i].end.local;
		
		eventArr.push(tmpObj);
	}
	
}
module.exports = app;
