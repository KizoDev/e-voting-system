const mongoose = require('mongoose')

const votesSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      },
      electionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Election'
      },
      electionCandidateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ElectionCandidate'
      },

 Date: {
    type: Date,
    default: Date.now,
 },
})

module.exports = mongoose.model("Votes", votesSchema)   