const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.google_clinetID,
    clientSecret: process.env.google_clientSecret,
    callbackURL: 'https://fitme-2.onrender.com/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Your verification and user creation logic here
    fetch('https://www.googleapis.com/oauth2/v2/userinfo')
    .then((res)=>res.json())
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})

    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
