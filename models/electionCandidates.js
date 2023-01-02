const mongoose = require('mongoose')

const electionCandidateSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      },
      electionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Election'
      },

    Date: {
        type: Date,
        default: Date.now,
      },

})

module.exports = mongoose.model("ElectionCandidate", electionCandidateSchema)   