exports.up = function (knex) {
	return knex.schema.createTable('verification_keys', function (table) {
		//table.string("uuid").primary().defaultTo(knex.raw("(UUID())"));
		table.bigIncrements('id').primary();
		table.string('tenant_uuid', null);
		table.string('main_id', 255, null);
		table.string('uuid', 255, null);
		table.string('notification_type', 45, null);
		table.string('otp_key', 255);
		table.string('trans_key', 255);
		table.string('email_address', 255);
		table.string('mobile_number', 255);
		table.boolean('is_verified').defaultTo(false);
		table.boolean('is_active').defaultTo(true);
		table.string('created_by', 255);
		table.dateTime('created_datetime').defaultTo(knex.fn.now());
		table.string('updated_by', 255);
		table.dateTime('updated_datetime');
		table.dateTime('lastlogin_datetime');
		table.foreign('tenant_uuid').references('tenant.uuid');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('verification_keys');
};
