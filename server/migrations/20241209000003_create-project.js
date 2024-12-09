exports.up = function (knex) {
  return knex.schema.createTable("projects", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.json("users").nullable();
    table
      .integer("orgId")
      .references("id")
      .inTable("organizations")
      .onDelete("CASCADE");
    table
      .integer("createdBy")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table
      .integer("updatedBy")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};
