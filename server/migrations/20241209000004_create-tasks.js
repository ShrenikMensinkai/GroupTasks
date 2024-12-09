exports.up = function (knex) {
  return knex.schema.createTable("tasks", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table
      .enu("status", ["pending", "in-progress", "done"])
      .nullable()
      .defaultTo("pending");
    table
      .integer("orgId")
      .references("id")
      .inTable("organizations")
      .onDelete("CASCADE");
    table
      .integer("projectId")
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE");
    table
      .integer("assignee")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
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
  return knex.schema.dropTable("tasks");
};
