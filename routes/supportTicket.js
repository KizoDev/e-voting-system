const express = require('express');
const router = express.Router()
const Verify = require('../routes/verifytoken')
const {superAdminAndAdminRoutesOnly} = require('../middleware/authPage')

const {
  createSupportTicket,
  deleteSupportTicket,
  viewSupportTicket,
  updateSupportTicket

} = require('../controller/supportTicket')

router.post('/createSupportTicket',Verify,createSupportTicket)
router.delete('/:id/deleteSupportTicket',Verify,superAdminAndAdminRoutesOnly, deleteSupportTicket)
router.get('/viewSupportTicket', Verify, viewSupportTicket)
router.put('/:id/updateSupportTicket',Verify,updateSupportTicket)

  module.exports = router