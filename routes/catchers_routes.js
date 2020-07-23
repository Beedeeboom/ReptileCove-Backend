var express = require('express')
var router = express.Router()

/* GET snake catchers */
const catchers = [{name: "dummy", location: "place"}, {name: "bobby", location: "another place"}]

router.get('/', function(req, res, next) {
  res.send(catchers)
})

module.exports = router