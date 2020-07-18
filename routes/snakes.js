var express = require('express')
var router = express.Router()

/* GET snake catchers */
router.get('/', function(req, res, next) {
  res.send("<h1>Snake Catchers</h1>")
})

module.exports = router