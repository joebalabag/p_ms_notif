const BaseController = require('../base/base-controller'); //require('../base/base-controller');
const baseController = new BaseController();
const EmailTemplate = require('email-templates');

class EmailSettingController extends EmailTemplate {
	constructor(options) {
		this.options;
	}
}

class EmailTemplateController extends BaseController {
	// constructor() {
	// 	//super(IDType);
	// }

	async send_template(req, res) {
		try {
			let email = new EmailTemplate(req.email_setup);

			let email_data;
			email_data = {
				template: 'default',
				message: {
					to: req.email_content.send_to,
					from: 'Joe Balabag',
				},
				htmlToText: true,
			};

			if (req.email_content.is_templated == true) {
				email_data.template = req.email_content.template_name;
				email_data.locals = req.email_content;
			} else {
				//no movement danay..
			}

			const data = await email.send(email_data);
			return data;
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async TestTemplate(req, res) {
		try {
			let email = new EmailTemplate(global.EmailSetup);

			const data = await email.send({
				template: 'test-success',
				message: {
					to: req.emailaddress,
					from: 'Joe Balabag',
				},
				//send: true,
				locals: {
					name: req.completename,
				},
			});
			return data;
		} catch (err) {
			console.log(err);
			return err;
		}
	}
	async PaymentTemplate(req, res) {
		try {
			let email = new EmailTemplate(global.EmailSetup);

			const data = await email.send({
				template: 'patient-payment-success',
				message: {
					to: req.emailaddress,
				},
				//send: true,
				locals: {
					name: req.completename,
					AppointmentUID: req.AppointmentUID,
				},
			});
			return data;
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async PublicForgotPassword(req, res) {
		try {
			let email = new EmailTemplate(global.EmailSetup);
			const data = await email.send({
				template: 'public-forgot-password',
				message: {
					to: req.emailaddress,
				},
				send: true,
				locals: {
					name: req.completename,
					otpKey: req.otpKey,
					otpTransCode: req.otpTransCode,
				},
			});
			return data;
		} catch (err) {
			console.log(err);
			return err;
		}
	}
}

module.exports = new EmailTemplateController();
