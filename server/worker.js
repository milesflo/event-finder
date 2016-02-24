eventfulSearch = function(query) {
    var eventful = require('eventful-node')
    var client = new eventful.Client("QfMJMhDnc8BXXWC6");

    console.log(query.q);

	client.searchEvents({ keywords: query.q }, function(err, data){
        if(err){

            return console.error(err);

        }

        console.log('Recieved ' + data.search.total_items + ' events');

        console.log('Event listings: ');

          //print the title of each event
        for(var i in data.search.events.event){

            console.log(data.search.events.event[i].title);

        }
    });
};


module.exports = {
    eventFulSearch: eventfulSearch,
}