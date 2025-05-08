const jwt  = require("jsonwebtoken");
const USER = require("../models/user");

exports.protect = async(req,res,next)=>{
    try {
        console.log(req.cookies);
        
        const { token } = req.cookies;
        
        
        if (!token) {
         return  res.status(401).send("please Login !");
        }
    
        const decodeData = await jwt.verify(token, "Dev@Tinder$431");
         
        const { _id } = decodeData;
        const user = await USER.findById(_id);
    
        if (!user) {
          throw new Error("User Invalid");
        }
        req.user = user;
    
        next();
      } catch (err) {
        res.status(400).send(err.message);
      }
}