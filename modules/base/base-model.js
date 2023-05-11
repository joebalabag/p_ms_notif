const { Model } = require('objection');

class BaseModel extends Model {
	// $beforeInsert() {
	// 	this.CreatedDateTime = convertToSqlDateTime(new Date(), new Date());
	// }

	// $beforeUpdate() {
	// 	this.UpdatedDateTime = convertToSqlDateTime(new Date(), new Date());
	// }

	static get modifiers() {
		return {
			onlyActive(builder) {
				builder.where({ isActive: 1 });
			},
			onlyPostedActive(builder) {
				builder.where({ isActive: 1 });
			},
			LimitOneDesc(builder) {
				builder.limit(1).orderBy('CreatedDate', 'DESC');
			},
			LimitOneDescDateTime(builder) {
				builder.limit(1).orderBy('CreatedDateTime', 'DESC');
			},
			PRCLicenseOrderByExpiryDate(builder) {
				builder.where({ LicenseID: 1 }).orderBy('ExpiryDate', 'DESC');
			},
			ActiveShiftOnly(builder) {
				builder.where({ isFinished: 0 }).limit(1).orderBy('EmployeeShiftingID', 'DESC');
			},
		};
	}
}

function convertToSqlDateTime(date, time) {
	if (!date || !time) return;
	if (date instanceof Date === false) {
		date = new Date(date);
	}
	if (time instanceof Date === false) {
		time = new Date(time);
	}
	return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${
		time.toTimeString().split(' ')[0]
	}`;
}

module.exports = BaseModel;
