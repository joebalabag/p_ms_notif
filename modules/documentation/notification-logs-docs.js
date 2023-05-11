const paths = {
	'/api/ms/notification/{id}/{public_key}/generate-verification-key': {},
};

// const appKeyHeader = {
//     name: 'X-APP-KEY',
//     in: 'header',
//     description: 'App Key',
//     schema: {
//         type: 'string'
//     }
// }

paths['/api/ms/notification/{id}/{public_key}/generate-verification-key'].post = {
	summary: 'test only',
	parameters: [
		{
			name: 'id',
			in: 'path',
			description: 'uuid of tenant',
			value: '56367638-e814-11ed-925c-06481686421e',
			//schema: { type: 'number' }
		},
		{
			name: 'public_key',
			in: 'path',
			description: 'public key of tenant',
			value: '83411802-a786-4414-8bcb-5137c600f618',
			//schema: { type: 'number' }
		},
	],
	requestBody: {
		description: 'Payload ',
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						main_id: {
							type: 'string',
							description: 'ID of Contact from Main Application',
							value: '21313',
						},
						notification_type: {
							type: 'string',
							description: 'transaction method of main application. (ex. forgot-password, user-registration)',
							value: 'forgot-password',
						},
						send_email: {
							type: 'boolean',
							description: 'identifier if send email is enable or not',
							value: true,
						},
						send_sms: {
							type: 'boolean',
							description: 'identifier if send sms is enable or not',
							value: false,
						},
						email_address: {
							type: 'string',
							description: 'receiving email addresss',
							value: 'rpa131992@gmail.com',
						},
						mobile_number: {
							type: 'string',
							description: 'receving sms',
							value: '0912132131',
						},
						name: {
							type: 'string',
							description: 'name of customer/user',
							value: 'Joe Balabag',
						},
					},
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Success',
			content: {
				'application/json': {
					example: {
						'response': {
							'uuid': '7a7ae9f5-db73-418b-98b6-084aef83d43e',
							'trans_key': 'sioxgi',
							'expiry': {
								'mins': 5,
								'content': '5 mins',
							},
						},
						'message': 'Success',
						'result_status': 'OK',
					},
				},
			},
		},
	},
};
module.exports = paths;
