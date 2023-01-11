const express = require('express');
const router = express.Router()
const Verify = require('../routes/verifytoken')
const {voterOnlyRoute} = require('../middleware/authPage')
const {superAdminAndAdminRoutesOnly} = require('../middleware/authPage')
const {umpireAndsuperAdminAndAdminRoutesOnly} = require('../middleware/authPage')
const {voteRoutesOnly} = require('../middleware/authAge')
const {
  createvote,
  deleteVote,
  viewVote,
  updateVote
} = require('../controller/vote')


router.post('/createvote',Verify,voteRoutesOnly,voterOnlyRoute, createvote)
router.delete('/:id/deleteVote',Verify,superAdminAndAdminRoutesOnly, deleteVote)
router.get('/viewVote', Verify,umpireAndsuperAdminAndAdminRoutesOnly, viewVote)
router.put('/:id/updateVote',Verify,superAdminAndAdminRoutesOnly, updateVote)

  module.exports = router