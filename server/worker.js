eventfulSearch = function(query) {
    var eventful = require('eventful-node')
    var client = new eventful.Client("QfMJMhDnc8BXXWC6");

	client.searchEvents({   keywords: query.q,
                            location: "San Francisco"
                        }, function(err, data){
        if(err){

            done(err, null);

        }
        done(null, data);

        var insertPromises = [];

        for (var i = 0; i < data.search.events.event.length; i++) {
            var event = {
                "event_name" : data.search.events.event[i].title,
                "event_desc" : data.search.events.event[i].description,
                "latitude"   : data.search.events.event[i].latitude,
                "longitude"  : data.search.events.event[i].longitude,
                "start_time" : data.search.events.event[i].start_time,
                "end_time"   : data.search.events.event[i].stop_time,
                "eventJson"  : data.search.events.event[i]

            };
            insertPromises.push(knex("user_events").insert(event));
        }
        console.log(insertPromises);
        insertPromises.every(function (result) {
            console.log(result);
            //console.log("output\n", result);
        })
    });
};


module.exports = {
    eventFulSearch: eventfulSearch,
}
