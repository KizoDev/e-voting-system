const mongoose = require('mongoose')
const voters = require('./voters')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  phone: {
    type: Number,
    default: true,
  },
  email: {
    type: String,
    default: true,
  },
  ward: {
    type: String,
    default: true,
  },
  pollingUnit: {
    type: String,
    default: true,
  },
  password: {
    type: String,
    default: true,
    select:false
  },
  address: {
    type: String,
    default: true,
  },
  age: {
    type: Number,
    default: true,
  },
  status: {
    type: String,
    default: true,
  },
  role: {
    type: String,
    enum: ['electoralbodySuperAdmin', 'electoralBobyAdmin', 
    'electionCandidates', 'voter', 'umpire'],
    default: voters,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("User", userSchema)
