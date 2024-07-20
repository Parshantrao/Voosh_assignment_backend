const passport = require('passport');
const UserModel = require('../models/UsersModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "57223644186-rjdpouq8lmj9vss46c88gp8b7v4kjhdf.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
const CALLBACK_URL = "http://localhost:3000/auth/google/callback"

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await UserModel.findOne({ email: profile.emails[0].value })
      if (existingUser) {
        return done(null, existingUser)
      }
      else {
        const newUser = await UserModel.create({
          first_name: profile.displayName,
          email: profile.emails[0].value
        })
      
        return done(null, newUser)
      }
    }
    catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

