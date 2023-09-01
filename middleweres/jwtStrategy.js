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
  new Strategy(params, async (payload, done) => {
    const user = await findUserForToken(payload.id);
    try {
      if (!user && user._id.toString() === payload.id) {
        return done(new Error('User not found or token isnt right'));
      } else {
        return done(null, user);
      }
    } catch (err) {
      done(err);
    }
  }),
);

const auth = async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { auth };
