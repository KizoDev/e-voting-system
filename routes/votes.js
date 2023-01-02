const express = require('express');
const router = express.Router()
const Vote = require('../models/votes')
const Voter = require('../models/voters')
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')


const {
  createvote,
  deleteVote,
  viewVote,
  updateVote
} = require('../controller/vote')


router.post('/createvote',Verify, createvote)
router.delete('/:id/deleteVote',Verify,deleteVote)
router.get('/viewVote', Verify,viewVote)
router.put('/:id/updateVote',Verify,updateVote)

  module.exports = router