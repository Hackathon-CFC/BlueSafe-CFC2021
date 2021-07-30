global.base_dir = __dirname;
global.abs_path = function(path) {
  return base_dir + path;
}
global.include = function(file) {
  return require(abs_path('/' + file));
}

const https = require("https");
const http = require("http");
fs = require("fs");

const options = {
  key: fs.readFileSync("/usr/src/app/sslcert.key"),
  cert: fs.readFileSync("/usr/src/app/sslcert.crt")
};

var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = include('routes/users.js');
var spotsRouter = include('routes/spots.js');
var authRouter = include('routes/auth.js');
var complaintsRouter = include('routes/complaints.js');
var adminRouter = include('routes/admin.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Start HTTP and HTTPS server with SSL
http.createServer(app).listen(4000);
https.createServer(options, app).listen(3000);

app.get('/server', function(req, res, next) {
  const data = { message: 'cfc_server is connected'};
  console.log(data);
  res.json(data);
  res.end();
});

//Return UI html file for rendering
app.get('/cfccb1',function(req,res) {
  res.sendFile(__dirname + '/cb1_interface.html');
});

app.get('/cfccb2',function(req,res) {
  res.sendFile(__dirname + '/cb2_interface.html');
});

app.get('/cfccb3',function(req,res) {
  res.sendFile(__dirname + '/cb3_interface.html');
});

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/spots', spotsRouter);
app.use('/complaints', complaintsRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
