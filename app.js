var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
var path = require('path');
var config = require('./config');

var controllers = require('./controllers/index');
var albums = require('./controllers/albums');
var genres = require('./controllers/genres');
var users = require('./controllers/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Handle Sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// connect to DB, using mongoose
mongoose.connect(config.getDbConnectionString());


app.use('/', controllers);
app.use('/albums', albums);
app.use('/genres', genres);
app.use('/users', users);

// Global Variables
app.use(function(req, res, next){
  res.locals.succes_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  //res.locals.authdata = mongoose.getAuth();
  res.locals.page = req.url;
  next();
});

// Set Port
app.set('port', (process.env.PORT || 3000));

// Run Server
app.listen(app.get('port'), function(){
  console.log('Server started on port: '+ app.get('port'));
});

module.exports = app;
