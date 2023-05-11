const { maxHeaderSize } = require("http");

exports.up = function(knex) {
    return knex.schema.createTable("notification_logs", function (table) {
       table.bigIncrements("id").primary();
        table.string("tenant_uuid");
        table.string("notification_type", 255,null);
        table.string("payload",4000);
        table.string("remarks", 4000);
        table.boolean("is_active").defaultTo(true);
        table.string("created_by", 255);
        table.dateTime("created_datetime").defaultTo(knex.fn.now());
        table.string("updated_by", 255);
        table.dateTime("updated_datetime");
        table.foreign('tenant_uuid').references("tenant.uuid")
      });
      
};

exports.down = function(knex) {
    return knex.schema.dropTable("notification_logs");
};
