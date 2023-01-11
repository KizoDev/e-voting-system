const express = require('express')
const router = express.Router()
const {signupUser, signinUser,getAllUser} = require('../controller/user')
const Verify = require('../routes/verifytoken')

router.post('/signup',signupUser)

router.post('/signin',signinUser
)

router.get('/getAllUser',Verify, getAllUser)

module.exports = router