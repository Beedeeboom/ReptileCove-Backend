const mongoose = require("mongoose")

// Define Blog Schema
const BlogSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Blog", BlogSchema)
