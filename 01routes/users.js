const express = require('express');
const {signUp, logIn, logOut} = require('../controlers/users')
const {auth}= require('../00middleweres/jwtStrategy')

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', logIn);
router.get('/logout', auth, logOut)


module.exports = router