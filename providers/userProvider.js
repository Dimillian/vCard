var mongoose = require ("mongoose");
var bcrypt = require('bcrypt');

SALT_WORK_FACTOR = 10;

var User;

var userSchema = new mongoose.Schema({
	username: {type: String, trim: true, index: { unique: true }},
	password: {type: String, trim: true},
	role: {type: Number}
});


userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserProvider = function() {
	User = mongoose.model('user', userSchema);
};

UserProvider.prototype.findByUsernameAndPassword = function(username, password, callback) {
	User.findOne({ 'username' : username}, function (err, user) {
		if (!err && user) {
			bcrypt.compare(password, user.password, function(err, isMatch) {
				if (err) {
					callback(err, null);
				}
				else {
					callback(null, user);
				}
			});
		}
		else {
			var error = ({
				"message": "User not found"
			});
			callback(error, null);
		}
	});
};

UserProvider.prototype.addUser = function (username, password, callback) {
	var user = new User({
		"username": username,
		"password": password,
		"role": 0
	});
	user.save(function(err) {
		if (err) {
			callback(err, null);
		}
		else {
			callback(null, user);
		}
	});
};

exports.UserProvider = UserProvider;
