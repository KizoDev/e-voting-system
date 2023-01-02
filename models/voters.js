const mongoose = require('mongoose')

const voterSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      },
      electionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Election'
      },
},
{
  timestamps: true,
})

module.exports = mongoose.model("Voter", voterSchema)   