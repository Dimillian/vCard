var mongoose = require ("mongoose");
var Job;

var timelineSchema = new mongoose.Schema({
	logo: {type: String, trim: true},
	logoStyle: {type: String, trim: true},
	company: {type: String, trim: true},
	job: {type: String, trim: true},
	url: {type: String, trim: true},
	time: {type: String, trime: true},
	order: {type: Number}
});

JobProvider = function() {
	Job = mongoose.model('job', timelineSchema);
};

JobProvider.prototype.seed = function() {
	Job.remove(function (err) {if (err) console.log ('Error on remove!')});

	var mySeeenJob = new Job ({
		logo: "/images/myseeen.png",
		logoStyle: "margin-top: 10px; margin-right: 25px; margin-left: 15px",
		company: "MySeeen",
		job: "Co-Founder, iOS Dev",
		url: "http://www.myseeenapp.com",
		time: "February 2012 to now",
		order: "0"
	});

	var googleJob = new Job ({
		logo: "/images/google.png",
		logoStyle: "margin-top: 17px; margin-right: 10px",
		company: "Google",
		job: "iOS engineer",
		url: "http://google.com",
		time: "February 2013 to July 2013",
		order: "1"
	});

	var wayzupJob = new Job ({
		logo: "/images/wayzup-logo.png",
		logoStyle: "margin-top: 10px; margin-right: 10px",
		company: "Wayz-Up",
		job: "Mobile Development Manager",
		url: "http://www.wayz-up.com",
		time: "June 2012 to May 2013",
		order: "2"
	});

	var sageJob1 = new Job ({
		logo: "/images/sage-logo.png",
		logoStyle: "margin-top: 15px; margin-right: 10px;",
		company: "Sage",
		job: "Mobile Technologies Developer",
		url: "http://sage.fr",
		time: "September 2011 to June 2012",
		order: "3"
	});

	var ravenJob = new Job ({
		logo: "/images/raven-logo.png",
		logoStyle: "margin-top: 15px; margin-right: 30px",
		company: "Raven",
		job: "Co-Founder, Lead Developer",
		url: "http://raven.io",
		time: "April 2011 to May 2012",
		order: "4"
	});

	var sageJob2 = new Job ({
		logo: "/images/sage-logo.png",
		logoStyle: "margin-top: 15px; margin-right: 10px",
		company: "Sage",
		job: "Functional Manager",
		url: "http://sage.fr",
		time: "2009 to August 2011",
		order: "5"
	});

	mySeeenJob.save(function (err) {if (err) console.log ('Error on save!')});
	googleJob.save(function (err) {if (err) console.log ('Error on save!')});
	wayzupJob.save(function (err) {if (err) console.log ('Error on save!')});
	sageJob1.save(function (err) {if (err) console.log ('Error on save!')});
	ravenJob.save(function (err) {if (err) console.log ('Error on save!')});
	sageJob2.save(function (err) {if (err) console.log ('Error on save!')});
};

JobProvider.prototype.findall = function(callback) {
	Job.find({}).exec(function(err, result) {
		callback(err, result);
	})
};

exports.JobProvider = JobProvider;