const BaseController = require('../base/base-controller'); //require('../base/base-controller');
const baseController = new BaseController();
const crypto = require('crypto');
const mdl = require('./tenant-model');

class TenantController extends BaseController {
	constructor() {
		super(mdl);
	}
	async create(req, res) {
		try {
			req.body.public_key = crypto.randomUUID();
			let data = await mdl.query().insertAndFetch(req.body);
			//baseController.myUserLogging(req, data, res);
			return global.apiResponse(res, data, 'OK', 200); //global.apiResponse(res, data, 'OK');
		} catch (err) {
			console.log(err);
			return; //global.apiResponse(res, {}, 'SE', err);
		}
	}

	async uid_public_key_checker(req, res) {
		try {
			let data = await mdl
				.query()
				.select(
					'uuid',
					'tenant_name',
					'public_key',
					'email_hostname',
					'email_host',
					'email_port',
					'email_secure',
					'email_user',
					'email_pass'
				)
				.where({ uuid: req.uuid, public_key: req.public_key })
				.first();
			if (data != null) {
				let normalAuth = {
					user: data.email_user,
					pass: data.email_pass,
				};
				let tenant_info = {
					uuid: data.uuid,
					tenant_name: data.tenant_name,
					public_key: data.public_key,
					email_setup: {
						message: { from: 'test@gmail.com' },
						preview: false,
						send: true,
						transport: {
							service: data.email_hostname,
							host: data.email_host,
							port: data.email_port,
							secure: data.email_secure,
							auth: normalAuth, //force normal auth credentials
						},
					},
					sms: {},
				};

				//console.log(tenant_info.email.transport)
				return { status: true, data: tenant_info };
			} else return { status: false, data: null };

			//return global.apiResponse(res, data, 'OK');
		} catch (err) {
			console.log(err);
			return { status: false, data: null }; //global.apiResponse(res, {}, 'SE', err);
		}
	}
}

module.exports = new TenantController();
