const express = require('express');
const router = express.Router()
const Umpire = require('../models/umpires')
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')


const  {
  createumpire,
  deleteUmpire,
  viewUmpire,
  updateUmpire
} = require('../controller/umpire')



router.post('/createumpire',Verify,createumpire)
router.delete('/:id/deleteUmpire',Verify,deleteUmpire )
router.get('/viewUmpire', Verify,viewUmpire)
router.put('/:id/updateUmpire',Verify,updateUmpire)


  module.exports = router