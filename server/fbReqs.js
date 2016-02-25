var request = require('request-promise');
// var fb_token = require('./server.js');
var tmp_token = 'CAACEdEose0cBAOp2CLwxcScb8qYoh3fNJeITkWJoCKFqDkpZB7NSLfbfUdWq24ZC1SzEyBQQcrLGc15QkDtQGBQmZCVsDBMV3puiDyco4O97avAIM5rl6w3mEsHabjESV3MzE0VznOKBH4mb9mleVXHBkvbs1RXAVOtEHhZBTjEnZArLFVRJfrVHsk9mtoloutlJfc8mh8gZDZD'
var query = 'galvanize'

var express = require('express');
var app = express();
app.get('/', function(req, response) {
	request.get('https://graph.facebook.com/search?q=' + query + 'San Francisco' + '&type=event&center=37.7833,-122.4167&distance=10000&access_token=' + tmp_token).then(function(data) {
		var arr = fbParser(JSON.parse(data).data);
		var promises = [];
		for(point in arr) {
			realDatapoint = arr[point].id;
			console.log(realDatapoint);
			request.get('https://graph.facebook.com/v2.5/' + realDatapoint).then(function(target) {
				promises.push(target);
			})
		}
		response.send(promises);
	})
}).listen(2000)





function fbParser(data) {
	var eventArr = [];
	for (var i = 0; i < data.length; i++) {
		var tmpObj = {};
		// if(data[i].title) {
		// 	tmpObj.title = data[i].name
		// }
		// if(data[i].start_time) {
		// 	tmpObj.start_time = data[i].start_time;
		// }
		// if(data[i].end_time) {
		// 	tmpObj.end_time = data[i].end_time;
		// }
		// if(data[i].description) {
		// 	tmpObj.description = data[i].description;
		// }
		// if(data[i].place) {
		// 	tmpObj.location = data[i].place;
		// }
		tmpObj.id = data[i].id
		eventArr.push(tmpObj);
	}
	return eventArr
}