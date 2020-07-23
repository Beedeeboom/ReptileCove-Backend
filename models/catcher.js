const mongoose = require("mongoose")

// Define Catcher Schema
const CatcherSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Catcher", CatcherSchema)
