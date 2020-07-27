const mongoose = require("mongoose")

// Define Blog Schema
const RescueSchema = new mongoose.Schema({
	// _id: {
	// 	type: String,
	// 	required: true
	// },
    title: {
        type: String,
        required: true
    },
	content: {
		type: String,
		required: true
	},
    create_date: {
		type: Date,
		required: false
	},
	modified_date: {
		type: Date,
		required: false
	},
	category: String
})

module.exports = mongoose.model("Rescue", RescueSchema)
