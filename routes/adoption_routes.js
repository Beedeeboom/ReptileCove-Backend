var express = require('express')
const bodyParser = require("body-parser")
var router = express.Router()

var Adoption = require('../models/adoption')

// Forcing express to pick up data
var jsonParser = bodyParser.json()

// Get all
router.get('/', function(req, res, next) {
  Adoption.find()
    .then(adoptions => res.send(adoptions)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

// Get by ID
router.get('/:id', function(req, res, next) {
  Adoption.findOne({ '_id': req.params.id })
    .then(adoption => res.send(adoption)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

// Update
router.put('/:id', jsonParser, function(req, res, next) {
  Adoption.updateOne({ '_id': req.params.id }, { ...req.body }).orFail()
    .then(() => res.send(202)) // 202: accepted
    .catch((err) => res.status(400).send(err))
})

// Delete
router.delete('/:id', function(req, res, next) {
  Adoption.remove({ '_id': req.params.id })
    .then(() => res.send(202)) // 202: accepted
    .catch((err) => res.status(404).send(err))
})

// Create
router.post('/', jsonParser, function(req, res, next) {
  const adoption = new Adoption({ ...req.body })
  adoption.save()
    .then(() => res.send(201)) // 201: created
    .catch((err) => res.status(400).send(err))
})

module.exports = router
