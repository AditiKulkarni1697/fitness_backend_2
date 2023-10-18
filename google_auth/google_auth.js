const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.google_clinetID,
    clientSecret: process.env.google_clientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Your verification and user creation logic here
     console.log(profile,"profile")
}));
