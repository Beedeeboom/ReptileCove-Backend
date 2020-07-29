const mongoose = require("mongoose")
// Define Blog Schema
const RescueSchema = new mongoose.Schema({
	rescueName: {
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

module.exports = mongoose.model("Rescue", RescueSchema)
