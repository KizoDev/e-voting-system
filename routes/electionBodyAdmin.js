const express = require('express');
const router = express.Router()
const Verify = require("../routes/verifytoken")
const ElectionBodyAdmin = require('../models/electionBodyAdmin')
require('dotenv').config();

const {
  createElectionBodyAdmin,
  deleteElectionBodyAdmin,
  viewelectionbodyAdmin,
  updateelectionBodyAdmin
} = require('../controller/electionBodyAdmin')

router.post('/createElectionBodyAdmin',Verify,createElectionBodyAdmin)
router.delete('/:id/deleteElectionBodyAdmin',Verify,deleteElectionBodyAdmin)
router.get('/viewelectionbodyAdmin', Verify,viewelectionbodyAdmin)
router.put('/:id/updateelectionBodyAdmin',Verify,updateelectionBodyAdmin)



  module.exports = router