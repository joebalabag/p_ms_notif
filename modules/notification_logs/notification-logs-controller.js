const BaseController = require('../base/base-controller'); //require('../base/base-controller');
const baseController = new BaseController();
const crypto = require('crypto');
const moment = require('moment');
const TenantController = require('../tenant/tenant-controller');
const mdl = require('./notification-logs-model');
const m_tenant = require('../tenant/tenant-model');
const m_verification_keys = require('./verification-keys-model');
const Email = require('../email_settings/email-template-controller'); //'../email/email-template-controller');
class NotificationLogsController extends BaseController {
	constructor() {
		super(mdl);
	}

	async email_templates(req, res) {
		try {
			let public_checker = await TenantController.uid_public_key_checker({
				uuid: req.params.id,
				public_key: req.params.public_key,
			});

			if (public_checker.status == false) return global.apiResponse(res, {}, 'NDF', 401, 'Unauthorized Public Key.');

			let template = ['default', 'joe-balabag', 'test-success'];

			return global.apiResponse(res, template, 'OK', 200); //return global.apiResponse(res, template, 'OK');
		} catch (err) {
			console.log(err);
			return;
		}
	}
	async send_notif(req, res) {
		try {
			//globals.authcheckekr(req,res);

			let public_checker = await TenantController.uid_public_key_checker({
				uuid: req.params.id,
				public_key: req.params.public_key,
			});

			if (public_checker.status == false) return global.apiResponse(res, {}, 'NDF', 401, 'Unauthorized Public Key.');
			else {
				let output_email;
				let output_sms;
				let emaildata = {
					email_setup: public_checker.data.email_setup,
					email_content: req.body.email_content,
				};

				if (req.body.send_email == true) {
					output_email = await Email.send_template(emaildata);
				}
				if (req.body_send_sms == true) {
					//wala pa na setup
				}

				return global.apiResponse(res, { output_email, output_sms }, 'OK', 200); //return global.apiResponse(res, { output_email, output_sms }, 'OK');
			}
		} catch (err) {
			console.log(err);
			return; //global.apiResponse(res, {}, 'SE', err);
		}
	}

	async generate_verification_key(req, res) {
		try {
			let public_checker = await TenantController.uid_public_key_checker({
				uuid: req.params.id,
				public_key: req.params.public_key,
			});

			if (public_checker.status == false) return global.apiResponse(res, {}, 'NDF', 401, 'Unauthorized Public Key.');
			else {
				let output;
				let output_email;
				let otp_key = Math.floor(1000 + Math.random() * 9000);
				let trans_key = (Math.random() + 1).toString(36).substring(7);
				let my_uuid = crypto.randomUUID();
				let data_save = await m_verification_keys.query().insertAndFetch({
					tenant_uuid: req.params.id,
					main_id: req.body.main_id,
					uuid: my_uuid,
					notification_type: req.body.notification_type,
					otp_key: otp_key,
					trans_key: trans_key,
					email_address: req.body.email_address,
					mobile_number: req.body.mobile_number,
					is_verified: false,
					created_by: 'sys',
				});
				output = {
					uuid: my_uuid,
					trans_key: trans_key,
					expiry: { mins: 5, content: '5 mins' },
				};

				//send email
				let emaildata = {
					email_setup: public_checker.data.email_setup,
					email_content: {
						name: req.body.name,
						send_to: req.body.email_address,
						subject: 'Your One-Time Password (OTP)',
						is_templated: true,
						template_name: 'verification-key',
						content: {
							otp_key: otp_key,
							otp_transcode: trans_key,
						},
						is_html: true,
					}, //req.body.email_content,
				};

				if (req.body.send_email == true) {
					output_email = await Email.send_template(emaildata);
				}
				if (req.body_send_sms == true) {
					//wala pa na setup
				}
				//NEED SEND EMAIL AND SMS HERE..

				// let otp_body = {
				// 	MobileNo: req.body.MobileNo,
				// 	UID: crypto.randomUUID(), //req.body.UID,
				// 	OTPKey: otpkey,
				// 	LastName: req.body.LastName,
				// 	FirstName: req.body.FirstName,
				// 	Birthdate: req.body.Birthdate,
				// 	ExpirationDate: global.convertToSqlDateTime(global.addMinutes(new Date(), 5)),
				// 	OTPTransCode: req.body.OTPTransCode,
				// };
				//SEND SMS HERE
				// let SMSbody = {
				// 	MobileNo: req.body.MobileNo,
				// 	Message:
				// 		'Your One-Time Password (OTP) is ' +
				// 		otpkey +
				// 		', kindly enter within ' +
				// 		process.env.OTP_Minutes +
				// 		' minute(s). The transcode for this OTP is ' +
				// 		req.body.OTPTransCode,
				// };

				// let output_email;
				// let output_sms;
				// let emaildata = {
				// 	email_setup: public_checker.data.email_setup,
				// 	email_content: req.body.email_content,
				// };

				// if (req.body.send_email == true) {
				// 	output_email = await Email.send_template(emaildata);
				// }
				// if (req.body_send_sms == true) {
				// 	//wala pa na setup
				// }

				return global.apiResponse(res, output, 'OK', 200); //global.apiResponse(res, output, 'OK');
			}
		} catch (err) {
			console.log(err);
			return; //global.apiResponse(res, {}, 'SE', err);
		}
	}

	async verify_key(req, res) {
		try {
			console.log(req.headers);
			cd;
			let public_checker = await TenantController.uid_public_key_checker({
				uuid: req.params.id,
				public_key: req.params.public_key,
			});

			if (public_checker.status == false) return global.apiResponse(res, {}, 'NDF', 401, 'Unauthorized Public Key.');
			else {
				let output;
				let data = await m_verification_keys
					.query()
					.select()
					.where({
						uuid: req.body.uuid,
						trans_key: req.body.trans_key,
						//otp_key: req.body.otp_key,
					})
					.first();
				if (data != null) {
					if (data.is_verified == true) {
						output = { message: 'Your OTP Key is already verified.' };
						return global.apiResponse(res, output, 'OK', 200, output.message);
					}
					if (req.body.otp_key == data.otp_key) {
						let s_date = moment(data.created_datetime);
						let e_date = moment(new Date());
						let diff = s_date.diff(e_date, 'minutes'); // 1
						if (Math.abs(diff) > req.body.expiry.mins) {
							output = { message: 'Your OTP Key already expired, Please request a new OTP Key.' };
							return global.apiResponse(res, output, 'NDF', 401, output.message); //global.apiResponse(res, output, 'OK', { data: 'expire', statusCode: 300 });
						} else {
							let data_update = await m_verification_keys
								.query()
								.update({
									is_verified: true,
									updated_by: 'sys',
									updated_datetime: global.getCurrentDateTime(),
								})
								.where({ uuid: req.body.uuid });

							output = { message: 'Your OTP Key has been successfully verified.' };
							return global.apiResponse(res, output, 'OK', 200);
						}
					} else {
						return global.apiResponse(res, output, 'NDF', 401, 'Invalid OTP Key.');
					}
				} else {
					return global.apiResponse(res, output, 'NDF', 401, 'No data found.');
				}
			}
		} catch (err) {
			console.log(err);
			return global.apiResponse(res, {}, 'SE', 500, err); //global.apiResponse(res, {}, 'SE', err);
		}
	}
}

module.exports = new NotificationLogsController();
