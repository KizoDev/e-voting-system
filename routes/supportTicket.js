const express = require('express');
const router = express.Router()
const SupportTicket = require('../models/support ticket')
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')

const {
  createSupportTicket,
  deleteSupportTicket,
  viewSupportTicket,
  updateSupportTicket

} = require('../controller/supportTicket')

router.post('/createSupportTicket',Verify,createSupportTicket)
router.delete('/:id/deleteSupportTicket',Verify,deleteSupportTicket)
router.get('/viewSupportTicket', Verify, viewSupportTicket)
router.put('/:id/updateSupportTicket',Verify,updateSupportTicket)

  module.exports = router