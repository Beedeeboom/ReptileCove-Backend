var express = require('express')
var router = express.Router()

const rescues = [{name: "A rescue", location: "place"}, {name: "enother rescue", location: "another place"}]

/* GET rescues */
router.get('/', function(req, res, next) {
  res.send(rescues)
})

module.exports = router