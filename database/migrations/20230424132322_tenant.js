/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tenant", function (table) {
    table.string("uuid").primary().defaultTo(knex.raw("(UUID())"));
    table.string("tenant_name", 500);
    table.string("public_key", 255);
    table.string("email_host", 255);
    table.string("email_port", 255);
    table.boolean("email_secure").defaultTo(false);
    table.string("email_user", 255);
    table.string("email_pass", 255);
    table.string("sms_app_id", 255);
    table.string("sms_app_key", 255);
    table.boolean("is_active").defaultTo(true);
    table.string("created_by", 255);
    table.dateTime("created_datetime").defaultTo(knex.fn.now());
    table.string("updated_by", 255);
    table.dateTime("updated_datetime");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tenant");
};
