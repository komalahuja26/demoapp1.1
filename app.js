//importing all required configurations..
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var configs = require("./configs/globals");
var mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shopRouter = require("./routes/shop");

var app = express();

// view engine setup........
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/shop",shopRouter);

//connecting to mongodb..........
mongoose
.connect(configs.ConnectionStrings.MongoDb)
.then(()=>{
  console.log("connected successfuly");
})
.catch((err)=>{
  console.lo("error while connecting",err);
})
// catch 404 and forward to error handler.............
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler..............
app.use(function(err, req, res, next) {
  // set locals, only providing error in development...............
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // rendering  the error page...........
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
