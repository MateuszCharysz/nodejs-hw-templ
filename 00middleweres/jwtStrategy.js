const passport = require('passport');
const passportJWT = require('passport-jwt');
const { findUserForToken } = require('../service/usersMongo');
require('dotenv').config();

const secret = process.env.SECRET;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, (payload, done) => {
    console.log(payload)
    findUserForToken(payload.id) // TODO do sprawdzenia payload i jakie ma id
      .then(([user]) => {
        if (!user) {
          return done(new Error('User not found JWT'));
        }
        return done(null, user);
      })
      .catch(err => done(err));
  }),
);
