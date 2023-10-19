const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.google_clinetID,
    clientSecret: process.env.google_clientSecret,
    callbackURL: 'https://fitme-2.onrender.com/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Your verification and user creation logic here
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
