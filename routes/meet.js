var express = require('express')
var router = express.Router()

/* GET meet us. */
router.get('/', function(req, res, next) {
  res.send("<h1>Meet us</h1>")
})

module.exports = router