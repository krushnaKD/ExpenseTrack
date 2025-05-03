const jwt  = require("jsonwebtoken");
const USER = require("../models/user");

exports.protect = async(req,res,next)=>{
    let token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({msg:"Not Authorized no token"});

    try {
        const decode = jwt.verify(token,process.env.JWT_SECERT);
        console.log(decode);
        
         req.user = await USER.findById(decode.id.select('-password'));
         next()
    } catch (error) {
        res.status(401).json({msg:"Not authorized , token failed"})
    }
}