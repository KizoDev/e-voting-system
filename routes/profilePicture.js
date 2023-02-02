const express = require('express');
const router = express.Router()
const Verify = require('../routes/verifytoken')
const {photo} = require('../controller/profilePicture')

const multer = require("multer")
const cloudinary = require('../middleware/image')

const storage = multer.diskStorage({}) 

const fileFilter = (req, file, cb) =>{
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
cb('invalid imae', false)
    }
}

const uploads = multer({storage, fileFilter })



router.post('/upload',Verify, uploads.single('profile'), photo)



module.exports = router