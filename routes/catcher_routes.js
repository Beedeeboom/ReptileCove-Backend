var express = require('express')
const bodyParser = require("body-parser")
var router = express.Router()

var Catcher = require('../models/catcher')

// Forcing express to pick up data
var jsonParser = bodyParser.json()

// Get all
router.get('/', function(req, res, next) {
  Catcher.find()
    .then(catchers => res.send(catchers)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

// Get by ID
router.get('/:id', function(req, res, next) {
  Catcher.findOne({ '_id': req.params.id })
    .then(catcher => res.send(catcher)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

// Update
router.put('/:id', jsonParser, function(req, res, next) {
  Catcher.updateOne({ '_id': req.params.id }, { ...req.body }).orFail()
    .then(() => res.send(202)) // 202: accepted
    .catch((err) => res.status(400).send(err))
})

// Delete
router.delete('/:id', function(req, res, next) {
  Catcher.remove({ '_id': req.params.id })
    .then(() => res.send(202)) // 202: accepted
    .catch((err) => res.status(404).send(err))
})

// Create
router.post('/', jsonParser, function(req, res, next) {
  const catcher = new Catcher({ ...req.body })
  catcher.save()
    .then(() => res.send(201)) // 201: created
    .catch((err) => res.status(400).send(err))
})

module.exports = router
