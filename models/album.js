var mongoose = require("mongoose");

var albumSchema = new mongoose.Schema({

    artist: String,
		title: String,
		genre: String,
		info: String,
		year: String,
		label: String,
		tracks: String,
		cover: String,
		author: {
			id: 
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
		    },
	     	username: String
	    }
});

module.exports = mongoose.model("Album", albumSchema);
