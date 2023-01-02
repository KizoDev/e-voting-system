const express = require('express');
const router = express.Router()
require('dotenv').config();
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')

const {
  createElection,
  deleteElection,
  viewElections,
  updateElection
} = require('../controller/election')

router.post('/createElection',Verify, createElection)
router.delete('/:id/deleteElection',Verify,deleteElection)
router.get('/viewElections', Verify,viewElections)
router.put('/:id/updateElection',Verify,updateElection)

  module.exports = router