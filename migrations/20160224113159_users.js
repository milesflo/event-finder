exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(table){
 		table.increments();// id serial primary key
 		table.string('username');
 		table.string('facebook_id');
 	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users');  
};
