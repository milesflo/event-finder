var knex = require("./../db/knex.js");
var promise = require("bluebird");
var dateFormat = require('dateformat');

eventfulSearch = function(query, done) {
    var eventful = require('eventful-node')
    var client = new eventful.Client("QfMJMhDnc8BXXWC6");

	client.searchEvents({   keywords: query.query,
                            location: "San Francisco"
                        },
        function(err, data){
            if(err){

                done(err, null);

            }
            done(null, data);

            var insertPromises = [];

            if (data && data.search && data.search.total_items >0) {

               for (var i = 0; i < data.search.events.event.length; i++) {
                    var event = {
                        "event_name" : data.search.events.event[i].title,
                        "event_desc" : data.search.events.event[i].description,
                        "latitude"   : data.search.events.event[i].latitude,
                        "longitude"  : data.search.events.event[i].longitude,
                        "start_time" : dateFormat(data.search.events.event[i].start_time,"isoDateTime"),
                        "end_time"   : dateFormat(data.search.events.event[i].stop_time,"isoDateTime"),
                        "eventJson"  : data.search.events.event[i]

                    };
                    knex("user_events").insert(event).then(function(response) {
                        //console.log("hello");
                        //console.log(response);
                    }).catch(function(response) {
                        //console.log("goodbye");
                        //console.log(response);
                    });
                } 
            };
            knex('queue').update({done: true}).where({id: query.id}).then(function(){});
    });
};

function processQueue() {
    knex('queue').whereNot({done: true}).then(function(queries) {
        for (var i = 0; i < queries.length; i++) {
                console.log("hello", queries[i]);
            eventfulSearch(queries[i], function(result) {
            });
        }
    }).catch(function(err){console.log(err)});
}

setInterval(processQueue,1000);

module.exports = {
    eventFulSearch : eventfulSearch,
    processQueue   : processQueue
}
