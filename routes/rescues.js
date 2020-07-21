var express = require('express')
var router = express.Router()

const catchers = [{name: "A rescue", location: "place"}, {name: "enother rescue", location: "another place"}]

/* GET rescues */
router.get('/', function(req, res, next) {
  res.send("<h1>Rescues</h1>")
})

module.exports = router