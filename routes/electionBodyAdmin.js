const express = require('express');
const router = express.Router()
const Verify = require("../routes/verifytoken")
const {superAdminRoutesOnly} = require('../middleware/authPage')

const {
  createElectionBodyAdmin,
  deleteElectionBodyAdmin,
  viewelectionbodyAdmin,
  updateelectionBodyAdmin
} = require('../controller/electionBodyAdmin')

router.post('/createElectionBodyAdmin',Verify,superAdminRoutesOnly, createElectionBodyAdmin)
router.delete('/:id/deleteElectionBodyAdmin',Verify,superAdminRoutesOnly,deleteElectionBodyAdmin)
router.get('/viewelectionbodyAdmin', Verify,superAdminRoutesOnly,viewelectionbodyAdmin)
router.put('/:id/updateelectionBodyAdmin',Verify,superAdminRoutesOnly,updateelectionBodyAdmin)



  module.exports = router