var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var delicatesseRouter = require('./routes/api/delicatesse');
var eveningwearRouter = require('./routes/api/eveningwear');
//var ckRouter = require('./routes/api/ck');
//var lesRouter = require('./routes/api/les');
//var classicRouter = require('./routes/api/classic');
var lookbookRouter = require('./routes/api/lookbook');
var config = require("config")
var app = express();
var cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/delicatesse', delicatesseRouter);
app.use('/api/eveningwear', eveningwearRouter);
//app.use('/api/ck', ckRouter);
//app.use('/api/les', lesRouter);
//app.use('/api/classic', classicRouter);
app.use('/api/lookbook', lookbookRouter);
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

mongoose.connect(config.get("db"), { useUnifiedTopology: true,useNewUrlParser: true })
.then(() =>console.log('Connected to MongoDB...'))
.catch(err=>console.error('Could not connect to MongoDB...', err));



module.exports = app;
