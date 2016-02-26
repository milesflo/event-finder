exports.up = function(knex, Promise) {
  return knex.schema.table("add_event_columns", function (table) {
  	table.string("event_name");
  	table.text("event_desc");
  	table.string("latitude");
  	table.string("longitude");
  	table.dateTime("start_time");
  	table.dateTime("end_time");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("add_event_columns", function (table) {
  	table.dropColumn("event_name");
  	table.dropColumn("event_desc");
  	table.dropColumn("latitude");
  	table.dropColumn("longitude");
  	table.dropColumn("start_time");
  	table.dropColumn("end_time");
  })
};