function make (mongoose) {
	var uristring =
	process.env.MONGOLAB_URI ||
	'mongodb://localhost/thomsricouardTimeline';

	mongoose.connect(uristring, function (err, res) {
		if (err) {
			console.log ('ERROR connecting to: ' + uristring + '. ' + err);
		} else {
			console.log ('Succeeded connected to: ' + uristring);
		}
	});

	var timelineSchema = new mongoose.Schema({
		logo: {type: String, trim: true},
		company: {type: String, trim: true},
		job: {type: String, trim: true},
		url: {type: String, trim: true},
		time: {type: String, trime: true},
		order: {type: Number}
	});

	var Job = mongoose.model('job', timelineSchema);

	Job.remove(function (err) {if (err) console.log ('Error on remove!')});

	var mySeeenJob = new Job ({
		logo: "/images/myseeen.png",
		company: "MySeeen",
		job: "Co-Founder, iOS Dev",
		url: "http://www.myseeenapp.com",
		time: "February 2012 to now",
		order: "0"
	});

	var googleJob = new Job ({
		logo: "/images/google.png",
		company: "Google",
		job: "iOS engineer",
		url: "http://google.com",
		time: "February 2013 to July 2013",
		order: "1"
	});

	var wayzupJob = new Job ({
		logo: "/images/wayzup-logo.png",
		company: "Wayz-Up",
		job: "Mobile Development Manager",
		url: "http://www.wayz-up.com",
		time: "June 2012 to May 2013",
		order: "2"
	});

	var sageJob1 = new Job ({
		logo: "/images/sage-logo.png",
		company: "Sage",
		job: "Mobile Technologies Developer",
		url: "http://sage.fr",
		time: "September 2011 to June 2012",
		order: "3"
	});

	var ravenJob = new Job ({
		logo: "/images/raven-logo.png",
		company: "Raven",
		job: "Co-Founder, Lead Developer",
		url: "http://raven.io",
		time: "April 2011 to May 2012",
		order: "4"
	});

	var sageJob2 = new Job ({
		logo: "/images/sage-logo.png",
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
}

module.exports.make = make;