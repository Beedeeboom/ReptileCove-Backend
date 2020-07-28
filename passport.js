const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
const {User, OauthUser} = require('./models/user')

passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(async function(id, done) {

    const user = await User.findById(id)
    done(null, user)
})

passport.use(User.createStrategy());

// passport.use(new GoogleStrategy({
//     clientID: "876353669737-s4f71ldd024ckdpp4d45j6ovu4v5b0as.apps.googleusercontent.com",
//     clientSecret: "ofmSd8kYqq5_v83dEajZg-OL",
//     callbackURL: "http://localhost:4000/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     OauthUser.findOrCreate({id: profile.id, displayName: profile.displayName}, 'googleId', function(err, user) {
//         return cb(err, user);
//     });
//   })
// )

// var DiscordStrategy = require('passport-discord').Strategy;
 
// var scopes = ['identify', 'email'];
 
// passport.use(new DiscordStrategy({
//     clientID: '734966453014626315',
//     clientSecret: 'dvukCLIrX4yQrbDfUsFLt7oSNlr77X9t',
//     callbackURL: 'http://localhost:4000/auth/discord/callback',
//     scope: scopes
// },
// function(accessToken, refreshToken, profile, cb) {
//     OauthUser.findOrCreate({id: profile.id, displayName: profile.username}, 'discordId', function(err, user) {
//         return cb(err, user);
//     });
// }));

