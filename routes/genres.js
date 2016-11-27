var express = require('express');
var router = express.Router();
var Genre = require('../models/genre');
var middleware = require('../middleware');

router.get('/', function(req, res) {
	Genre.find({}, function(err, genres){
		if (err) {
			console.log(err);
		} else {
			res.render('genres/index', {genres: genres});
		}
	});
});

router.get('/add', function(req, res) {
  	res.render('genres/add');
});

router.post('/add', function(req, res) {
	var genre = {name: req.body.name}
	req.flash('success_msg', 'Genre Saved');
	res.redirect('/genres');
});

router.get('/edit/:id',middleware.checkGenreOwnership, function(req, res){
	var id = req.params.id;
	Genre.findById(id, function(err, genre){
		if (err) {
            req.flash('error', 'Genre was not found in the database');
        } else {
            res.render('albums/edit.ejs', {album: album});
        }
	});

});

router.post('/edit/:id', function(req, res){
	var id = req.params.id;
	Genre.findByIdAndUpdate(id, function(err, genre){
		if (err) {
            console.log(err);
            res.redirect('/genres');
        } else {
            res.redirect('/genres/' + id);
        }
	});
});

router.delete('/delete/:id',middleware.checkGenreOwnership, function(req, res){
	var id = req.params.id;
	Genre.findByIdAndRemove(id, function(err) {
		if (err) {
            console.log(err);
        }
        res.redirect('/genres');
	});
});

module.exports = router;
