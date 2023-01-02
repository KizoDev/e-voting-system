const express = require('express');
const router = express.Router()
const Umpire = require('../models/umpires')
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')

router.post('/createumpire',Verify, async (req, res) => {
  const { electionBodyId} = req.body
 // register new user
 const umpire = new Umpire({

    userId:req.user,
    electionBodyId

 })
 const savedumpire = await umpire.save();
 
  res.json({
    status: 200,
    message: 'umpire registered successful',
    successfull:true,
    umpire:savedumpire
  })
})

router.delete('/:id/deleteUmpire',Verify, async (req, res) =>  {
  const { id: umpireId } = req.params
  const umpire = await Umpire.findOneAndDelete({ _id: umpireId })
  if (!umpire) {
    return res.json({
      status: 404,
      message: 'No umpire with id : ${umpireId}',
      successfull:false,
      umpire:null
    })
  } 
   res.json({
    status: 200,
    message: 'umpire deleted successsfull',
    successfull:true,
    umpire:umpire
  })
})

router.get('/viewUmpire', Verify, async (req, res) => {         

const umpire = await Umpire.aggregate([
  {
         $lookup:{
             from:"users",
             localField:"userId",
             foreignField:"_id",
             as:"users",
         },
     },
     {
       $unwind:{
         path: "$users",
       preserveNullAndEmptyArrays: true,
       }
     },
])
.exec()
 if (!umpire) {
     return res.json({
     status:401,
     massage:' no umpire to display' ,
     successfull:false,
     umpire:null
     })
 }
 return res.json({
 status:200,
 massage: 'successfull umpire',
 successfull:true,
 umpire:umpire
  })
})

router.put('/:id/updateUmpire',Verify, async (req, res) => {
  const { id: umpireId } = req.params

  const umpire = await Umpire.findOneAndUpdate({ _id: umpireId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!umpire) {
    return res.json({
      status: 404,
      message: 'No umpire with id : ${umpireId}',
      successfull:true,
      umpire:null
    })
  }

  res.json({
    status: 200,
    message: 'umpire updated successsfull',
    successfull:true,
    umpire:umpire
  })
})



  module.exports = router