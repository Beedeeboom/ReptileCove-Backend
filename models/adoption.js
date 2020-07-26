const mongoose = require("mongoose")

// Define Adoption Schema
const AdoptionSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Adoption", AdoptionSchema)
