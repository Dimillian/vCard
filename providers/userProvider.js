var mongoose = require ("mongoose");
var User;

JobProvider = function() {
	var userSchema = new mongoose.Schema({
		username: {type: String, trim: true},
		password: {type: Password, trim: true}
	});
	User = mongoose.model('thomasRicouardUser', timelineSchema);
};
