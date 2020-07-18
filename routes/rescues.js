var express = require('express')
var router = express.Router()

/* GET rescues */
router.get('/', function(req, res, next) {
  res.send("<h1>Rescues</h1>")
})

module.exports = router