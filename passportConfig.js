/*
import './db.mjs';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from 'mongoose';

const User = mongoose.model('User');

module.exports = (passport) => {
 passport.use(
   "local-signup",
   new LocalStrategy(
     {
       usernameField: "email",
       passwordField: "password",
     },
     async (username, password, birthday, horoscope, relationship, email, password, done) => {
       try {
         // check if user exists
         const userExists = await User.findOne({ "email": email });
         if (userExists) {
           return done(null, false)
         }
         // Create a new user with the user data provided
         const user = await User.create({ email, password });
         return done(null, user);
       } catch (error) {
         done(error);
       }
     }
   )
 );
}
*/