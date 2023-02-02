const express = require('express');
const router = express.Router()
const Verify = require('../routes/verifytoken')

const {resetPassword} = require('../controller/resetPassword')

router.post('/resetPassword', resetPassword)


module.exports = router
