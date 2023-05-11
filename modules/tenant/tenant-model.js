const BaseModel = require('../base/base-model');
const { Model } = require('objection');

class Tenant extends BaseModel {
	static idColumn = 'uuid';
	static tableName = 'tenant';

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

module.exports = Tenant;
