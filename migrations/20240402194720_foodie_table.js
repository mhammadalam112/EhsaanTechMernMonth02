/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('chef', function (table) {
      table.increments('id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('username', 255).notNullable();
      table.string('password', 255).notNullable();
      table.timestamp('createdts').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('dish', function (table) {
        table.increments('id').primary();
        table.string('dish_name').notNullable();
        table.string('category').notNullable();
        table.integer('price');
        table.timestamp('createdts').notNullable().defaultTo(knex.fn.now());
      })
      .createTable('orders', function (table) {
        table.increments('id').primary();
        table.string('dish_name').notNullable();
        table.integer('order_quantity');
        table.string('order_by');
        table.integer('dish_id').unsigned();;
        table.foreign('dish_id').references('dish.id');
        table.integer('price');
        table.timestamp('createdts').notNullable().defaultTo(knex.fn.now());
      })
    .createTable('foodie', function (table) {
        table.increments('id').primary();
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table.string('username', 255).notNullable();
        table.string('password', 255).notNullable();
        table.timestamp('createdts').notNullable().defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('chef').dropTable('orders').dropTable('dish').dropTable('foodie');
};
