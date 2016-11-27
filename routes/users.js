// Setup
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');
var validator = require('express-validator');

// Show register form (/views/users/register.ejs)
router.get('/register', function(req, res) {
  	res.render('users/register');
});

// Signup a new user
router.post('/register', function(req, res){
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
	var location = req.body.location;
	var fav_artists = req.body.fav_artists;
	var fav_genres = req.body.fav_genres;

	// Validation
	req.checkBody('first_name', 'First name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var newUser = new User({first_name: req.body.first_name}, 
	{ulast_name: req.body.last_name}, 
	{email: req.body.email},
	{password: req.body.password}, 
	{password2: req.body.password2},
	
	// Optional user information 
	{location: req.body.location},
	{fav_artist: req.body.fav_artists}, 
	{fav_genres: req.body.fav_genres});

	User.register(newUser, function(err, user){
		if (err) {
			req.flash('error', err.message);
			return res.redirect('back');
		}

		passport.authenticate('local')(req, res, function() {
			req.flash('success', 'Welcome to Music Manager ' + User.first_name + '!');
			res.redirect('/albums');
		})
	});
});

//**********************
// Login/Logout sessions
//**********************

// Show login form (/views/users/login.ejs)
router.get('/login', function(req, res) {
  	res.render('users/login');
});

// Login a user
router.post('/login',
 passport.authenticate('local', { successRedirect: '/', 
                                  failureredirect: '/login'}));

// Logout a user
router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success', 'You logged out');
	ews.redirect('/albums');
});

module.exports = router;
