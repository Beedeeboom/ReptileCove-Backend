var http = require("http")
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require("body-parser")
var logger = require('morgan')
var cors = require('cors')
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;


const uri = "mongodb+srv://apidemo:4leqBiTA5FXSGjKK@reptilecove.5p5gt.mongodb.net/ReptileCove?retryWrites=true&w=majority";
mongoose.connect(
	uri,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	},
	err => {
		if (err) {
			console.log("Error connecting to database", err)
		} else {
			console.log("Connected to database!")
		}
	}
)

// Routes for pages 

var usersRouter = require('./routes/users')
var blogRouter = require('./routes/blog')
var rescuesRouter = require('./routes/rescues')
var snakesRouter = require('./routes/snakes')

var app = express()
var port = 4000

// Middleware

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/users', usersRouter)
app.use('/blog', blogRouter)
app.use('/rescues', rescuesRouter)
app.use('/snakes', snakesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
