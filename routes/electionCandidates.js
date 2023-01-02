const express = require('express');
const router = express.Router()
require('dotenv').config();
const ElectionCandidate = require('../models/electionCandidates')
const Verify = require('../routes/verifytoken')

const {
  createElectionCandidate,
  deleteelectionCandidate,
  viewElectionCandidate,
  updateElectionCandidate
} = require('../controller/electionCandidate')


router.post('/createElectionCandidate',Verify,createElectionCandidate)
router.delete('/:id/deleteelectionCandidate',Verify,deleteelectionCandidate)
router.get('/viewElectionCandidate', Verify,viewElectionCandidate)
router.put('/:id/updateElectionCandidate',Verify,updateElectionCandidate)


  module.exports = router