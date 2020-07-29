var express = require('express')
const bodyParser = require("body-parser")
var router = express.Router()

var Blog = require('../models/blog')

// Forcing express to pick up data
var jsonParser = bodyParser.json()

// Get all
router.get('/', function(req, res, next) {
  Blog.find()
    .then(blogs => res.send(blogs)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

// Get by ID
router.get('/:id', function(req, res, next) {
  Blog.findOne({ '_id': req.params.id })
    .then(blog => res.send(blog)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

// Update
router.put('/:id', jsonParser, function(req, res, next) {
  Blog.updateOne({ '_id': req.params.id }, { ...req.body }).orFail()
    .then((newDocument) => res.status(202).send(newDocument._id)) // 202: accepted
    .catch((err) => res.status(400).send(err))
})

// Delete
router.delete('/:id', function(req, res, next) {
    Blog.deleteOne({ '_id': req.params.id })
  
    .then(() => res.send(202)) // 202: accepted
    .catch((err) => res.status(404).send(err))
})

// Create
router.post('/', jsonParser, function(req, res, next) {
  const blog = new Blog({ ...req.body })
  blog.save()
    .then((newDocument) => res.status(201).send(newDocument._id)) // 201: created
    .catch((err) => res.status(400).send(err))
})

module.exports = router
