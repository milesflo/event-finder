var request = require('request');
// var fb_token = require('./server.js');

var express = require('express');
var app = express();

module.exports = {
	fbQuery: function(query, token){
		if(token) {
			request.get('https://graph.facebook.com/search?q=' + query + 'San Francisco' + '&type=event&center=37.7833,-122.4167&distance=10000&access_token=' + token, function(err, res, body) {
				var firstStep = JSON.parse(body).data;
				var secondStep = fbParserID(firstStep)
				var promises = [];
				for (var i = 0; i < secondStep.length; i++) {
					var eventID = secondStep[i].id;
					var tmp = new Promise(function(resolve, reject) {
						request.get('https://graph.facebook.com/v2.5/' + eventID + '?fields=description,cover,attending_count,name,end_time,start_time&access_token=' + token, function(err, resp, body2) {
							if(err) reject(err);
							resolve(body2);
						})
					});
					promises.push(tmp);
				}
				Promise.all(promises).then(function(myHope) {
					var final = fbParser(myHope)
					console.log(final);
					return final
				})
			})
		}
	}
}

function fbParser(data) {
	var eventArr = [];
	for (var i = 0; i < data.length; i++) {
		var tmpObj = {};
		var parsing = JSON.parse(data[i]);
		if(parsing['name']) {
			tmpObj.title = parsing['name']
		}
		if(parsing['start_time']) {
			tmpObj.start_time = parsing['start_time'];
		}
		if(parsing['end_time']) {
			tmpObj.end_time = parsing['end_time'];
		}
		if(parsing['description']) {
			tmpObj.description = parsing['description'];
		}
		if(parsing['cover']) {
			tmpObj.img = parsing['cover'].source;
		}
		eventArr.push(tmpObj);
	}
	return eventArr
}


function fbParserID(data) {
	var eventArr = [];
	for (var i = 0; i < data.length; i++) {
		var tmpObj = {};
		tmpObj.id = data[i].id
		eventArr.push(tmpObj);
	}
	return eventArr
}