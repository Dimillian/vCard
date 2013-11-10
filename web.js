var http = require ('http');
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var mongoose = require ("mongoose");
var app = express();

require('./mongo.js').make(mongoose);

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
	res.render('index', {})
});

app.get('/showcase.html', function (req, res) {
	res.render('showcase/index', {})
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});