var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	  
    first_name: String,
	  last_name: String,
    email: String, 
    password: String,
    password2: String,
    location: String,
    favartists: String,
    favgenres: String,
    author: {
			id: 
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
		    },
	     	username: String
	    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
