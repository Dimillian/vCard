require('newrelic');
var http = require ('http');
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var mongoose = require ("mongoose");
var app = express();
app.use(express.bodyParser());
app.locals.error = null;
app.use(express.cookieParser());
app.use(express.session({secret: 'secretsession'}));

var uristring =
process.env.MONGOLAB_URI || 'mongodb://localhost/thomasricouard';

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

var User = require('./providers/userProvider.js').UserProvider;
var user = new User();

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

app.configure(function(){
  app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
  });
});

app.get('/', function (req, res) {
	job.findall(function(error, jobs){
		res.render('index', {timeline: jobs});
	});
});

app.get('/showcase', function (req, res) {
	res.render('showcase/index', {});
});

app.get('/login', function(req, res) {
	res.render('login', {});
});

app.post('/login', function(req, res){
	if (req.param('loginPost')) {
		var username = req.param('username');
		var password = req.param('password');
		if (username && password) {
			user.findByUsernameAndPassword(username, password,
				function( error, user) {
					if (!error) {
						req.session.user = user;
						res.redirect('/');
					}
					else {
						res.render('login', {
							error: error.message
						});
					}
				});
		}
		else {
			res.status(400);
			res.render('login', {
				error: 'All fields are required'
			});
		}
	}
	else if (req.param('registerPost')) {
		user.addUser(req.param('username'), req.param('password'),
			function(err, user) {
				if (err) {
					res.render('login', {
						error: err
					});
				}
				else {
					if (user) {
						req.session.user = user;
					}
					res.redirect('/');
				}
			});
	}
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
