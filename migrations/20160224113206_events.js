exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table){
    table.increments();
    table.json('eventJson');
  });
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('events');  
};