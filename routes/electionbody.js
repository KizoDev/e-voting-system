const express = require('express');
const router = express.Router()
const Verify = require('../routes/verifytoken')

const {
  createElectionBody,
  deleteelectionBody,
  viewelectionbody,
  updateelectionBody
} = require('../controller/electionBody')

router.post('/createElectionBody',Verify,createElectionBody)
router.delete('/:id/deleteelectionBody',Verify,deleteelectionBody)
router.get('/viewelectionbody', Verify, viewelectionbody)
router.put('/:id/updateelectionBody',Verify,updateelectionBody)




  module.exports = router