import db from 'mongoose';
const Schema = db.Schema;
import moment from 'moment/moment';

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: String
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
	deleted: {
		type: Boolean,
		default: false
	},
	isActive: {
		type: Boolean,
		default: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

const User = db.model('users', userSchema);

userSchema.post('find', docs => {
	console.log(this, docs);
	next();
});
export default User;