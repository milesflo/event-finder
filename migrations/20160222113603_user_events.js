exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_events', function(table){
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
    table.json('eventJson');
    table.boolean('hasDeleted');
  });
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('user-events');  
};
