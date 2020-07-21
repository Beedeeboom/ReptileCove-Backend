var express = require('express')
var router = express.Router()

/* GET blog */
const blog = [{title: "This is a Title", body: "lorem ipsum blah blah blah"}, {title: "Another title", body: "lorem2 ipsum2 blah2 blah2 blah2"}]

/* GET rescues */
router.get('/', function(req, res, next) {
  res.send(blog)
})


module.exports = router