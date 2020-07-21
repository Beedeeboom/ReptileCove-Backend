var express = require('express')
var router = express.Router()

/* GET blog */
router.get('/', function(req, res, next) {
  res.send("<h1>Blog</h1>")
})

module.exports = router