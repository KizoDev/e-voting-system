const express = require('express');
const router = express.Router()
require('dotenv').config();
const Verify = require('../routes/verifytoken')
const {superAdminAndAdminRoutesOnly} = require('../middleware/authPage')

const {
  createElectionCandidate,
  deleteelectionCandidate,
  viewElectionCandidate,
  updateElectionCandidate
} = require('../controller/electionCandidate')


router.post('/createElectionCandidate',Verify, superAdminAndAdminRoutesOnly, createElectionCandidate)
router.delete('/:id/deleteelectionCandidate', Verify, superAdminAndAdminRoutesOnly, deleteelectionCandidate)
router.get('/viewElectionCandidate', Verify,viewElectionCandidate)
router.put('/:id/updateElectionCandidate',Verify,superAdminAndAdminRoutesOnly, updateElectionCandidate)


  module.exports = router