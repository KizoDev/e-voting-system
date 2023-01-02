const express = require('express');
const Umpire = require('../models/umpires')
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')

const createumpire = async (req, res) => {
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
}

const deleteUmpire = async (req, res) =>  {
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
}

const viewUmpire = async (req, res) => {         

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
}

const updateUmpire = async (req, res) => {
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
}



  module.exports = {
    createumpire,
    deleteUmpire,
    viewUmpire,
    updateUmpire
  }