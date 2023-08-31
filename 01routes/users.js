const express = require('express');
const {signUp, logIn, logOut} = require('../controlers/users')
const {auth}= require('../00middleweres/auth')

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', logIn);
router.get('/logout', logOut)


module.exports = router