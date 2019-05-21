
//Import dependencies from package.json
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var winston = require('winston'); //create winston log code at a later point


//Import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactUsRouter = require(path.join(__dirname, 'routes', 'contactUs'));



//Connect to MongoDB
var mongoose_uri = process.env.MONGOOSE_URI || "mongodb://abc:abc123@localhost:27017/databank?authSource=admin";
var mongoDB_Options = {
  useMongoClient: true,
  poolSize: 10,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  reconnectInterval: 300000,
  reconnectTries: 10,
  autoReconnect: true
};
mongoose.set('debug', true);
mongoose.connect(mongoose_uri, mongoDB_Options);
//MongoDB successful connection


mongoose.connection.on('connected', ()=>{
  console.log('MongoDB connected at port 27017');

  //Instantiate express
  var app = express();

//process.stdin.resume();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//Call all routers here
//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/contactus', contactUsRouter);

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
  console.log('Error status: ', err.status);
  console.log('Error message: ', err.message);
  res.render('error');
});

module.exports = app;
});
mongoose.connection.once('open', ()=>{
  console.log('MongoDB connection now open');
})
//MongoDB connection error
mongoose.connection.on('error', (err)=>{
  console.log(err);
})
mongoose.connection.on('disconnected', ()=>{
  console.log('MongoDB has disconnected');
})
