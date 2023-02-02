const express = require('express');
const router = express.Router()

const {addNewPassword} = require('../controller/addNewPassword')

router.post('/addNewPassword', addNewPassword)


module.exports = router
