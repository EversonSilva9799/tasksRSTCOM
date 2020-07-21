const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecure = require('../config/jwt');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},

}, {
    timestamps: true
});

UserSchema.statics.generateToken = function({ _id, name, role }) {
	return jwt.sign({ _id, name, role }, jwtSecure.jwtsecure, {
		expiresIn: jwtSecure.ttl
	});
};

UserSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, 8)
});

UserSchema.methods =  {
	isPassword(password) {
		return bcrypt.compare(password, this.password);
	},

	userBlocked({ activated }) {
		if(parseInt(activated) === 0) {
			return true;
		}
	}
}



module.exports = mongoose.model('User', UserSchema);