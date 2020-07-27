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
const {User} = require('./models/user')
const { cloudinary } = require('./utils/cloudinary')

require('./passport')
require('dotenv').config()

let db
if (process.env.ENV == 'test') {
	db = process.env.DB_TEST
} else if (process.env.ENV == 'development') {
	db = process.env.DB_DEV
} else {
	db = process.env.DB_PROD
}

const app = express()

const port = 5000
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@reptilecove.5p5gt.mongodb.net/${db}?retryWrites=true&w=majority`;

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
const adoptionRouter = require('./routes/adoption_routes')



// Middleware

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))


let url
if (process.env.ENV == 'development') {
    url = "http://localhost:3000"
} else  {
    url = "https://reptilecove.ml"
}

app.use(cors(
    {
    origin: url,
    credentials: true
}
))

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

app.use(passport.initialize())
app.use(passport.session())




// app.use('/users', usersRouter)
app.use('/blog', blogRouter)
app.use('/rescues', rescuesRouter)
app.use('/catchers', catcherRouter)
app.use('/adoptions', adoptionRouter)


//end of Middleware

// Start of Cloudinary Routes
app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:ml_default')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});
app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {});
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

// End of Cloudinary Routes

//Start of auth Routes
app.get('/failed', (req, res) => {
    res.redirect(url)
})

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
	console.log("test")
    User.register(new User({username: req.body.username, displayName: req.body.username}), req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            res.json({fail: err})
        } else {
            passport.authenticate('local')(req, res, function() {
                res.json({username: user.username, displayName: user.displayName})
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

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app
