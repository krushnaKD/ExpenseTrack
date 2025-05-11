const express = require("express")
const {protect }= require("../middleware/AuthMiddleware")
const {
    registerUser,
    loginUser,
    getUserInfo
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const Authrouter = express.Router()

Authrouter.post("/register",registerUser);
Authrouter.post("/login",loginUser);
Authrouter.get("/getUser",protect, getUserInfo);

Authrouter.post("/upload-image",upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({msg:"No file uploaded"});

    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
 res.status(200).json({imageUrl})
})

module.exports = Authrouter