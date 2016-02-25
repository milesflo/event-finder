var knex = require('../db/knex'),


eventfulSearch = function(query, done) {
    var eventful = require('eventful-node')
    var client = new eventful.Client("QfMJMhDnc8BXXWC6");

	client.searchEvents({   keywords: query.q,
                            location: "San Francisco"
                        }, function(err, data){
        if(err){

            done(err, null);

        }
        done(null, data);
    });
};


module.exports = {
    eventFulSearch: eventfulSearch,
}