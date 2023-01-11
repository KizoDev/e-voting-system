const express = require('express');
const router = express.Router()
const Verify = require('../routes/verifytoken')
const {superAdminAndAdminRoutesOnly} = require('../middleware/authPage')
const {
  createElection,
  deleteElection,
  viewElections,
  updateElection
} = require('../controller/election')

router.post('/createElection',Verify, superAdminAndAdminRoutesOnly, createElection)
router.delete('/:id/deleteElection',Verify, superAdminAndAdminRoutesOnly, deleteElection)
router.get('/viewElections', Verify, viewElections)
router.put('/:id/updateElection',Verify, superAdminAndAdminRoutesOnly, updateElection)

  module.exports = router