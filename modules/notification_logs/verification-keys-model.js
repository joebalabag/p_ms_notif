const BaseModel = require('../base/base-model');
const { Model } = require('objection');

class NotificationLogs extends BaseModel {
	static idColumn = 'id';
	static tableName = 'verification_keys';

	// static get relationMappings() {
	// 	const CashReceiptTypes = require('./cash-receipt-type-model');
	// 	const CashReceiptLines = require('./cash-receipt-line-model');

	// 	return {
	// 		cashreceipt_type: {
	// 			relation: Model.HasManyRelation,
	// 			modelClass: CashReceiptTypes,
	// 			join: {
	// 				from: 'CashReceipt.CashReceiptID',
	// 				to: 'CashReceiptTypes.CashReceiptID',
	// 			},
	// 		}

	// 	};
	// }
}

module.exports = NotificationLogs;
