const docs_notification = require('./modules/documentation/notification-logs-docs');

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'My API',
		version: '3.0.0',
		description: 'My API description',
	},
	basePath: '/api',
	paths: { ...docs_notification },
};

const options = {
	swaggerDefinition,
	apis: [], // ['./modules/documentation/*.js'],
	//apis: ['./routes/*.js'], // Path to the API routes folder
};

module.exports = options;
