const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
require('dotenv').config();
const nodemailer = require('nodemailer')
const {signupValidation,
    signinValidation} = require('../validation')

    // let transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: testAccount.user, // generated ethereal user
    //     pass: testAccount.pass, // generated ethereal password
    //   },
    // })

let mailTransporter = nodemailer.createTransport({
  host: "premium108.web-hosting.com",
  port: 465,
  secure: true,
  auth : {
    user : 'nesitest@andyke.net',
    pass : "ikechukwuapeh"
  },
  t1s:{
    rejectUnauthorized : false
  }
})


const signupUser = async (req, res) => {
  const {name, phone, email, address, age, ward, pollingunit, role} = req.body
      // validation of data before user
      const {error} = signupValidation(req.body);
      if(error) return res.json({
        status: 400,
        message: (error.details[0].message),
        successfull:false,
        data:null
      })
  const emailExist = await User.findOne({email:req.body.email})
  if(emailExist) return res.json({
   status: 400,
   message: ('email already exist'),
   successfull:false,
   data:null
 })
 //hashpassword
 // const salt =  await bcrypt.gensalt(10)
 const hashpassword = await bcrypt.hash(req.body.password, 10)
 // register new user
 //const hashedpassword = bcrypt.hash(req.body.password, 12)
      const user = new User({
        name, 
        phone, 
        email, 
        address, 
        password:hashpassword,
        age,
        ward, 
        pollingunit, 
        role,
      })
  
   await user.save()

let mailOption = {
  from: "nesitest@andyke.net",
  to: user.email,
  subject: "testing election email",
  html: `<h2>hi ${user.name}! thanks for registering for this election,
   try and register as a voter to be able to vote in the coming election, have a nice day </h2>`
}
// sending email
mailTransporter.sendMail(mailOption, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('email is sent to ur gmail account');
  }
})

  // .select('+password');
   const userResponse = {
      _id:user._id,
      name:user.name,
      email:user.email
    }

    res.json({
      status: 200,
      message: 'registerd successful',
      successfull:true,
      user:userResponse
    })
}

const signinUser = async (req, res) => {
  // validation of data before user login
  const {error} = signinValidation(req.body);
  if(error) return res.json({
    status: 400,
    message: (error.details[0].message),
    successfull:false,
    data:null
  })
  // checking if the email doent  exist
  const user = await User.findOne({email:req.body.email})
  .select('+password')
  if(!user) return res.json({
  status: 400,
  message: ('email or password is wrong'),
  successfull:false,
  data:null
  })
  ///checking if the password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.json({
    status: 400,
    message: ('invalid password or email'),
    successfull:false,
    data:null
  });
  user.password = null;
  //create and asign token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  
     res.header('auth-token').json({
      status: 200,
      message: 'login successful',
      successfull:true,
      user:user,
      token:token
    })

}
 

const getAllUser = async (req, res) => {
 
    const user = await User.aggregate([
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
          {
              $lookup:{
                  from:"votes",
                  localField:"_id",
                  foreignField:"userId",
                  as:"votes"
              },
          },
          {
            $unwind:{
              path: "$votes",
            preserveNullAndEmptyArrays: true,
            }
          },
         // { $addFields: {comment_count: { $size: "$comments" } } }
     ])
     .exec()
      if (!user) {
          return res.json({
          status:401,
          massage:' no post to display' ,
          successfull:false,
          data:null
          })
      }
      return res.json({
      status:200,
      massage: 'successfull posts',
      successfull:true,
      users:user
       })
}
  


module.exports = {
  signupUser,
  signinUser,
  getAllUser
   }

