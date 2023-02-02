const string = require('@hapi/joi/lib/types/string')
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
  resetToken: String,
  expireToken:Date,
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
    ///select:false
  },
  address: {
    type: String,
    default: true,
  },
  age: {
    type: Number,
    default: true,
  },
  avatar:{
    type: String,
    default: true,
  },
  status: {
    type: String,
    default: true,
  },
  role: {
    type: String,
    enum: ['electoralbodySuperAdmin', 'electoralBodyAdmin', 
    'electionCandidates', 'voter', 'umpire'],
    default: voters,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("User", userSchema)
