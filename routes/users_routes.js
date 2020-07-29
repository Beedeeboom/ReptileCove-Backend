var express = require('express')
const bodyParser = require("body-parser")
var router = express.Router()

var User = require('../models/user')

// Forcing express to pick up data
var jsonParser = bodyParser.json()

// Get all
router.get('/', function(req, res, next) {
  User.find()
    .then(users => res.send(users)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

// Get by ID
router.get('/:id', function(req, res, next) {
  User.findOne({ '_id': req.params.id })
    .then(user => res.send(user)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

// Update
router.put('/:id', jsonParser, function(req, res, next) {
  User.updateOne({ '_id': req.params.id }, { ...req.body }).orFail()
    .then(() => res.send(202)) // 202: accepted
    .catch((err) => res.status(400).send(err))
})

// Delete
router.delete('/:id', function(req, res, next) {
    User.deleteOne({ '_id': req.params.id })
  
    .then(() => res.send(202)) // 202: accepted
    .catch((err) => res.status(404).send(err))
})

// Create
router.post('/', jsonParser, function(req, res, next) {
  const user = new User({ ...req.body })
  user.save()
    .then((newDocument) => res.status(201).send(newDocument._id)) // 201: created
    .catch((err) => res.status(400).send(err))
})

module.exports = router
