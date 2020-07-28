const passport = require('passport')
const {User} = require('./models/user')

passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(async function(id, done) {

    const user = await User.findById(id)
    done(null, user)
})

passport.use(User.createStrategy());


