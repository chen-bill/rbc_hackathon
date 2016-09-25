/**
 * Module dependencies.
 */

var express = require('express'), 
routes = require('./routes'), 
http = require('http'), 
path = require('path'), 
fs = require('fs'),
mongodb = require('mongodb'),
mongoose = require('mongoose'),
shortid = require('shortid');

var app = express();
var Options = require('./model/Options.js');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}


var db;
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://admin:adminpass@ds041496.mlab.com:41496/talksmackgethacked';

MongoClient.connect(dburl, function(err, db){
	if(err){
		console.log('Error connecting to mlab database ' + err);
	}else{
		console.log('Established connection');
		db.close();
		console.log('Connection closed');
	}
});

mongoose.connect(dburl);


app.all('/*', function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', routes.index);

app.post('/postdata', function(req,res ){
    console.log(req.body);
    var gid = shortid.generate();
    var newOptions = Options({
        shortUrl: gid,
        options: req.body.options,
        flags: req.body.flags
    });

    newOptions.save(function(err){
        if(err) console.log(err);

        console.log('Created');
    });


});

app.get('/api/:url', function(req,res){
    var shorturl = req.params.url;
    newOptions.find({shortUrl: shorturl}, function(err, options){
        console.log(err);
        res.send(options);
    });
});

app.get('/nextpage', function(req,res){
    app.use(express.static(path.join(__dirname, 'game')));
    res.sendFile('app.html', { root: path.join(__dirname, './game/pages/') })
});

http.createServer(app).listen(3000, '0.0.0.0', function() {
	console.log('Express server listening on port ' + app.get('port'));
});

