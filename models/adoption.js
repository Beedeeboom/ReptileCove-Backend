const mongoose = require("mongoose")

// Define Adoption Schema
const AdoptionSchema = new mongoose.Schema({
    animalName: {
        type: String,
        required: true
    },
	species: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true,
	},
	husbandryRequirements: {
		type: String,
		required: true,
	},
	temperament: {
		type: String,
		required: true,
	},
	medicalHistory: {
		type: String,
		required: true
	},
	contactEmail: {
		type: String,
		required: true
	},
	category: String
})

module.exports = mongoose.model("Adoption", AdoptionSchema)
