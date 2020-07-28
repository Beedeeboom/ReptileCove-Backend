const mongoose = require("mongoose")

// Define Catcher Schema
const CatcherSchema = new mongoose.Schema({
    catcherName: {
		type: String,
		required: true
	},
	city: { 
		type: String,
		required: true
	},
	postcode: { 
		type: Number,
		required: true
	},
	state: {
		type: String,
		required: true
	},	
	website: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model("Catcher", CatcherSchema)
