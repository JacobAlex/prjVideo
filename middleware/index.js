var Album = require('../models/album.js');

var middlewareObj = {};

middlewareObj.checkAlbumOwnership = function(req, res, next) {
   
   // Is User logged in
   if (req.isAuthenticated()) {
      
      // Locate specified album
      Album.findById(req.params.id, function(err, foundAlbum) {
         if (err) {
            console.log(err);
            req.flash("error", "Album not found in database");
            res.redirect("back");
         } else {
            
            // Does this User own the Album
            if (foundAlbum.author.id.equals(req.user._id)) {
               next();
            } else {
               req.flash("error", "You don't have permission to do that!");
               res.redirect("back");
            }
            
         }
      });
      
   } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
   }
   
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;
