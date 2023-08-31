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
    console.log(await findUserForToken(payload.id));
    await findUserForToken(payload.id)
      .then(([user]) => {
        console.log(user);
        if (!user) {
          return done(new Error('User not found JWT'));
        }
        return done(null, user);
      })
      .catch(err => done(err));
  }),
);

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { auth };
