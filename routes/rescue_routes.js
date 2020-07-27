var express = require('express')
const bodyParser = require("body-parser")
var router = express.Router()

var Rescue = require('../models/rescue')


var jsonParser = bodyParser.json

/* GET all */
router.get('/', function(req, res, next) {
  Rescue.find()
    .then(rescues => res.send(rescues)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

router.get('/:id', function(req, res, next) {
  Rescue.findOne({ '_id': req.params.id })
    .then(rescue => res.send(rescue)) // (default status) 200: OK
    .catch((err) => res.status(404).send(err))
})

router.put('/:id', jsonParser, function(req, res, next) {
  Rescue.updateOne({ '_id': req.params.id }, { ...req.body }).orFail()
    .then(() => res.send(202)) // 202: accepted
    .catch((err) => res.status(400).send(err))
})

router.delete('/:id', function(req, res, next) {
  Rescue.deleteOne({ '_id': req.params.id })

  .then(() => res.send(202)) // 202: accepted
  .catch((err) => res.status(404).send(err))
})

router.post('/', jsonParser, function(req, res, next) {
  const rescue = new Rescue({ ...req.body })
  rescue.save()
    .then(() => res.send(201)) // 201: created
    .catch((err) => res.status(400).send(err))
})

module.exports = router