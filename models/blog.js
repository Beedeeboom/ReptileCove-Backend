const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Define Blog Schema
const Blog = new Schema({
    title: {
        type: String,
        required: true
    },
    create_date: {
		type: Date,
		required: true
	},
	modified_date: {
		type: Date,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	category: String
    
})

module.exports = mongoose.model("Blog", Blog)
