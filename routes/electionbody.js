const express = require('express');
const router = express.Router()
const Verify = require('../routes/verifytoken')
const {superAdminRoutesOnly} = require('../middleware/authPage')

const {
  createElectionBody,
  deleteelectionBody,
  viewelectionbody,
  updateelectionBody
} = require('../controller/electionBody')

router.post('/createElectionBody',Verify, superAdminRoutesOnly, createElectionBody)
router.delete('/:id/deleteelectionBody',Verify, superAdminRoutesOnly, deleteelectionBody)
router.get('/viewelectionbody', Verify, superAdminRoutesOnly, viewelectionbody)
router.put('/:id/updateelectionBody',Verify,superAdminRoutesOnly, updateelectionBody)




  module.exports = router