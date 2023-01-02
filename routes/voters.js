const express = require('express');
const router = express.Router()
const Voter = require('../models/voters')
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')

const {
  createvoter,
  deleteVoter,
  viewVoter,
  updateVoter
} = require('../controller/voter')

router.post('/createvoter',Verify,createvoter)
router.delete('/:id/deleteVoter',Verify,deleteVoter)
router.get('/viewVoter', Verify,viewVoter)
router.put('/:id/updateVoter',Verify,updateVoter)


  module.exports = router