var mongoose = require("mongoose");

var genreSchema = new mongoose.Schema({
    
    name: String,
		author: {
			id: 
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
		    },
	     	username: String
	    }
});

module.exports = mongoose.model("Genre", genreSchema);
