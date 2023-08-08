const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models/user');

const _ = require('lodash');


//GoogleStrategy(object,callback function)
const strategy = new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID, //google provided client id
    clientSecret: process.env.FB_CLIENT_SECRET, //google provided secret key
    callbackURL: "https://desolate-retreat-72840.herokuapp.com/api/auth/facebook/redirect",
    profileFields: ['id', 'displayName', 'email']
}, async (accessToken, refreshToken, profile, cb) => {
    // console.log(profile);
    let user = await User.findOne({ facebookId: profile._json.id, email: profile._json.email });
    if (user) {
        //console.log("User Exist!");
        const token = user.generateJWT();
        const response = {
            message: "Registration Successful!",
            token: token,
        }
        return cb(null, response); //cb(error,response)
    } else {
        user = new User({ facebookId: profile._json.id, email: profile._json.email, name: profile._json.name });
        await user.save();
        const token = user.generateJWT();
        const response = {
            message: "Login Successful!",
            token: token,
        }
        return cb(null, response);
        //console.log("New User Created!");
    }
})

passport.use(strategy);