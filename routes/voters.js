const express = require('express');
const router = express.Router()
const Verify = require('../routes/verifytoken')
const {superAdminAndAdminRoutesOnly} = require('../middleware/authPage')

const {
  createvoter,
  deleteVoter,
  viewVoter,
  updateVoter
} = require('../controller/voter')

router.post('/createvoter',Verify,createvoter)
router.delete('/:id/deleteVoter',Verify,superAdminAndAdminRoutesOnly, deleteVoter)
router.get('/viewVoter', Verify,superAdminAndAdminRoutesOnly, viewVoter)
router.put('/:id/updateVoter',Verify,superAdminAndAdminRoutesOnly, updateVoter)


  module.exports = router