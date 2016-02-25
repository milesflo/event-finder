var request = require('request');
// var fb_token = require('./server.js');
var tmp_token = 'CAAOUu9aKBdkBAMaLRCEkbhMrHCO6KgkOGe4EVQoOCBhYC8so3z9zkngbBtm8hb97WZCN43oV2sSw9vZA9pQK1tlQ0ZBoOXmkrKkgCT1ZBynb5pmbUpFMZCfYx1ZCUFOvKWQElgtjtePum9B4VkBWjCzjQwMqB853LT465Sd1FV3ArzMGjXTLVZBUGEReI0PhFYZD'
var query = 'art'

var express = require('express');
var app = express();
// app.get('/', function(req, response) {
	request.get('https://graph.facebook.com/search?q=' + query + 'San Francisco' + '&type=event&center=37.7833,-122.4167&distance=10000&access_token=' + tmp_token, function(err, res, body) {
		var firstStep = JSON.parse(body).data;
		var secondStep = fbParser(firstStep)
		var promises = [];
		for (var i = 0; i < secondStep.length; i++) {
			var eventID = secondStep[i].id;
			var tmp = new Promise(function(resolve, reject) {
				request.get('https://graph.facebook.com/v2.5/' + eventID + '?fields=description,cover,attending_count,end_time,start_time&access_token=' + tmp_token, function(err, resp, body2) {
					if(err) reject(err);
					resolve(body2);
				})
			});
			promises.push(tmp);
		}
		Promise.all(promises).then(function(myHope) {
			var thing = JSON.parse(JSON.stringify(myHope))
			console.log(thing[5])
		})
	})
// }).listen(2000)





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