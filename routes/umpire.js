const express = require('express');
const router = express.Router()
const Verify = require('../routes/verifytoken')
const {superAdminAndAdminRoutesOnly} = require('../middleware/authPage')


const  {
  createumpire,
  deleteUmpire,
  viewUmpire,
  updateUmpire
} = require('../controller/umpire')



router.post('/createumpire',Verify,superAdminAndAdminRoutesOnly, createumpire)
router.delete('/:id/deleteUmpire',Verify,superAdminAndAdminRoutesOnly, deleteUmpire )
router.get('/viewUmpire', Verify,superAdminAndAdminRoutesOnly, viewUmpire)
router.put('/:id/updateUmpire',Verify,superAdminAndAdminRoutesOnly, updateUmpire)


  module.exports = router