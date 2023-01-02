const mongoose = require('mongoose')

const electionBodySchema = new mongoose.Schema({

 name: {
    type: String,
    required:true
  },
  address: {
    type: String,
    required:true
  },
  electoralBodySuperAdminId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  Date: {
    type: Date,
    default: Date.now,
  },


})

module.exports = mongoose.model("ElectionBody", electionBodySchema)   