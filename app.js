const http = require("http")
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
const logger = require('morgan')
const cors = require('cors')
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const User = require('./models/user')

require('./passport')

const app = express()
const port = 3000
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

const usersRouter = require('./routes/users_routes')
const blogRouter = require('./routes/blog_routes')
const rescuesRouter = require('./routes/rescue_routes')
const catcherRouter = require('./routes/catcher_routes')



// Middleware

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}))

app.use(session({
	secret: "fooBar",
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({mongooseConnection: mongoose.connection}),
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser("fooBar"))

app.use(passport.initalize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))


app.use('/users', usersRouter)
app.use('/blog', blogRouter)
app.use('/rescues', rescuesRouter)
app.use('/catcher', catcherRouter)

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

//end of Middleware

//Start of auth Routes
app.get('/failed', (req, res) => {
    res.redirect('http://localhost:3000')
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
        res.redirect('http://localhost:3000')
  });

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', {failureRedirect: '/'}), 
    function(req, res) {
        res.redirect('http://localhost:3000')
});


app.post("/users/login", (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) throw err
        if (!user) {
            res.status(401).send({name: "Incorrect Credentials", message: "The details you have entered are not correct"})
        } else {
            req.logIn(user, err => {
                if (err) throw err
                res.send(user)
            })
        }
    })(req, res, next)
})

app.post('/users/register', (req, res) => {
    User.register(new User({username: req.body.username, displayName: req.body.username}), req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            return res.send({fail: err})
        } else {
            passport.authenticate('local')(req, res, function() {
                return res.send(user)
            })
        }
    })
})

app.get('/users/me', (req, res) => {
    res.send(req.user)
})

app.get('/users/logout', (req, res) => {
    req.logOut()
    res.sendStatus(200)
})
//end of auth Routes

module.exports = app

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


