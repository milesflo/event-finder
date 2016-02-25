exports.up = function(knex, Promise) {
  return knex.schema.table("user_events", function (table) {
  	table.string("event_name");
  	table.number("latitude");
  	table.number("longitude");
  	table.dateTime("start_time");
  	table.dateTime("end_time");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("user_events", function (table) {
  	table.dropColumn("event_name");
  	table.dropColumn("latitude");
  	table.dropColumn("longitude");
  	table.dropColumn("start_time");
  	table.dropColumn("end_time");
  })
};
