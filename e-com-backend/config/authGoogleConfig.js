const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models/user');

const _ = require('lodash');


//GoogleStrategy(object,callback function)
const strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, //google provided client id
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, //google provided secret key
    callbackURL: "https://desolate-retreat-72840.herokuapp.com/api/auth/google/redirect"
}, async (accessToken, refreshToken, profile, cb) => {
    //console.log(profile._json.email);
    let user = await User.findOne({ googleId: profile.id, email: profile._json.email });
    if (user) {
        //console.log("User Exist!");
        const token = user.generateJWT();
        const response = {
            message: "Registration Successful!",
            user: _.pick(user, ["email", "_id", "name"]),
            token: token,
        }
        return cb(null, response); //cb(error,response)
    } else {
        user = new User({ googleId: profile.id, email: profile._json.email, name: profile._json.name });
        await user.save();
        const token = user.generateJWT();
        const response = {
            message: "Login Successful!",
            token: token,
            user: _.pick(user, ['_id', 'name', 'email']),
        }
        return cb(null, response);
        //console.log("New User Created!");
    }
})

passport.use(strategy);