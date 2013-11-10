require('newrelic');
var http = require ('http');
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var mongoose = require ("mongoose");
var app = express();

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

var Job = require('./providers/jobProvider.js').JobProvider;
var job = new Job();
job.seed();


function compile(str, path) {
	return stylus(str)
	.set('filename', path)
	.use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.logger());

app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile,
	compress: true
	}
));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	job.findall(function(error, jobs){
		res.render('index', {timeline: jobs})
	});
});

app.get('/showcase.html', function (req, res) {
	res.render('showcase/index', {})
});

app.get('/login.html', function(req, res) {
 	res.render('login', {})
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});