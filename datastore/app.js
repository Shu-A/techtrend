

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var routes = require('./routes/index');
var rssFeeds = require('./routes/rssFeeds');
var articles = require('./routes/articles');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL setup
var conn = mysql.createConnection({
  host      : process.env.MYSQL_PORT_3306_TCP_ADDR || 'localhost',
  port      : process.env.MYSQL_PORT_3306_TCP_PORT || '3306',
  user      : process.env.MYSQL_TECHTREND_USER || 'techtrend',
  password  : process.env.MYSQL_TECHTREND_PASSWD || 'my-secret-pw',
  database  : process.env.MYSQL_TECHTREND_DATABASE || 'techtrend'
});

// CREATE DATABASE techtrend;
app.use('/', routes);

// CREATE TABLE rssfeed 
//   (
//   id INT(12) NOT NULL AUTO_INCREMENT,
//   name VARCHAR(64),
//   url VARCHAR(128),
//   PRIMARY KEY (id)
//   );
app.use('/rssFeeds', rssFeeds);

// CREATE TABLE article
//   (
//   id INT(12) NOT NULL AUTO_INCREMENT,
//   rssfeed_id INT(12),
//   url VARCHAR(256),
//   title VARCHAR(128),
//   published_date DATETIME,
//   summary TEXT,
//   html MEDIUMTEXT,
//   FOREIGN KEY(rssfeed_id) REFERENCES rssfeed(id),
//   PRIMARY KEY(id)
//   );
app.use('/articles', articles);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
